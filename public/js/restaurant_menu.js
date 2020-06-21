
$(document).ready(function () {

var map;

function initMap(locations) {

    // const locations = [
    //     //this will be an empty array filled with info from menu search
    //     ["Hughies", 29.7982, -95.3833],
    //     ["ban oui", 29.7341, -95.3997],
    // ];

    map = new google.maps.Map(document.getElementById("map"), {
        //if statement for window,userlocation 
        center: { lat: 29.76, lng: -95.36 },
        zoom: 10,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
    
    });
    
    
    var infowindow = new google.maps.InfoWindow();

    var marker, i;
    for (i = 0; i < locations.length; i++) {  
        marker = new google.maps.Marker({
            //get results to pull from locations once we figure out how that info is coming in
            position: new google.maps.LatLng(locations[i][1], locations[i][2]),
            map: map,
            
        });
        google.maps.event.addListener(marker, 'click', (function(marker, i) {
            return function() {
                infowindow.setContent(locations[i][0]);
                infowindow.open(map, marker);
            }
        })(marker, i));
    }

}


    $("#searchMenuBtn").on("click", function (event) {
        event.preventDefault();
        console.log("I've been clicked");
        $("#resMenu").empty();
        //search movie should equal to the value entered by the user from the input field with an id of userMovieInput
        var searchMenu = $("#userMenuInput").val().trim();
        console.log(searchMenu);

        var settings = {
            "async": true,
            "crossDomain": true,
            "url": `https://us-restaurant-menus.p.rapidapi.com/menuitems/search?page=1&q=${searchMenu}`,
            "method": "GET",
            "headers": {
                "x-rapidapi-host": "us-restaurant-menus.p.rapidapi.com",
                "x-rapidapi-key": "230f5fd612msh4e36283b5d68e1bp179416jsnd53a23333929"
            }
        }

        $.ajax(settings).done(function (response) {
            console.log(response);

            var menuItem = []

            for (var i = 0; i < response.result.data.length; i++) {



                var foodApp = response.result.data[i].restaurant_name;
                console.log(foodApp);

                var foodName = response.result.data[i].menu_item_name;

                var resId = response.result.data[i].restaurant_id;
                console.log(resId);

                var geoLat = response.result.data[i].geo.lat;
                console.log(geoLat);
                var geoLon = response.result.data[i].geo.lon;
                console.log(geoLon);

                initMap([[foodApp, geoLat, geoLon]])

                var d1 = $("<div>").attr("class", "container");

                d1.append(foodApp);


            };

            menuAPI(response.result.data[0].restaurant_id);
        });

    });




    $("#searchMenuBtn").on("click", function (event) {
        event.preventDefault();
        console.log("I've been clicked");
        $("#resMenu").empty();
        //search movie should equal to the value entered by the user from the input field with an id of userMovieInput
        var searchMenu = $("#userMenuInput").val().trim();
        console.log(searchMenu);


    });

});



function menuAPI(restaurantId) {

    var settings = {
        "async": true,
        "crossDomain": true,
        "url": `https://us-restaurant-menus.p.rapidapi.com/restaurant/${restaurantId}/`,
        "method": "GET",
        "headers": {
            "x-rapidapi-host": "us-restaurant-menus.p.rapidapi.com",
            "x-rapidapi-key": "230f5fd612msh4e36283b5d68e1bp179416jsnd53a23333929"
        }
    }

    $.ajax(settings).done(function (response) {
        console.log(response);

    });



};

$("#saveFavorite").on("click", function (event) {
    event.preventDefault();
    console.log("I've been clicked");

    var favorite={
        "async": true,
        "url": "/api/user_data",
        "method": "POST",
        "data": {
            restaurantName: "Becks",
            foodName: "burger",
            geoLat: 29.7604,
            geoLon: -95.3698,
        }
    }
    $.ajax(favorite).done(function(response){
        console.log(response.status)
    })


});

