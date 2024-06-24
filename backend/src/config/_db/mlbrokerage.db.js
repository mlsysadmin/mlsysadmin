require('dotenv').config();
const { Sequelize } = require("sequelize");

const DB_NAME = process.env.DB_NAME;
const DB_USER = process.env.DB_USER;
const DB_PASS = process.env.DB_PASS;
const DB_HOST = process.env.DB_HOST;

const sequelize = new Sequelize(
    DB_NAME, DB_USER, DB_PASS,
    {
        host: DB_HOST,
        dialect: 'mysql',
        max: 10,
        min: 10
    }
)

sequelize.authenticate()
.then(() => {
    console.log("Database is established successfully");
})
.catch(err => {
    console.log("Error authenticating database: ", err);
})

module.exports = sequelize;