import * as Router from "koa-router";
import * as passport from "../config/passport";
import * as UserController from "../controllers/userController";
import * as ContactController from "../controllers/contactController";
import * as User from "../models/user";
const api = new Router();

// log
api.all("/*", async (ctx, next) => {
  const start = Date.now();
  console.log(`${ctx.method} ${ctx.url} - ${start}`);
  await next();
});
// get all users
api.get("/users", UserController.findAll);

// create a user
api.post("/users", UserController.create);

// create a contact
api.post("/users/:userId/contacts", ContactController.isAuth, ContactController.create);

// get all contacts
api.get("/users/:userId/contacts", ContactController.isAuth, ContactController.getAll);

// remove a  contact
api.delete("/users/:userId/contacts/:contactId", ContactController.isAuth, ContactController.remove);

// logout
api.get("/logout", (ctx, next) => {
  ctx.logout();
  ctx.body = "Logout";
});
// login
api.post("/login", (ctx, next) => {
  return passport.authenticate("local", function (err: any, user: any, info: any, status: any) {
    if (user) {
      ctx.body = user;
      return ctx.login(user);
    } else {
      ctx.status = 401;
      ctx.body = info;
    }
  })(ctx, next);
});

export default api;