$(document).ready(function () {


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