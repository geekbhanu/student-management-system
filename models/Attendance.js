const { DataTypes } = require("sequelize");

module.exports = (sequelize) =>
  sequelize.define("Attendance", {
    date: DataTypes.DATEONLY,
    status: {
      type: DataTypes.ENUM("Present", "Absent"),
      defaultValue: "Present",
    },
  });
