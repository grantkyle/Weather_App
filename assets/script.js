$(document).ready(function () {

    const apiKey = "appid=5dd0b09a506625237a5074c48b3d6f3e";
    let city = [];
    let index = 0;
    let weatherURL = "https://api.openweathermap.org/data/2.5/weather?" + apiKey + "&units=imperial&q=";
    let uviURL = "https://api.openweathermap.org/data/2.5/uvi?" + apiKey;

    var fatherTime = moment() // add moment
    console.log(fatherTime);
    displayRecents()
    // $(document).on("click", ".listnone", displayWeather);
    function displayRecents() {

        var storedCities = localStorage.getItem("city");
        if (storedCities !== null) {
            $(".showRecentCities").empty();
            var cityArray = JSON.parse(storedCities);

            if (cityArray.length >= 0) {
                var ul = $("<ul>").attr("class", "listnone");
                for (index = 0; index < cityArray.length; index++) {
                    var li = $("<li>").text(cityArray[index]);
                    ul.append(li);
                }
                $(".showRecentCities").append(ul);
            }
        }
    }

    $('.submitCity').click(function () {
        let searchCity = $(".searchCity").val();
        let forecastURL = "https://api.openweathermap.org/data/2.5/forecast?" + apiKey + "&units=imperial&q=" + searchCity;
        console.log(searchCity);
        //  displayWeather(searchCity); //

        if (searchCity != '') {
            city = JSON.parse(localStorage.getItem("city")) || [];

            // if(!city) {
            //     city = [];
            // }

            city.unshift(searchCity);

            while (city.length > 5) {
                city.pop() // "pops" the oldest search after 5 searches
            }

            localStorage.setItem("city", JSON.stringify(city));
            displayRecents()
            let queryURL = weatherURL.concat(searchCity)
            let cityWeather = ''
            console.log(queryURL)
            $.ajax({
                url: queryURL,
                method: "GET",
            }).then(function (response) {
                cityWeather = response.weather[0];

                $(".showCurrentCity").html(
                    `
                <ul>Right now, ${moment().format('MMMM Do YYYY, h:mm:ss a')}, in ${city[0]},
                the temperature is ${response.main.temp} degrees.</ul>
                <ul>The humidity is ${response.main.humidity}%. Wow!</ul>
<ul>That WIND though! It is blowing your face off at ${response.wind.speed}MPH.</ul>
<img src=http://openweathermap.org/img/w/${response.weather[0].icon}.png>
                `)

                console.log(response);
            }
            );

        } else {
            $("#error").html("You can't leave this empty bozo!")
        }




        $.ajax({
            url: forecastURL,
            method: "GET"
        }).then(function (response3) {
            var forecasts = response3.list
            const i = [4, 12, 20, 28, 36]
            for (x of i) {
                $(".showUpcomingDays").append(`<div class='col weather-future' data-id=${x}> ${forecasts[x].dt_txt}  <li>Temperature: ${Math.round(forecasts[x].main.temp)} <li>Humidity: ${forecasts[x].main.humidity}</li></div>
            <img src=${`http://openweathermap.org/img/w/${forecasts[x].weather[0].icon}.png`}></img>
            `)
                console.log(forecasts);
            }
        })
        $('.showUpcomingDays').empty();
        var colOne = $("<div class='col-sm-2'>")
        var rowOne = $("<div class='row'>")

    })
});



