const Sales = require("../models/Sales");
const router = require("express").Router();
const passport = require("passport");

router.get("/", (req, res, next) => {
  req.logout();
  res.render("signin", {});
});

router.post(
  "/",
  passport.authenticate("local-signin", {
    successRedirect: "/index",
    failureRedirect: "/",
    passReqToCallback: true,
  })
);

router.get("/logout", (req, res, next) => {
  req.logout();
  res.redirect("/");
});
router.get("/index", isAuthenticated, (req, res, next) => {
  res.render("index", {});
});

router.get("/calculadora", isAuthenticated, (req, res, next) => {
  res.render("calculadora", {});
});

router.get("/inventario", isAuthenticated, async (req, res, next) => {
  const sales = await Sales.find();

  res.render("inventario", { sales: sales });
});

router.get("/ventas", isAuthenticated, async (req, res, next) => {
  res.render("ventas");
});

router.post("/inventario/add", async (req, res, next) => {
  const sale = Sales(req.body);
  await sale.save();
  res.redirect("/inventario");
});

router.get("/edit/:id", isAuthenticated, async (req, res, next) => {
  const sale = await Sales.findById(req.params.id).lean();
  res.render("edit", { sale: sale });
});

router.post("/edit/:id", async (req, res, next) => {
  const { id } = req.params;
  await Sales.findByIdAndUpdate(id, req.body);
  res.redirect("/inventario");
});

router.get("/delete/:id", async (req, res) => {
  const { id } = req.params;

  await Sales.findByIdAndDelete(id);
  res.redirect("/inventario");
});
function isAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }

  res.redirect("/");
}

module.exports = router;
