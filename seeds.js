var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment = require("./models/comment");
var data = [
  {
    name: "Cloud's Rest",
    image:
      "https://californiathroughmylens.com/wp-content/uploads/2017/07/clouds-rest-20.jpg",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
  },
  {
    name: "Desert Mesa",
    image:
      "https://i.pinimg.com/originals/fa/17/82/fa1782af0ecc34b7849c8a24f8385c8f.jpg",
    description: "blah blah blah",
  },
  {
    name: "Canyon Floor",
    image:
      "https://media-cdn.tripadvisor.com/media/photo-s/01/29/b8/c1/canyon-floor.jpg",
    description: "blah blah blah",
  },
];

function seedDB() {
  // Remove all campgrounds
  Campground.remove({}, (err) => {
    if (err) {
      console.log(err);
    }
    console.log("removed campgrounds!");
    //   add a few campgrounds
    data.forEach((seed) => {
      Campground.create(seed, (err, campground) => {
        if (err) {
          console.log(err);
        } else {
          console.log("added a campground");
          //   create a comment
          Comment.create(
            {
              text: "This place is great but I wish there was internet",
              author: "Homer",
            },
            (err, comment) => {
              if (err) {
                console.log(err);
              } else {
                campground.comments.push(comment);
                campground.save();
                console.log("Created a new comment!");
              }
            }
          );
        }
      });
    });
  });
}

module.exports = seedDB;
