const { Attendance } = require("../models");

exports.markAttendance = async (req, res) => {
  const { studentId, date, status } = req.body;
  const record = await Attendance.create({ studentId, date, status });
  res.status(201).json(record);
};

exports.getAttendanceByStudent = async (req, res) => {
  const { studentId } = req.params;
  const records = await Attendance.findAll({ where: { studentId } });
  res.json(records);
};
