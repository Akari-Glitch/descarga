const Sales = require("../models/Sales");
const Tasadolar = require("../models/Tasadolar");
const Articles = require("../models/Articles");
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

router.get("/manual/addVenta", async (req, res, next) => {
  let tasadolar = await Tasadolar.find();

  res.render("manualAddVenta", { tasadolar: tasadolar });
});
router.get("/manual/inventario", async (req, res, next) => {
  let tasadolar = await Tasadolar.find();

  res.render("manualInventario", { tasadolar: tasadolar });
});
router.get("/manual/verVentas", async (req, res, next) => {
  let tasadolar = await Tasadolar.find();

  res.render("manualVerVentas", { tasadolar: tasadolar });
});
router.get("/manual/editar", async (req, res, next) => {
  let tasadolar = await Tasadolar.find();

  res.render("manualEditar", { tasadolar: tasadolar });
});
router.get("/manual/opciones", async (req, res, next) => {
  let tasadolar = await Tasadolar.find();

  res.render("manualOpciones", { tasadolar: tasadolar });
});

router.get("/", (req, res, next) => {
  res.render("signup");
});

router.get("/signup", (req, res, next) => {
  res.render("signup");
});

router.get("/manual", async (req, res, next) => {
  let tasadolar = await Tasadolar.find();

  res.render("manual", { tasadolar: tasadolar });
});
router.post(
  "/signup",
  passport.authenticate("local-signup", {
    successRedirect: "/index",
    failureRedirect: "/signup",
    failureFlash: true,
  })
);

router.get("/logout", (req, res, next) => {
  req.logout();
  res.redirect("/");
});
router.get("/index", isAuthenticated, async (req, res, next) => {
  let tasadolar = await Tasadolar.find();

  res.render("index", { tasadolar: tasadolar });
});

router.get("/calculadora", isAuthenticated, async (req, res, next) => {
  let tasadolar = await Tasadolar.find();

  res.render("calculadora", { tasadolar: tasadolar });
});

router.get("/inventario", isAuthenticated, async (req, res, next) => {
  let tasadolar = await Tasadolar.find();
  let articles = await Articles.find();
  res.render("inventario", { tasadolar: tasadolar, articles: articles });
});

router.post("/tasadolar", async (req, res, next) => {
  const id = "6240c9d3969bffa29486a7ce";
  await Tasadolar.findByIdAndUpdate(id, req.body);
  res.redirect("/index");
});

router.post("/editInv", async (req, res, next) => {
  const id = "62413d1a1c41362985285620";
  await Articles.findByIdAndUpdate(id, req.body);
  res.redirect("/inventario");
});

router.get("/ventas", isAuthenticated, async (req, res, next) => {
  let tasadolar = await Tasadolar.find();
  const sales = await Sales.find();
  res.render("ventas", { sales: sales, tasadolar: tasadolar });
});

router.get("/opciones", isAuthenticated, async (req, res, next) => {
  let tasadolar = await Tasadolar.find();

  res.render("opciones", { tasadolar: tasadolar });
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
  res.redirect("/ventas");
});

router.get("/delete/:id", async (req, res) => {
  const { id } = req.params;

  await Sales.findByIdAndDelete(id);
  res.redirect("/ventas");
});
function isAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }

  res.redirect("/");
}

module.exports = router;
