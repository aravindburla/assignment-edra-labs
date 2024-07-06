import sequelize, { Sequelize } from "sequelize";
import dotenv from "dotenv";
dotenv.config();

const details = {
  username: process.env.USERNAME,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
  dialect: "postgres",
  host: "localhost",
};

const sequelize = new Sequelize(details);

export default sequelize;
