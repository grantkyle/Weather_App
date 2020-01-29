$(document).ready(function () {

    const apiKey = "appid=5dd0b09a506625237a5074c48b3d6f3e";
    let city = [];
    let index = 0;
    let weatherURL = "https://api.openweathermap.org/data/2.5/weather?" + apiKey + "&units=imperial&q=";
    let forecastURL = "http://api.openweathermap.org/data/2.5/forecast?" + apiKey + "&q=";
    let uviURL = "http://api.openweathermap.org/data/2.5/uvi?" + apiKey;

    var fatherTime = moment()
    console.log(fatherTime);
    displayRecents()
    // $(document).on("click", ".listnone", displayWeather);
    function displayRecents(){

        var storedCities = localStorage.getItem("city");
        if (storedCities !== null) {
            $(".showRecentCities").empty();
            var cityArray = JSON.parse(storedCities);
            console.log(cityArray)
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
        let searchCity = $(".searchCity").val()//.trim();
        console.log(searchCity);
        //  displayWeather(searchCity); // display weather will be used to 
        
        if (searchCity != '') {
            city= JSON.parse(localStorage.getItem("city"))
            city.unshift(searchCity);
            while (city.length>5){
                city.pop()
            }
            //let storeCities = 
            localStorage.setItem("city", JSON.stringify(city));
            displayRecents()
            let queryURL = weatherURL.concat(searchCity) 
            console.log(queryURL)
            $.ajax({
                url: queryURL,
                method: "GET",
            }).then(function (response) {
                console.log(response)
            }
            );

            // console.log(queryURL)
        } else {
            $("#error").html("You can't leave this empty bozo!")
        }


        // let queryURL = "https://openweathermap.org/api" + city + "&api-key=5dd0b09a506625237a5074c48b3d6f3e"
        // console.log(queryURL);

    }
    )



});
