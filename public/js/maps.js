//var menu = require("menu.js")

var map;


function initMap() {
    
    const locations = [
        //this will be an empty array filled with info from menu search
        ["Hughies", 29.7982, -95.3833],
        ["ban oui", 29.7341, -95.3997],
    ];

    map = new google.maps.Map(document.getElementById("map"), {
        center: { lat: 29.76, lng: -95.36 },
        zoom: 10,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
    
    });
    
    

    var marker, i;
    for (i = 0; i < locations.length; i++) {  
        marker = new google.maps.Marker({
            //get results to pull from locations once we figure out how that info is coming in
            position: new google.maps.LatLng(locations[i][1], locations[i][2]),
            map: map,
            
        });
    }

    var infowindow = new google.maps.InfoWindow({
        //need to figure out why name isnt working?
        content: locations[i][0],
    });

    google.maps.event.addListener(marker, 'click', (function(marker, i) {
        return function() {
            // infowindow.setContent(locations[i][0]);
            infowindow.open(map, marker);
        }
    })(marker, i));

}
