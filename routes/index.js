var express = require("express");
var router = express.Router();
var passport = require("passport");
var User = require("../models/user");
// Home route/home page
router.get("/", (req, res) => {
  res.render("landing");
});

// Seed page to test same data
// router.get("/seedDB", (req, res) => {
//   seedDB();
//   res.send("Db seeded");
// });

// Register form route
router.get("/register", (req, res) => {
  res.render("register");
});

// Resister post route
router.post("/register", (req, res) => {
  var newUser = new User({ username: req.body.username });
  User.register(newUser, req.body.password, (err, user) => {
    if (err) {
      return res.render("register", { error: err.message });
    }
    passport.authenticate("local")(req, res, () => {
      req.flash("success", "Welcome to YelpCamp " + user.username);
      res.redirect("/campgrounds");
    });
  });
});

// Show login form
router.get("/login", (req, res) => {
  res.render("login");
});

// handling login logic
router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/campgrounds",
    failureRedirect: "/login",
  }),
  (req, res) => {}
);

// Logout logic
router.get("/logout", (req, res) => {
  req.logout();
  req.flash("success", "You have logged out!");
  res.redirect("/campgrounds");
});

module.exports = router;
