
$(document).ready(function () {

    var latitude;
    var longitude;


    function getLocation() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(showPosition);
        } else {
            console.log("Geolocation is not supported by this browser.");
        }
    }

    function showPosition(position) {
        latitude = position.coords.latitude;
        longitude = position.coords.longitude;
        console.log(position);

    }

    getLocation();


    $("#searchFoodBtn").on("click", function (event) {
        event.preventDefault();
        console.log("I've been clicked");
        $("#listbox-groups").empty();
        //search menu should equal to the value entered by the user from the input field with an id of userMenuInput
        var searchMenu = $("#userMenuInput").val().trim();
        console.log(searchMenu);

        var searchMile = $("#userMileInput").val().trim();
        console.log(searchMile);


        var settings = {
            "async": true,
            "crossDomain": true,
            "url": `https://us-restaurant-menus.p.rapidapi.com/menuitems/search/geo?distance=${searchMile}&lat=${latitude}&page=50&q=${searchMenu}&lon=${longitude}`,

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

            const result = [];
            const map = new Map();
            for (const item of response.result.data) {
                if (!map.has(item.restaurant_id)) {
                    map.set(item.restaurant_id, true);    // set any value to Map
                    result.push(item);
                }
            }


            for (var i = 0; i < result.length; i++) {
                var id = result[i].restaurant_id;
                var name = result[i].restaurant_name;
                $('#listbox-groups').append('<li id="' + id + '" class="listbox-li"><a href="#" class="listbox-li-a" style="text-decoration: none">' + name + '</a></li>');
            }
            ;

            $("#listbox-groups li").on("click", function (event) {


                menuAPI($(this).attr("id"));

                return false;
            });

        });

    });


    $("#searchMenuBtn").on("click", function (event) {
        event.preventDefault();
        console.log("I've been clicked");
        $("#resMenu").empty();
        //search menu should equal to the value entered by the user from the input field with an id of user userMenuInput
        var searchMenu = $("#userMenuInput").val().trim();
        console.log(searchMenu);
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

            var result = [];
            var searchMenu = $("#userMenuInput").val().trim();

            for (var i = 0; i < response.menu.length; i++) {
                for (var j = 0; j < response.menu[i].menu_sections.length; j++) {
                    for (var k = 0; k < response.menu[i].menu_sections[j].menu_items.length; k++) {
                        var menItem = response.menu[i].menu_sections[j].menu_items[k]
                        if (menItem.name.includes(searchMenu)) {
                            result.append(menItem);

                        }


                    }


                }

            }
            for (var i = 0; i < result.length; i++) {

                var name = result[i].name;
                $('#resMenu').append('<li class="listbox-li">' + name + '</li>');



            }


        });
    };


    // creating an ajax call when a specific resturant is clicked on to pull up the map
});