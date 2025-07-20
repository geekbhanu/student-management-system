const { DataTypes } = require("sequelize");

module.exports = (sequelize) =>
  sequelize.define("Admin", {
    username: DataTypes.STRING,
    password: DataTypes.STRING,
  });
