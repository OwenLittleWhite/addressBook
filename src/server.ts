import * as Koa from "koa";
import { api } from "./routers/router";
import * as passport from "./config/passport";
import * as session from "koa-session";
import * as bodyParser from "koa-bodyparser";
import * as mount from "koa-mount";

const app = new Koa();
app.proxy = true;
app.use(session({ key: "SESSIONID" }, this));
app.use(bodyParser());
app.use(passport.initialize());
app.use(passport.session());
app.use(mount("/", api.getRoutes()));


// x-response-time

app.use(async (ctx, next) => {
  const start = Date.now();
  await next();
  const ms = Date.now() - start;
  ctx.set("X-Response-Time", `${ms}ms`);
});

// logger

app.use(async (ctx, next) => {
  const start = Date.now();
  await next();
  const ms = Date.now() - start;
  console.log(`${ctx.method} ${ctx.url} - ${ms}`);
});

app.use(api.middleware());
app.on("error", err => {
  console.error("server error", err);
});
app.listen(4444, () => {
  console.log("Open http://localhost:4444 and try");
  // will output 2x14 links
  // - 14 links on `/api/v1` prefix
  // - 14 links on `/` prefix
  api.getRoutes().forEach((route: any) => {
    console.log(`${route.method} http://localhost:4444${route.path}`);
  });
});