$(document).ready(function () {

    $(".card").hide();

    function searchCity(city) {
        // Here we run our AJAX call to the OpenWeatherMap API

        const API = "51d7968cfee71b16dc19326d1a6ed198";


        var queryURL = 'https://api.openweathermap.org/data/2.5/weather?q=' + city + "&units=imperial" + "&APPID=" + API;

        $.ajax({
            url: queryURL,
            method: "GET",
            dataType: "jsonp",
            success: function (response) {
                console.log(response);
            }
        })
            // We store all of the retrieved data inside of an object called "response"
            .done(function (response) {


                $(".city").html("<h1>Weather in  " + response.name + "</h1>");
                $(".city-card").html(response.name);
                $(".date").text(Date());
                $("#icon").html("<img src='http://openweathermap.org/img/w/" + response.weather[0].icon + ".png' alt='Icon depicting current weather.'>");

                console.log(response.weather.icon);

                $("#temperature").text("Current temp: " + response.main.temp.toFixed(1) + "°(F)");
                $("#humidity").text("Humidity: " + response.main.humidity + "%");
                $("#max-temp").text("Max Temp: " + response.main.temp_max + "°(F)");
                $("#min-temp").text("Min Temp: " + response.main.temp_min + "°(F)");
                $("#description").text("Looks like " + response.weather[0].description);
                $("#wind").text("Wind: " + response.wind.speed + " mph");
                $("#rain").text("Rain: " + response.rain);
                // $("#icon").html("time of day " + response.weather[0].icon);
                $("#sunrise").text("Sunrise: " + response.sys.sunrise);
                // Log the queryURL
                console.log(queryURL);

                // Log the resulting object
                console.log(response);
                console.log(response.weather[0].description);
            });

    }
    //end of function

    $("#search-btn").on("click", function () {
        var searchForYourCity = $("#search-city").val().trim();
        console.log(searchForYourCity);

        $("#search-city").val("");

        if (searchForYourCity === "" || searchForYourCity === undefined) {
            alertify.error("Enter a name of city!");

        } else {
            searchCity(searchForYourCity);
            $(".card").show();
        }

    });

});