"use strict";
import { Sequelize } from "sequelize";
import dotenv from 'dotenv';
dotenv.config();

export const connect = (port) => {
  let sequelize = new Sequelize(process.env.DATABASE_NAME,  process.env.USER_NAME, process.env.PASS_WORD, {
      dialect: process.env.DIALECT,
      host: process.env.HOST_NAME,
      port: port,
      dialectOptions: {
        options: {
          encrypt: true // sử dụng khi kết nối với SQL Server qua HTTPS
        }
      }
    });
  return sequelize
}
