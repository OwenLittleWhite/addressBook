import * as passport from "koa-passport";
import * as User from "../models/user";
import { Strategy } from "passport-local";

passport.use(new Strategy(
  function (username, password, done) {
    const user = new User.UserModel({ name: username, password: password });
    User.authenticate(user).then((_user) => {
      return done(undefined, _user);
    }).catch((err) => {
      return done(undefined, false, { message: err.message });
    });
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