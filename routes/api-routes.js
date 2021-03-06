// Requiring our models and passport as we've configured it
const db = require("../models");
const passport = require("../config/passport");
const axios = require("axios");
require("dotenv").config();

module.exports = function (app) {
  // Using the passport.authenticate middleware with our local strategy.
  // If the user has valid login credentials, send them to the members page.
  // Otherwise the user will be sent an error
  app.post("/api/login", passport.authenticate("local"), (req, res) => {
    // Sending back a password, even a hashed password, isn't a good idea
    res.json({
      email: req.user.email,
      id: req.user.id
    })
  });

  app.get("/api/users", (req, res)=>{
    db.User.findAll({})
    .then(dbUser =>{
      res.json(dbUser);
    })
  })
  // Route for signing up a user. The user's password is automatically hashed and stored securely thanks to
  // how we configured our Sequelize User Model. If the user is created successfully, proceed to log the user in,
  // otherwise send back an error
  app.post("/api/signup", (req, res) => {
    db.User.create({
      email: req.body.email,
      password: req.body.password
    })
      .then(() => {
        res.redirect(307, "/api/login");
      })
      .catch(err => {
        res.status(401).json(err);
      });
  });

  // Route for logging user out
  app.get("/logout", (req, res) => {
    req.logout();
    req.session.destory();
    res.redirect("/");
  });

  app.post("/api/menu", (req, res) => {
    console.log("hello", req.user)
    var settings = {
      "async": true,
      "crossDomain": true,
      "url": `https://us-restaurant-menus.p.rapidapi.com/restaurant/${req.body.id}/`,
      "method": "GET",
      "headers": {
        "x-rapidapi-host": "us-restaurant-menus.p.rapidapi.com",
        "x-rapidapi-key": process.env.API_KEY
      }
    }
    axios(settings).then(function ({ data }) {
      console.log(data.result);
      res.json(data.result.data[0]);

    });
  })


  app.post("/api/user_data", (req, res) => {
    console.log(req.body)
    db.UserFavorite.create({
      restaurantName: req.body.restaurantName,
      foodName: req.body.foodName,
      geoLat: req.body.geoLat,
      geoLon: req.body.geoLon,
      UserId: req.user.id
    })
      .then(() => {
        res.status(201);
      })
      .catch(err => {
        console.log(err)
        res.status(401).json(err);
      });

  })
  // Route for getting some data about our user to be used client side
  // app.get("/api/user_data", (req, res) => {
  //   if (!req.user) {
  //     // The user is not logged in, send back an empty object
  //     res.json({});
  //   } else {

  //     db.UserFavorite.findOne({
  //       where:{
  //         UserId: req.params.id
  //       },
  //       include: [db.UserFavorite]
  //     }).then(function(dbUserFavorite){
  //       res.json(dbUserFavorite)
  //     });

  //   }
  // });
};
