// import { Sequelize } from "sequelize";

// const db = new Sequelize('note_db', 'maysql','Jadagabu123',{
//     host: '34.58.197.34',
//     dialect:'mysql',
//     port: 3306
// });

// export default db;

import { Sequelize } from "sequelize";
import dotenv from "dotenv";
dotenv.config();

const db = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: "mysql"
  }
);

export default db;
