// Global Variables and setup (mongoose, body-parser)
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const port = 3000;
mongoose.set("useNewUrlParser", true);
mongoose.set("useUnifiedTopology", true);
mongoose.connect("mongodb://localhost/yelp_camp");
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");

// SCHEMA SETUP
var campgroundSchema = new mongoose.Schema({
  name: String,
  image: String,
  description: String,
});

var Campground = mongoose.model("Campground", campgroundSchema);

var campgrounds = [];

// Home route/home page
app.get("/", (req, res) => {
  res.render("landing");
});

// Get all camgrounds from DB
app.get("/campgrounds", (req, res) => {
  Campground.find({}, (err, allCampgrounds) => {
    if (err) {
      console.log("err");
    } else {
      res.render("index", { campgrounds: allCampgrounds });
    }
  });
});
// Create new campground to database
app.post("/campgrounds", (req, res) => {
  var name = req.body.cgName;
  var image = req.body.cgImage;
  var description = req.body.description;
  var newCampground = { name: name, image: image, description: description };
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
app.get("/campgrounds/new", (req, res) => {
  res.render("new");
});

// Show page (click on a form to show more info)
app.get("/campgrounds/:id", (req, res) => {
  // Find the campground with given ID
  Campground.findById(req.params.id, (err, foundCampground) => {
    if (err) {
      console.log(campground);
      console.log(err);
    } else {
      res.render("show", { campground: foundCampground });
    }
  });
});

app.listen(port, () => console.log("running on port 3000"));
