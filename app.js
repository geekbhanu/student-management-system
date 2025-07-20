require('dotenv').config();
const express = require('express');
const cors = require('cors');
const db = require('./models');
const { createAdminUser } = require('./utils/seed');

// Initialize Express app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// API Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/students', require('./routes/studentRoutes'));
app.use('/api/attendance', require('./routes/attendanceRoutes'));

// Health check endpoint
app.get('/health', async (req, res) => {
  try {
    // Test database connection
    await db.sequelize.authenticate();
    res.status(200).json({ 
      status: 'ok', 
      message: 'Server is running',
      database: 'connected',
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Health check failed:', error);
    res.status(500).json({ 
      status: 'error', 
      message: 'Database connection failed',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ 
    status: 'error', 
    message: 'Not Found',
    path: req.path
  });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error('Global error handler:', err);
  
  // Default error status and message
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';
  
  // Send error response
  res.status(statusCode).json({
    status: 'error',
    message,
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
});

// Server configuration
const PORT = process.env.PORT || 5000;
const NODE_ENV = process.env.NODE_ENV || 'development';

// Start server
const startServer = async () => {
  try {
    console.log('Starting server in', NODE_ENV, 'mode...');
    
    // Test database connection
    console.log('Testing database connection...');
    const isConnected = await db.testConnection();
    
    if (!isConnected) {
      throw new Error('Failed to connect to the database');
    }
    
    // Sync database models
    console.log('Synchronizing database...');
    await db.sequelize.sync({ 
      force: NODE_ENV === 'test',
      alter: NODE_ENV === 'development'
    });
    
    // Create default admin user if not exists
    if (NODE_ENV !== 'test') {
      try {
        await createAdminUser();
      } catch (error) {
        console.warn('Warning: Could not create admin user:', error.message);
      }
    }
    
    // Start the server
    const server = app.listen(PORT, () => {
      console.log(`🚀 Server is running on port ${PORT} in ${NODE_ENV} mode`);
      console.log(`📊 Database: ${process.env.DB_NAME}@${process.env.DB_HOST}`);
      console.log(`Environment: ${NODE_ENV}`);
    });
    
    // Handle unhandled promise rejections
    process.on('unhandledRejection', (err) => {
      console.error('Unhandled Rejection:', err);
      server.close(() => process.exit(1));
    });
    
    // Handle uncaught exceptions
    process.on('uncaughtException', (err) => {
      console.error('Uncaught Exception:', err);
      server.close(() => process.exit(1));
    });
    
    // Handle graceful shutdown
    process.on('SIGTERM', () => {
      console.log('SIGTERM received. Shutting down gracefully...');
      server.close(() => {
        console.log('Server closed');
        process.exit(0);
      });
    });
    
    return server;
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

// Start the application
startServer().catch(error => {
  console.error('Fatal error during startup:', error);
  process.exit(1);
});
