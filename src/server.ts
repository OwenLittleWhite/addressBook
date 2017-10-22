import * as Koa from "koa";
import { api } from "./routers/router";
import * as passport from "./config/passport";
import * as session from "koa-session2";
import * as bodyParser from "koa-bodyparser";

const app = new Koa();

// connect to mongodb


// auth
app.proxy = true;
app.keys = ["im a newer secret", "i like turtle"];
app.use(session({ key: "SESSIONID", signed: true }));
app.use(bodyParser());
app.use(passport.initialize());
app.use(passport.session());



// routers
app.use(api.routes());

// app listen
app.listen(4444, () => {
  console.log("Open http://localhost:4444 and try");
});