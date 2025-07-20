const sequelize = require("../config/db");

const Admin = require("./Admin")(sequelize);
const Student = require("./Student")(sequelize);
const Attendance = require("./Attendance")(sequelize);

Student.hasMany(Attendance, { foreignKey: "studentId" });
Attendance.belongsTo(Student, { foreignKey: "studentId" });

module.exports = { sequelize, Admin, Student, Attendance };
