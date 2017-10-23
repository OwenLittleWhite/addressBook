import * as Sequelize from "sequelize";
import { Config } from "../config/config";
const mysqlConfig = Config.getInstance().mysql;
interface IDbResult {
  dataValues: UserModel;
}
export class UserModel {
  id: number;
  name: string;
  password: string;
  constructor(options: any) {
    if (options.id) {
      this.id = options.id;
    }
    this.name = options.name || "";
    this.password = options.password || "";
  }
}
const init = (options: any) => {
  return new UserModel(options);
};
const initArr = (options: any[]) => {
  const userArr: UserModel[] = [];
  options.forEach((option) => {
    userArr.push(new UserModel(option));
  });
  return userArr;
};
const sequelize = new Sequelize(mysqlConfig.database, mysqlConfig.username, mysqlConfig.password, {
  dialect: "mysql",
  pool: {
    max: 5,
    min: 0,
    idle: 30000
  }
});
const User = sequelize.define("users", {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    defaultValue: 0
  },
  name: Sequelize.STRING(100),
  password: Sequelize.STRING(50),
  createdAt: Sequelize.BIGINT,
  updatedAt: Sequelize.BIGINT,
}, {
    timestamps: false
  });

export let createUser = async (userModel: UserModel) => {
  try {
    const result = <IDbResult>await User.create({
      name: userModel.name,
      password: userModel.password
    });
    return init(result.dataValues);
  } catch (err) {
    console.log(err);
    throw ({ code: 500, message: "internal server error" });
  }
};

export let authenticate = async (user: UserModel) => {
  const users = await findUserByCondition(user);
  if (users.length == 0) {
    throw ({ code: 404, message: "not found" });
  } else {
    return users[0];
  }

};

export let findAll = async (options?: any) => {
  const users = await findUserByCondition(options);
  return users;
};
/* private function */

const checkFindCondition = (options: any) => {
  const condition: any = {};
  if (options.name) {
    condition.name = options.name;
  }
  if (options.password) {
    condition.password = options.password;
  }
  return condition;
};

const findUserByCondition = async (options?: any) => {
  if (options != undefined) {
    options = checkFindCondition(options);
  } else {
    options = {};
  }
  try {
    const results = <[IDbResult]>await User.findAll({
      where: options
    });
    let users: any[];
    users = [];
    results.forEach((result) => {
      users.push(result.dataValues);
    });
    return initArr(users);
  } catch (err) {
    console.log(err);
    throw ({ code: 500, message: "internal server error" });
  }


};


