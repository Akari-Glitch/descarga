const express = require("express");
const morgan = require("morgan");
const passport = require("passport");
const session = require("express-session");
const flash = require("connect-flash");
const path = require("path");
// Initializations
const app = express();
require("./database");
require("./passport/local-auth");
app.use(express.static(path.join(__dirname, "static")));

//settings
app.set("port", process.env.PORT || 3000);
app.set("view engine", "pug");

//middlewares
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: false }));
app.use(
  session({
    secret: "puntomarketsession",
    reseave: false,
    saveUninitialized: false,
  })
);
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) => {
  app.locals.signinMessage = req.flash("signinMessage");
  next();
});
//routes
app.use("/", require("./routes/index"));

app.listen(app.get("port"), () => {
  console.log("servidor iniciado");
});
