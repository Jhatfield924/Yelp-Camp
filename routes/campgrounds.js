var express = require("express");
var router = express.Router();
var Campground = require("../models/campground");
var middleware = require("../middleware/index.js");
// Get all camgrounds from DB
router.get("/", (req, res) => {
  Campground.find({}, (err, allCampgrounds) => {
    if (err) {
      console.log("err");
    } else {
      res.render("campground/index", {
        campgrounds: allCampgrounds,
        currentUser: req.user,
      });
    }
  });
});

// Create new campground to database
router.post("/", middleware.isLoggedIn, (req, res) => {
  var name = req.body.cgName;
  var image = req.body.cgImage;
  var price = req.body.price;
  var description = req.body.description;
  var author = {
    id: req.user._id,
    username: req.user.username,
  };
  var newCampground = {
    name: name,
    price: price,
    image: image,
    description: description,
    author: author,
  };
  // create new campground and save to DB
  Campground.create(newCampground, (err, newlyCreated) => {
    if (err) {
      console.log("Oops");
    } else {
      res.redirect("/campgrounds");
    }
  });
});

// Show form to create new campground
router.get("/new", middleware.isLoggedIn, (req, res) => {
  res.render("campground/new");
});

// Show page (click on a form to show more info)
router.get("/:id", (req, res) => {
  Campground.findById(req.params.id)
    .populate("comments")
    .exec((err, foundCampground) => {
      if (err || !foundCampground) {
        console.log(err);
        req.flash("error", "Sorry, that campground does not exist!");
        return res, redirect("/campgrounds");
      } else {
        res.render("campground/show", { campground: foundCampground });
      }
    });
});

// Edit campground route
router.get(
  "/:id/edit",
  middleware.isLoggedIn,
  middleware.checkCampgroundOwnership,
  (req, res) => {
    Campground.findById(req.params.id, (err, foundCampground) => {
      res.render("campground/edit", { campground: foundCampground });
    });
  }
);

// Update campground route
router.put("/:id", middleware.checkCampgroundOwnership, (req, res) => {
  Campground.findByIdAndUpdate(
    req.params.id,
    req.body.campground,
    (err, updatedCampground) => {
      if (err) {
        res.redirect("/campgrounds");
      } else {
        res.redirect("/campgrounds/" + req.params.id);
      }
    }
  );
});

// Destroy route
router.delete("/:id", middleware.checkCampgroundOwnership, (req, res) => {
  Campground.findByIdAndRemove(req.params.id, (err) => {
    if (err) {
      res.redirect("/campgrounds");
    } else {
      res.redirect("/campgrounds");
    }
  });
});

module.exports = router;
