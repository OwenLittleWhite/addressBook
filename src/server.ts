import * as Koa from "koa";
import api from "./routers/router";
import * as passport from "./config/passport";
import * as session from "koa-session2";
import * as bodyParser from "koa-bodyparser";
import * as mongoose from "mongoose";
import * as Boom from "boom";
import * as  mount from "koa-mount";
const app = new Koa();

// connect to mongodb


// auth
app.proxy = true;
app.keys = ["im a newer secret"];
app.use(session({ key: "SESSIONID", signed: true }));
app.use(bodyParser());
app.use(passport.initialize());
app.use(passport.session());
app.use(mount("/", api.routes()));

// routers
// app.use(api.routes());
app.use(api.allowedMethods({
  throw: true,
  notImplemented: () => Boom.notImplemented(),
  methodNotAllowed: () => Boom.methodNotAllowed()
}));
app.on("error", err => {
  console.error("server error", err);
});
// app listen
app.listen(4444, () => {
  console.log("Open http://localhost:4444 and try");
});