var Campground = require("../models/campground");
var Comment = require("../models/comment");
var middlewareObj = {
  checkCampgroundOwnership: function (req, res, next) {
    if (req.isAuthenticated()) {
      Campground.findById(req.params.id, (err, foundCampground) => {
        if (err || !foundCampground) {
          req.flash("error", "Campground not found.");
          res.redirect("back");
        } else {
          if (
            foundCampground.author.id.equals(req.user._id) ||
            req.user.isAdmin
          ) {
            req.campground = foundCampground;
            next();
          } else {
            req.flash("error", "You don't have permission to do that.");
            res.redirect("back");
          }
        }
      });
    } else {
      req.flash("error", "You need to be logged in to do that.");
      res.redirect("back");
    }
  },
  checkCommentOwnership: function (req, res, next) {
    if (req.isAuthenticated()) {
      Comment.findById(req.params.comment_id, (err, foundComment) => {
        if (err || !foundComment) {
          res.redirect("back");
        } else {
          if (foundComment.author.id.equals(req.user._id) || req.user.isAdmin) {
            req.comment = foundComment;
            next();
          } else {
            req.flash("error", "You don't have permission to do that");
            res.redirect("back");
          }
        }
      });
    } else {
      req.flash("error", "You need to be logged in to do that");
      res.redirect("back");
    }
  },
  isLoggedIn: function (req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    }
    req.flash("error", "You need to be logged in to do that!");
    res.redirect("/login");
  },
};

module.exports = middlewareObj;
