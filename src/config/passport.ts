import * as passport from "koa-passport";
import { Strategy } from "passport-local";

passport.use(new Strategy(
  function (username, password, done) {
    if (username == "owen" && password == "1234") {
      return done(undefined, { name: "owen", id: 2 });
    } else {
      return done(undefined, false, { message: "error" });
    }
  }

));

passport.serializeUser((user, done) => {
  console.log("serializeUser:", user);
  done(undefined, user);
});

passport.deserializeUser((user, done) => {
  console.log("deserializeUser:", user);
  return done(undefined, user);
});

export = passport;