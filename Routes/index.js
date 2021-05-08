require("dotenv").config();
const router = require("express").Router();
const mongoose = require("../db/connection");
const db = mongoose.connection;
// IMPORT MERCED LOGGER
const { log } = require("mercedlogger");
//IMPORT MIDDLEWARE
const methodOverride = require("method-override");
const morgan = require("morgan");
const cors = require("cors");
// GET PORT FROM ENV OR DEFAULT PORT
const PORT = process.env.PORT || "2021";
const SECRET = process.env.SECRET || "secret";
const Turtle = require("../Models/Turtle");
const { restart } = require("nodemon");

/////////////////////////
//! The Data
/////////////////////////
const turtlesArr = [
  { name: "Leonardo", role: "ninja" },
  { name: "Michaelangelo", role: "ninja" },
  { name: "Donatello", role: "ninja" },
  { name: "Raphael", role: "ninja" },
];

///////////////////////////////
//! LANDING PAGE Router
////////////////////////////////

router.get("/", (req, res) => {
  //res.json lets us send a response as JSON data
  res.json({
    response: "Hello World",
  });
});

///////////////////////////////
//! INDEX PAGE Router
////////////////////////////////

// index page data array
// router.get("/turtles", (req, res) => {
//   res.json(turtlesArr);
// });
//! index page mongo refactor
router.get("/turtles", (req, res) => {
  Turtle.find({}, (error, allTurtles) => {
    res.json(allTurtles);
  });
});

// new turtle page data array
// router.post("/turtles", (req, res) => {
//   turtlesArr.push(req.body);
//   res.json(turtlesArr);
// });
//! new turtle page mongo refactor
router.post("/turtles/", (req, res) => {
  Turtle.create(req.body, (error, createdTurtle) => {
    console.log(createdTurtle);
    res.redirect("/turtles");
  });
});

// delete route data array
// router.delete("/turtles/:index", (req, res) => {
//   turtlesArr.splice(req.params.index, 1);
//   res.json(turtlesArr);
// });
//! delete route mongo refactor
router.delete("/turtles/:id", (req, res) => {
  let deletedTurtle = req.params.id;
  Turtle.findByIdAndRemove(req.params.id, (error, data) => {
    console.log("The following turtle was deleted: ", deletedTurtle);
    res.redirect("/turtles");
  });
});

// update route data array
// router.put("/turtles/:index", (req, res) => {
//   turtlesArr[req.params.index] = req.body;
//   res.json(turtlesArr);
// });
//! update route mongo refactor
router.put("/turtles/:id", (req, res) => {
  Turtle.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true },
    (err, updatedModel) => {
      console.log(updatedModel);
      res.redirect("/turtles");
    }
  );
});

// Create page
//!  render a "new turtle" form page

// Edit GET route
// router.get("/turtles/:id/edit", (req, res) => {
//   Turtle.findById(req.params.id, (err, foundTurtle) => {
//     //! render an edit page here
//   })
// })

// show page
router.get("/turtles/:id", (req, res) => {
  Turtle.findById(req.params.id, (err, foundTurtle) => {
    console.log(foundTurtle);
    res.json(foundTurtle);
  });
});

//seed route
router.get("/seed", (req, res) => {
  Turtle.collection.drop();
  Turtle.create(turtlesArr, (error, turtle) => {
    if (error) {
      console.log(error);
    } else {
      console.log(turtlesArr);
    }
    db.close();
  });
});

///////////////////////////////
//! Export Router
////////////////////////////////
module.exports = router;
