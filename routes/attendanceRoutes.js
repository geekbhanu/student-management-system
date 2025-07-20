const express = require("express");
const router = express.Router();
const auth = require("../middleware/authMiddleware");
const { markAttendance, getAttendanceByStudent } = require("../controllers/attendanceController");

router.post("/", auth, markAttendance);
router.get("/:studentId", auth, getAttendanceByStudent);

module.exports = router;
