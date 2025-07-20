const { Sequelize, DataTypes } = require('sequelize');
const config = require('../config/db');

// Initialize Sequelize with the configuration
const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  {
    host: config.host,
    port: config.port,
    dialect: config.dialect,
    logging: config.logging,
    pool: config.pool,
    define: {
      timestamps: true,
      underscored: true,
      createdAt: 'created_at',
      updatedAt: 'updated_at'
    }
  }
);

// Import model definitions
const Admin = require('./Admin')(sequelize, DataTypes);
const Student = require('./Student')(sequelize, DataTypes);
const Attendance = require('./Attendance')(sequelize, DataTypes);

// Test the database connection
const testConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ Database connection has been established successfully.');
    return true;
  } catch (error) {
    console.error('❌ Unable to connect to the database:', error);
    return false;
  }
};

// Define associations
Student.hasMany(Attendance, { 
  foreignKey: 'student_id',
  as: 'attendanceRecords',
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE'
});

Attendance.belongsTo(Student, { 
  foreignKey: 'student_id',
  as: 'student'
});

// Sync all models with the database
const syncModels = async (force = false) => {
  try {
    await sequelize.sync({ force });
    console.log(`✅ Database & tables ${force ? 'dropped and re-created' : 'synchronized'}!`);
    return true;
  } catch (error) {
    console.error('❌ Error synchronizing database:', error);
    return false;
  }
};

// Export the models, sequelize instance, and utility functions
const db = {
  sequelize,
  Sequelize,
  Admin,
  Student,
  Attendance,
  testConnection,
  syncModels
};

module.exports = db;
