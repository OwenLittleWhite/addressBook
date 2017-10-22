import * as Router from "koa-rest-router";
import * as passport from "../config/passport";
// import * as passportHttp from "passport-http";
// import * as passportHttpBearer from "passport-http-bearer";
// import * as jwt from "jsonwebtoken";
// const BasicStrategy = passportHttp.BasicStrategy;
// const JwtBearerStrategy = passportHttpBearer.Strategy;
// passport.use("basic", new BasicStrategy(
//   (username, password, done) => {
//     // TODO
//     if (username == password) {
//       done(null, { name: "owen", id: 5 });
//     } else {
//       done(null, false);
//     }
//   }
// ));
// passport.use("jwt-bearer", new JwtBearerStrategy((token: any, done: any) => {
//   if (token) {
//     try {
//       let decode = jwt.verify(token, "owen")
//       return done(null, decode);
//     } catch (err) {
//       return done(err, false);
//     }
//   } else {
//     return done(null, false);
//   }
// }));

// let jwtAuth = (ctx: any, next: any) => {
//   if (!ctx.request.user) {
//     passport.authenticate('jwt-bearer', { session: false }, function (err: any, user: any) {
//       ctx.response.user = user;
//       ctx.response.err = err;
//       next();
//     })(ctx.request, ctx.response, next);

//   } else {
//     next();
//   }
// };

// let basicAuth = (ctx: any, next: any) => {
//   if (!ctx.request.user) {
//     passport.authenticate("basic", (err: any, user: any) => {
//       if (user && user.id && user.name) {
//         ctx.request.user = user;
//         let exp = new Date().getTime() + (60 * 60 * 24 * 30);
//         let payload = {
//           name: user.name,
//           id: user.id,
//           exp: exp
//         };
//         ctx.request.token = jwt.sign(payload, "Owen");
//       }
//       next();
//     })(ctx.request, ctx.response, next);
//   } else {
//     next();
//   }
// }

// let isAuthenticated = (ctx: any, next: any) => {
//   if (!ctx.request.user) {
//     ctx.response.status = 401;
//   } else {
//     next();
//   }
// }

export let api = new Router({});
api.resource("users", {
  // GET /users
  index: [(ctx: any, next: any) => { ctx.body = "GET Users"; }],
  create: (ctx: any, next: any) => {
    return passport.authenticate("local", function (err: any, user: any, info: any, status: any) {
      if (user) {
        ctx.body = "YES";
        console.log(user);
        return ctx.login(user);
      } else {
        ctx.body = info;
      }
    })(ctx, next);
  }
}, {});
api.resource("test", {
  index: (ctx: any, next: any) => {
    if (ctx.isAuthenticated()) {
      ctx.body = "test success";
    } else {
      ctx.throw(401);
      ctx.body = "hehe";
    }
  }
}, {});