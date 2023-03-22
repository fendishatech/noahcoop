const db = require("../../helper/database");
const { DataTypes } = require("sequelize");

const EducationalStatus = db.define("edu_statuses", {
  name: DataTypes.STRING,
});

module.exports = EducationalStatus;
