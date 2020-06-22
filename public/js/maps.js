var menu = require("restaurant_menu")
var browserlocation = require("login")
var map;



var infowindow = new google.maps.InfoWindow();

var marker, i;
for (i = 0; i < locations.length; i++) {
    marker = new google.maps.Marker({
        //get results to pull from locations once we figure out how that info is coming in
        position: new google.maps.LatLng(locations[i][1], locations[i][2]),
        map: map,

    });
    google.maps.event.addListener(marker, 'click', (function (marker, i) {
        return function () {
            infowindow.setContent(locations[i][0]);
            infowindow.open(map, marker);
        }
    })(marker, i));
}


