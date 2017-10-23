import * as User from "../models/user";
const UserModel = User.UserModel;
export let create = async (ctx: any, next: any) => {
  const body = ctx.request.body;
  try {
    if (!body.name || !body.password) {
      throw ({ code: 400, message: "bad request!" });
    }
    const newUser = new UserModel(body);
    const result = await User.createUser(newUser);
    ctx.body = JSON.stringify(result);
  } catch (err) {
    ctx.response.status = err.code;
    ctx.response.message = err.message;
  }
};

export let findAll = async (ctx: any, next: any) => {
  try {
    const query = ctx.query;
    const users = await User.findAll(query);
    ctx.body = JSON.stringify(users);
  } catch (err) {
    ctx.response.status = err.code;
    ctx.response.message = err.message;
  }
};