# Student Management System

A RESTful API for managing students and their attendance records, built with Node.js, Express.js, and PostgreSQL.

## Features

- User authentication with JWT
- CRUD operations for student management
- Attendance tracking for students
- Secure API endpoints with role-based access control
- PostgreSQL database with Sequelize ORM
- Environment-based configuration

## Prerequisites

- Node.js (v14 or later)
- npm (v6 or later)
- PostgreSQL (v12 or later)

## Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd student-management-system
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory with the following variables:
   ```env
   # Server Configuration
   PORT=5000
   NODE_ENV=development

   # Database Configuration
   DB_NAME=student_management
   DB_USER=postgres
   DB_PASSWORD=your_password
   DB_HOST=localhost
   DB_PORT=5432

   # JWT Configuration
   JWT_SECRET=your_very_secure_secret_key
   ```

4. Create a new PostgreSQL database:
   ```sql
   CREATE DATABASE student_management;
   ```

5. Run database migrations:
   ```bash
   npx sequelize-cli db:migrate
   ```

## Running the Application

### Development Mode
```bash
npm run dev
```
This will start the server with nodemon for automatic reloading.

### Production Mode
```bash
npm start
```

## API Documentation

### Authentication

**Login**
- **URL**: `/api/auth/login`
- **Method**: `POST`
- **Request Body**:
  ```json
  {
    "username": "admin",
    "password": "password123"
  }
  ```
- **Success Response**:
  ```json
  {
    "token": "your_jwt_token_here"
  }
  ```

### Students

**Get All Students**
- **URL**: `/api/students`
- **Method**: `GET`
- **Headers**:
  - `Authorization: Bearer <token>`

**Add New Student**
- **URL**: `/api/students`
- **Method**: `POST`
- **Headers**:
  - `Authorization: Bearer <token>`
  - `Content-Type: application/json`
- **Request Body**:
  ```json
  {
    "name": "John Doe",
    "class": "10A",
    "rollNo": "101"
  }
  ```

### Attendance

**Mark Attendance**
- **URL**: `/api/attendance`
- **Method**: `POST`
- **Headers**:
  - `Authorization: Bearer <token>`
  - `Content-Type: application/json`
- **Request Body**:
  ```json
  {
    "studentId": 1,
    "date": "2025-07-20",
    "status": "Present"
  }
  ```

**Get Student Attendance**
- **URL**: `/api/attendance/:studentId`
- **Method**: `GET`
- **Headers**:
  - `Authorization: Bearer <token>`

## Project Structure

```
student-management-system/
├── config/           # Configuration files
├── controllers/      # Request handlers
├── middleware/       # Custom middleware
├── models/           # Database models
├── routes/           # API routes
├── .env              # Environment variables
├── .gitignore        # Git ignore file
├── app.js            # Main application file
├── package.json      # Project dependencies
└── README.md         # This file
```

## Environment Variables

- `PORT` - Port number for the server (default: 5000)
- `NODE_ENV` - Application environment (development/production)
- `DB_NAME` - PostgreSQL database name
- `DB_USER` - PostgreSQL username
- `DB_PASSWORD` - PostgreSQL password
- `DB_HOST` - PostgreSQL host (default: localhost)
- `DB_PORT` - PostgreSQL port (default: 5432)
- `JWT_SECRET` - Secret key for JWT token generation

## Testing

Run the following command to start the development server:
```bash
npm run dev
```

Use tools like Postman or curl to test the API endpoints.

## Security

- All API routes (except login) require a valid JWT token
- Passwords are hashed using bcrypt
- Environment variables are used for sensitive configuration

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the ISC License - see the [LICENSE](LICENSE) file for details.
#
