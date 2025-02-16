import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import dotenv from "dotenv";
dotenv.config();

passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (user, done) {
  done(null, user);
});
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:4000/auth/google/callback",
      passReqToCallback: true,
    },
    (request, accessToken, refreshToken, profile, done) => {
      console.log(accessToken);
      console.log("User profile:", profile);
      return done(null, profile);
    }
  )
);

export default passport