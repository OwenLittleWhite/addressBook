import * as Sequelize from "sequelize";
import { Config } from "../config/config";
let mysqlConfig = Config.getInstance().mysql;
export class UserModel {
  id: string;
  name: string;
  password: string;
  constructor(name: string, password: string) {
    this.name = name;
    this.password = password;
  }
}
let sequelize = new Sequelize(mysqlConfig.database, mysqlConfig.username, mysqlConfig.password, {
  dialect: "mysql",
  pool: {
    max: 5,
    min: 0,
    idle: 30000
  }
});
let User = sequelize.define('users', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: Sequelize.STRING(100),
  password: Sequelize.STRING(50)
});
export let createUser = async (userModel: UserModel) => {
  let user = await User.create({
    name: userModel.name,
    password: userModel.password
  });
  return user;
}