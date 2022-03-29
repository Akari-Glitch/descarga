require("../database");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const Users = require("../models/Users");
const flash = require("connect-flash");

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  const user = await Users.findById(id);
  done(null, user);
});

passport.use(
  "local-signup",
  new LocalStrategy(
    {
      usernameField: "username",
      passwordField: "password",
      passReqToCallback: true,
    },
    async (req, username, password, done) => {
      const user = await Users.findOne({ username: username });
      console.log(user);
      if (user) {
        return done(
          null,
          false,
          req.flash("signupMessage", "Este usuario ya existe")
        );
      } else {
        const newUser = new Users();
        newUser.username = username;
        newUser.password = newUser.encryptPassword(password);
        console.log(newUser);
        await newUser.save();
        done(null, newUser);
      }
    }
  )
);

passport.use(
  "local-signin",
  new LocalStrategy(
    {
      usernameField: "username",
      passwordField: "password",
      passReqToCallback: true,
    },
    async (req, username, password, done) => {
      const user = await Users.findOne({ username: username });
      if (!user) {
        return done(
          null,
          false,
          req.flash("signinMessage", "No eres el admin :/")
        );
      }

      if (!user.comparePassword(password)) {
        return done(
          null,
          false,
          req.flash("signinMessage", "password incorrecta")
        );
      }

      return done(null, user);
    }
  )
);
