import * as Koa from "koa";
import { api } from "./routers/user";
const app = new Koa();
app.use(async ctx => {
  ctx.body = "Hello World";
});
app.listen(3000);