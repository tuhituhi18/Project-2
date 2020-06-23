// Requiring path to so we can use relative routes to our HTML files
const path = require("path");
const axios = require("axios");

// Requiring our custom middleware for checking if a user is logged in
const isAuthenticated = require("../config/middleware/isAuthenticated");

module.exports = function (app) {
  app.get('/', (req, res) => {
    res.render("index", { layout: "main" });
  });

  app.get("/signup", (req, res) => {
    // If the user already has an account send them to the members page
    if (req.user) {
      res.redirect("/");
    }
    res.sendFile(path.join(__dirname, "../public/signup.html"));
  });

  app.get("/login", (req, res) => {
    // If the user already has an account send them to the members page
    if (req.user) {
      res.redirect("/");
    }
    res.sendFile(path.join(__dirname, "../public/login.html"));
  });

  app.get("/results/:food/:distance", (req, res) => {
    var settings = {

      //"url": `https://us-restaurant-menus.p.rapidapi.com/menuitems/search/geo?distance=${searchMile}&lat=${latitude}&page=50&q=${searchMenu}&lon=${longitude}`,
      // "url": `https://us-restaurant-menus.p.rapidapi.com/restaurants/search/geo?page=10&lon=${longitude}&lat=${latitude}&distance=${searchMile}`,
      // "url": `https://us-restaurant-menus.p.rapidapi.com/menuitems/search?distance=${searchMile}&lat=${latitude}&page=50&q=${searchMenu}&lon=${longitude}`,


      //"method": "GET",
      "headers": {
        "x-rapidapi-host": "us-restaurant-menus.p.rapidapi.com",
        "x-rapidapi-key": "230f5fd612msh4e36283b5d68e1bp179416jsnd53a23333929"
      }
    }

    axios.get(`https://us-restaurant-menus.p.rapidapi.com/restaurants/search?page=1&lon=${req.query.longitude}&lat=${req.query.latitude}&distance=${req.params.distance}&q=${req.params.food}`, settings)
      .then(result => {
        const restaurants = result.data.result.data.filter(restaurant => {
          return restaurant.cuisines.includes(req.params.food)
        })
        res.render("results", { layout: "main", data: restaurants })

      }).catch(e => {
        console.log(e)
        res.send(500)
      })



  })
  // Here we've add our isAuthenticated middleware to this route.
  // If a user who is not logged in tries to access this route they will be redirected to the signup page
  // app.get("/members", isAuthenticated, (req, res) => {
  //   res.sendFile(path.join(__dirname, "../public/members.html"));
  // });


};
