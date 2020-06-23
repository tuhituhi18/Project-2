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
        document.getElementById("menu-input").classList.add("hide")

        document.getElementById("signUpContainer").classList.add("hide")

        document.getElementById("search-results").classList.remove("hide")

        event.preventDefault();
        // console.log("I've been clicked");
        $("#listbox-groups").empty();
        //search menu should equal to the value entered by the user from the input field with an id of userMenuInput
        var searchMenu = $("#userMenuInput").val().trim();
        console.log(searchMenu);

        var searchMile = $("#userMileInput").val().trim();
        console.log(searchMile);

        searchMile = parseInt(searchMile)


        var settings = {
            "async": true,
            "crossDomain": true,
            //"url": `https://us-restaurant-menus.p.rapidapi.com/menuitems/search/geo?distance=${searchMile}&lat=${latitude}&page=50&q=${searchMenu}&lon=${longitude}`,
            "url": `https://us-restaurant-menus.p.rapidapi.com/restaurants/search/geo?page=10&lon=${longitude}&lat=${latitude}&distance=${searchMile}`,
            // "url": `https://us-restaurant-menus.p.rapidapi.com/menuitems/search?distance=${searchMile}&lat=${latitude}&page=50&q=${searchMenu}&lon=${longitude}`,


            "method": "GET",
            "headers": {
                "x-rapidapi-host": "us-restaurant-menus.p.rapidapi.com",
                "x-rapidapi-key": "230f5fd612msh4e36283b5d68e1bp179416jsnd53a23333929"
            }

        }

        $.ajax(settings).done(function (response) {

            var resArray = []


            for (var i = 0; i < response.result.data.length; i++) {

                if (response.result.data[i].restaurant_name.toLowerCase().includes(searchMenu.toLowerCase()) || response.result.data[i].cuisines.map((x) => { return x.toLowerCase() }).includes(searchMenu.toLowerCase())) {

                    var foodApp = response.result.data[i].restaurant_name;
                    console.log(foodApp);
                    var foodName = response.result.data[i].menu_item_name;

                    var resId = response.result.data[i].restaurant_id;
                    console.log(resId);
                    var geoLat = response.result.data[i].geo.lat;
                    console.log(geoLat);
                    var geoLon = response.result.data[i].geo.lon;
                    console.log(geoLon);


                    var id = response.result.data[i].restaurant_id;
                    var name = response.result.data[i].restaurant_name;
                    $('#listbox-groups').append(
                        `<li> <span id="${id}" class="listbox-li"><a href="#" class="listbox-li-a" style="text-decoration: none">${name}</a></span>
                        
                    <button data-id="${id}" data-restaurant = "${foodApp}" data-food= "${searchMenu}" data-lat= "${geoLat}" data-lon = "${geoLon}" class="save"> Save to Favorites</button>
                    </li>`);
                    resArray.push([foodApp, searchMenu, geoLat, geoLon])
                    console.log(resArray)

                }

            };


            var map;

            function initMap() {

                const locations = resArray;
                //this will be an empty array filled with info from menu search
                console.log(locations);


                map = new google.maps.Map(document.getElementById("map"), {
                    //if statement for window,userlocation 
                    center: { lat: latitude, lng: longitude },
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
                    google.maps.event.addListener(marker, 'click', (function (marker, i) {
                        return function () {
                            infowindow.setContent(locations[i][0]);
                            infowindow.open(map, marker);
                        }
                    })(marker, i));
                }


            }
            initMap()


            const result = [];
            const menuMap = new Map();
            for (const item of response.result.data) {
                if (!menuMap.has(item.restaurant_id)) {
                    menuMap.set(item.restaurant_id, true);    // set any value to Map
                    result.push(item);
                }
            }

            $("#listbox-groups li span").on("click", function (event) {


                menuAPI($(this).attr("id"));

                return false;
            });
        });

    });


    // $("#searchMenuBtn").on("click", function (event) {
    //     event.preventDefault();
    //     console.log("I've been clicked");

    //     //search menu should equal to the value entered by the user from te input field with an id of user userMenuInput
    //     var searchMenu = $("#userMenuInput").val().trim();
    //     console.log(searchMenu);
    // });
    function menuAPI(restaurantId) {
        $("#resMenu").empty();
        $.ajax({
            method: "POST",
            url: "/api/menu",
            data: { id: restaurantId }
        }).done(function (data) {

            let { menu_sections } = data.menus[0];

            for (var j = 0; j < menu_sections.length; j++) {

                for (var k = 0; k < menu_sections[j].menu_items.length; k++) {
                    var menItem = menu_sections[j].menu_items[k];
                    //where render functions will occur
                    $('#resMenu').append(`
                <li class="listbox-li"> ${menItem.name}  
                    </li>`);
                }
            }
            console.log(data)
        })


    };

    // restaurantDiv.append(map);

    $("html").on("click", ".save", function (event) {
        event.stopPropagation();
        console.log("I've been clicked");

        var favorite = {
            "async": true,
            "url": "/api/user_data",
            "method": "POST",
            "data": {
                restaurantName: $(this).attr("data-restaurant"),
                foodName: $(this).attr("data-food"),
                geoLat: $(this).attr("data-lat"),
                geoLon: $(this).attr("data-lon"),
            }
        }
        $.ajax(favorite).done(function (response) {
            console.log(favorite)
        })

    });

    function initializeFavorites(){
        $("#resList").empty()
        var favorite = [];
        for (var i=0; i< UserFavorite.length; i++){
            favorite.push(UserFavorite[i])
        }
        $("#resLis").prepend(favorite);
    }

    $("html").on("click", ".members", function (event) {
        event.preventDefault();
        console.log("favorite clicked");
        
        $.get(/api/user_data, function(data){
            favorites = data;
            initializeFavorites();
        });
    })


});


