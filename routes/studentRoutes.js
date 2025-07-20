const express = require("express");
const router = express.Router();
const auth = require("../middleware/authMiddleware");
const { addStudent, getAllStudents } = require("../controllers/studentController");

router.post("/", auth, addStudent);
router.get("/", auth, getAllStudents);

module.exports = router;
