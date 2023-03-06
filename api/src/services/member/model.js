const Sequelize = require("sequelize");
const db = require("../../helper/database");

const { DataTypes } = Sequelize;

const Members = db.define(
  "members",
  {
    first_name: {
      type: DataTypes.STRING,
    },
    middle_name: {
      type: DataTypes.STRING,
    },
    last_name: {
      type: DataTypes.STRING,
    },
    title: {
      type: DataTypes.STRING,
      nullable: true,
    },
    gender: {
      type: DataTypes.ENUM("male", "female"),
      nullable: true,
    },
    dob: {
      type: DataTypes.DATE,
      nullable: true,
    },
    martial_status: {
      type: DataTypes.ENUM("married", "single", "divorced", "widow"),
      nullable: true,
    },
    family_members_no: {
      type: DataTypes.INTEGER,
      nullable: true,
    },
    family_members_gender: {
      type: DataTypes.STRING,
      nullable: true,
    },
    edu_status: {
      type: DataTypes.ENUM(
        "elementary",
        "primary",
        "secondary",
        "college",
        "degree",
        "masters",
        "phd",
        "professor"
      ),
      nullable: true,
    },
    job_title: {
      type: DataTypes.STRING,
      unique: true,
    },
    job_experience: {
      type: DataTypes.STRING,
      unique: true,
    },
    phone_no: {
      type: DataTypes.STRING,
      nullable: true,
    },
    will_list: {
      type: DataTypes.STRING,
    },
    password: {
      type: DataTypes.STRING,
    },
    member_type: {
      type: DataTypes.ENUM("regular", "child"), // An ENUM with allowed values 'foo' and 'bar'
    },
    refresh_token: {
      type: DataTypes.STRING,
    },
  },
  {
    freezeTableName: true,
  }
);

module.exports = Users;
