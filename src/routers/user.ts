import * as Router from "koa-rest-router";
export let api = new Router({});
api.resource("users", {
  // GET /users
  index: [(ctx: any, next: any) => { ctx.body = "GET Users"; }]
},{});
