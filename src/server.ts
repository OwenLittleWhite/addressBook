import * as Koa from "koa";
import api from "./routers/router";
import * as passport from "./config/passport";
import * as session from "koa-session2";
import * as bodyParser from "koa-bodyparser";
import * as mongoose from "mongoose";
import * as Boom from "boom";
import * as  mount from "koa-mount";
import { Config } from "./config/config";
const apiKey = Config.getInstance().apiKey;
const listening_port = Config.getInstance().listening_port;
const app = new Koa();

// connect to mongodb


// auth
app.proxy = true;
app.keys = [apiKey];
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
export default app.listen(listening_port, () => {
  console.log(`Open http://localhost:${listening_port} and try`);
});