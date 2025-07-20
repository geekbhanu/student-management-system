const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { Admin } = require("../models");

exports.login = async (req, res) => {
  const { username, password } = req.body;
  const admin = await Admin.findOne({ where: { username } });
  if (!admin || !(await bcrypt.compare(password, admin.password)))
    return res.status(400).json({ msg: "Invalid credentials" });

  const token = jwt.sign({ id: admin.id }, process.env.JWT_SECRET, { expiresIn: "1d" });
  res.json({ token });
};
