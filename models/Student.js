const { DataTypes } = require("sequelize");

module.exports = (sequelize) =>
  sequelize.define("Student", {
    name: DataTypes.STRING,
    class: DataTypes.STRING,
    rollNo: DataTypes.STRING,
  });
