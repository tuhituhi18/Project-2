$(document).ready(() => {
  // This file just does a GET request to figure out which user is logged in
  // and updates the HTML on the page
  $.get("/api/users").then(data => {
    $(".member-name").text(data.email);
  });

});

$('#favbox-groups').append(
  `<li> <span id="${id}" class="favbox-li"><a href="#" class="favbox-li-a" style="text-decoration: none">${name}</a></span>
  
<button data-id="${id}" data-restaurant = "${foodApp}" data-food= "${searchMenu}" data-lat= "${geoLat}" data-lon = "${geoLon}" class="save"> Save to Favorites</button>
</li>`);
resArray.push([foodApp, searchMenu, geoLat, geoLon])
console.log(resArray)

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