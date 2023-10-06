import passport from "passport";
import localStrategy from "./local/localStrategy";


export default function passportConfig(app) {
  app.use(passport.initialize());
  app.use(passport.session());

  passport.serializeUser((user, done) => {
    return done(null, user)
  })

  passport.deserializeUser((user, done) => {
    return done(null, user);
  })



  localStrategy()
}

