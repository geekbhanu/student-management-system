const { Student } = require("../models");

exports.addStudent = async (req, res) => {
  const student = await Student.create(req.body);
  res.status(201).json(student);
};

exports.getAllStudents = async (req, res) => {
  const students = await Student.findAll();
  res.json(students);
};
