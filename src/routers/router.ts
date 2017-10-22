import * as Router from "koa-router";
import * as passport from "../config/passport";

export let api = new Router();
api.all("/*", (ctx, next) => {
  const start = Date.now();
  console.log(`${ctx.method} ${ctx.url} - ${start}`);
  next();
});
api.get("/users", (ctx: any, next: any) => {
  if (ctx.isAuthenticated()) {
    ctx.body = ctx.state.user.id;
  } else {
    ctx.throw(401);
    ctx.body("hehe");
  }
});
api.get("/logout", (ctx, next) => {
  ctx.logout();
  ctx.body = "Logout";
});
api.post("/login", (ctx: any, next: any) => {
  return passport.authenticate("local", function (err: any, user: any, info: any, status: any) {
    if (user) {
      ctx.body = "YES";
      console.log(user);
      return ctx.login(user);
    } else {
      ctx.throw(401);
      ctx.body = info;
    }
  })(ctx, next);
});