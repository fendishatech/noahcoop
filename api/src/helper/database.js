const Sequelize = require("sequelize");

const db = new Sequelize("noahcoop", "root", "", {
  host: "localhost",
  dialect: "mysql",
});

// const db = new Sequelize(
//   process.env.DATABASE_NAME,
//   process.env.DATABASE_USER,
//   process.env.DATABASE_PASSWORD,
//   {
//     host: process.env.DATABASE_HOST,
//     dialect: "mysql",
//   }
// );

module.exports = db;
