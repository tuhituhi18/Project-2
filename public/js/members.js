$(document).ready(() => {
  // This file just does a GET request to figure out which user is logged in
  // and updates the HTML on the page
  $.get("/api/users").then(data => {
    $(".member-name").text(data.email);
  });

});

//     $(document).on("click", ".save", function (event) {
//   event.stopPropagation();
//   console.log("I've been clicked");

//   var favorite = {
//       "async": true,
//       "url": "/api/user_data",
//       "method": "POST",
//       "data": {
//           restaurantName: $(this).attr("data-restaurant"),
//           foodName: $(this).attr("data-food"),
//           geoLat: $(this).attr("data-lat"),
//           geoLon: $(this).attr("data-lon"),
//       }
//   }
//   $.ajax(favorite).done(function (response) {
//       console.log(favorite)
//   })

// });