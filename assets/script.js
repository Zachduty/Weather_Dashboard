// User Input
var userInput = 'Chicago';
var fiveForecast;
var currentWeather;
var previousCities = $('#previousCities')
var recentCity;
// Base Location to pull for
fiveForecast = 'https://api.openweathermap.org/data/2.5/forecast?q=' + userInput + '&units=imperial&appid=e899ec3ef5e0839661102e2153dd0fdd';
currentWeather = 'https://api.openweathermap.org/data/2.5/weather?q=' + userInput + '&units=imperial&appid=e899ec3ef5e0839661102e2153dd0fdd';
// Geolocation request to pull for user's location
if (window.navigator.geolocation) {
    window.navigator.geolocation.getCurrentPosition(console.log, console.log);
    if(GeolocationPosition === true){
        userLocation();
    }
} 
function userLocation(){
    var userLon = GeolocationPosition.coords.lon;
    var userLat = GeolocationPosition.coords.lat;
    fiveForecast = 'https://api.openweathermap.org/data/2.5/forecast?lat=' + userLat + '&lon=' + userLon + '&units=imperial&appid=e899ec3ef5e0839661102e2153dd0fdd';
    currentWeather = 'https://api.openweathermap.org/data/2.5/weather?lat=' + userLat + '&lon=' + userLon + '&units=imperial&appid=e899ec3ef5e0839661102e2153dd0fdd';
}
// Input form to search for cities.
$('#inputForm').on('keypress',function(e) {
    if(e.which == 13) {
        userInput = $('#inputForm').val();
        recentCity = $('<button>');
        recentCity.text(userInput);
        recentCity.addClass('my-1');
        recentCity.attr('type', 'button');
        previousCities.append(recentCity);
        pathUpdate();
        return {
            userInput,
            recentCity
        };
    }
});
$('#inputButton').on('click', function(){
    userInput = $('#inputForm').val();
    recentCity = $('<button>');
    recentCity.text(userInput);
    recentCity.addClass('my-1');
    recentCity.attr('type', 'button');
    previousCities.append(recentCity);
    pathUpdate();
    return {
        userInput,
        recentCity
    };
});
// Adds button functionality to recent searches.
$('#previousCities').on('click', function(event){
    event.stopPropagation();
    userInput = event.target.innerHTML;
    pathUpdate();
})
// Function to update weather data
function pathUpdate(){
    $('#inputForm').val("");
    fiveForecast = 'https://api.openweathermap.org/data/2.5/forecast?q=' + userInput + '&units=imperial&appid=e899ec3ef5e0839661102e2153dd0fdd';
    currentWeather = 'https://api.openweathermap.org/data/2.5/weather?q=' + userInput + '&units=imperial&appid=e899ec3ef5e0839661102e2153dd0fdd';
    // Current Weather API
    fetch(currentWeather)
        .then(function(response){
        return response.json();
    })
    .then(function (data){
    
        $('#currentCity').text(data.name);
        $('#currentTemp').text(data.main.temp);
        $('#currentHumid').text(data.main.humidity);
        $('#currentWind').text(data.wind.speed);
        var Icon = $('#currentIcon');
        var currentIcon = data.weather[0].icon;
        if(currentIcon === '01d'){
            Icon.attr('src', './assets/weather_icons/01d.png')
        } else if (currentIcon === '01n'){
            Icon.attr('src', './assets/weather_icons/01n.png')
        } else if (currentIcon === '02d'){
            Icon.attr('src', './assets/weather_icons/02d.png')
        } else if (currentIcon === '02n'){
            Icon.attr('src', './assets/weather_icons/02n.png')
        } else if (currentIcon === '03d'){
            Icon.attr('src', './assets/weather_icons/03d.png')
        } else if (currentIcon === '03n'){
            Icon.attr('src', './assets/weather_icons/03d.png')
        } else if (currentIcon === '04d'){
            Icon.attr('src', './assets/weather_icons/04d.png')
        } else if (currentIcon === '04n'){
            Icon.attr('src', './assets/weather_icons/04d.png')
        } else if (currentIcon === '09d'){
            Icon.attr('src', './assets/weather_icons/09d.png')
        } else if (currentIcon === '09n'){
            Icon.attr('src', './assets/weather_icons/09d.png')
        } else if (currentIcon === '10d'){
            Icon.attr('src', './assets/weather_icons/10d.png')
        } else if (currentIcon === '10n'){
            Icon.attr('src', './assets/weather_icons/10n.png')
        } else if (currentIcon === '11d'){
            Icon.attr('src', './assets/weather_icons/11d.png')
        } else if (currentIcon === '11n'){
            Icon.attr('src', './assets/weather_icons/11d.png')
        } else if (currentIcon === '13d'){
            Icon.attr('src', './assets/weather_icons/13d.png')
        } else if (currentIcon === '13n'){
            Icon.attr('src', './assets/weather_icons/13d.png')
        } else if (currentIcon === '50d'){
            Icon.attr('src', './assets/weather_icons/50d.png')
        } else if (currentIcon === '50n'){
            Icon.attr('src', './assets/weather_icons/50d.png')
        }
    
        var unixFormat = moment.unix(data.dt).format('dddd, h:mm a');
        $('#currentDate').text(unixFormat);
        var currentLong = data.coord.lon;
        var currentLat = data.coord.lat;
        var currentuvAPI = 'http://api.openweathermap.org/data/2.5/uvi?lat=' + currentLat + '&lon=' + currentLong + '&appid=e899ec3ef5e0839661102e2153dd0fdd';
        fetch(currentuvAPI)
            .then(function(response){
                return response.json();
            })
            .then(function(data){
                var currentUv = $('#currentUv');
                currentUv.text(data.value);
                if(data.value < 3){
                    currentUv.addClass('badge-success');
                }
                else if(data.value > 3 && data.value < 6){
                    currentUv.addClass('badge-warning');
                }
                else if(data.value > 6){
                    currentUv.addClass('badge-danger')
                }
                return data;
            })
    })
    // End Current Weather API
    // // 5 Day Forecast API
    fetch(fiveForecast)
        .then(function(response){
            return response.json();
        })
        .then(function (data){
            // 5 Day Dates
            var unixOne = moment.unix(data.list[4].dt).format('dddd, MM/DD/YYYY');
            $('#day1Date').text(unixOne)
            var unixTwo = moment.unix(data.list[12].dt).format('dddd, MM/DD/YYYY');
            $('#day2Date').text(unixTwo)
            var unixThree = moment.unix(data.list[20].dt).format('dddd, MM/DD/YYYY');
            $('#day3Date').text(unixThree)
            var unixFour = moment.unix(data.list[28].dt).format('dddd, MM/DD/YYYY');
            $('#day4Date').text(unixFour)
            var unixFive = moment.unix(data.list[36].dt).format('dddd, MM/DD/YYYY');
            $('#day5Date').text(unixFive)
            // 5 Day Dates End
            // 5 Day Icon
            var day1Icon = data.list[4].weather[0].icon;
            var iconOne = $('#day1Icon');
            if(day1Icon === '01d'){
                iconOne.attr('src', './assets/weather_icons/01d.png')
            } else if (day1Icon === '01n'){
                iconOne.attr('src', './assets/weather_icons/01n.png')
            }   else if (day1Icon === '02d'){
                iconOne.attr('src', './assets/weather_icons/02d.png')
            } else if (day1Icon === '02n'){
                iconOne.attr('src', './assets/weather_icons/02n.png')
            } else if (day1Icon === '03d'){
                iconOne.attr('src', './assets/weather_icons/03d.png')
            } else if (day1Icon === '03n'){
                iconOne.attr('src', './assets/weather_icons/03d.png')
            } else if (day1Icon === '04d'){
                iconOne.attr('src', './assets/weather_icons/04d.png')
            } else if (day1Icon === '04n'){
                iconOne.attr('src', './assets/weather_icons/04d.png')
            } else if (day1Icon === '09d'){
                iconOne.attr('src', './assets/weather_icons/09d.png')
            } else if (day1Icon === '09n'){
                iconOne.attr('src', './assets/weather_icons/09d.png')
            } else if (day1Icon === '10d'){
                iconOne.attr('src', './assets/weather_icons/10d.png')
            } else if (day1Icon === '10n'){
                iconOne.attr('src', './assets/weather_icons/10n.png')
            } else if (day1Icon === '11d'){
                iconOne.attr('src', './assets/weather_icons/11d.png')
            } else if (day1Icon === '11n'){
                iconOne.attr('src', './assets/weather_icons/11d.png')
            } else if (day1Icon === '13d'){
                iconOne.attr('src', './assets/weather_icons/13d.png')
            } else if (day1Icon === '13n'){
                iconOne.attr('src', './assets/weather_icons/13d.png')
            } else if (day1Icon === '50d'){
                iconOne.attr('src', './assets/weather_icons/50d.png')
            } else if (day1Icon === '50n'){
                iconOne.attr('src', './assets/weather_icons/50d.png')
            }
            
            var day2Icon = data.list[12].weather[0].icon;
            var iconTwo = $('#day2Icon');
    
            if(day2Icon === '01d'){
                iconTwo.attr('src', './assets/weather_icons/01d.png')
            } else if (day2Icon === '01n'){
                iconTwo.attr('src', './assets/weather_icons/01n.png')
            } else if (day2Icon === '02d'){
                iconTwo.attr('src', './assets/weather_icons/02d.png')
            } else if (day2Icon === '02n'){
                iconTwo.attr('src', './assets/weather_icons/02n.png')
            } else if (day2Icon === '03d'){
                iconTwo.attr('src', './assets/weather_icons/03d.png')
            } else if (day2Icon === '03n'){
                iconTwo.attr('src', './assets/weather_icons/03d.png')
            } else if (day2Icon === '04d'){
                iconTwo.attr('src', './assets/weather_icons/04d.png')
            } else if (day2Icon === '04n'){
                iconTwo.attr('src', './assets/weather_icons/04d.png')
            } else if (day2Icon === '09d'){
                iconTwo.attr('src', './assets/weather_icons/09d.png')
            } else if (day2Icon === '09n'){
                iconTwo.attr('src', './assets/weather_icons/09d.png')
            } else if (day2Icon === '10d'){
                iconTwo.attr('src', './assets/weather_icons/10d.png')
            } else if (day2Icon === '10n'){
                iconTwo.attr('src', './assets/weather_icons/10n.png')
            } else if (day2Icon === '11d'){
                iconTwo.attr('src', './assets/weather_icons/11d.png')
            } else if (day2Icon === '11n'){
                iconTwo.attr('src', './assets/weather_icons/11d.png')
            } else if (day2Icon === '13d'){
                iconTwo.attr('src', './assets/weather_icons/13d.png')
            } else if (day2Icon === '13n'){
                iconTwo.attr('src', './assets/weather_icons/13d.png')
            } else if (day2Icon === '50d'){
                iconTwo.attr('src', './assets/weather_icons/50d.png')
            } else if (day2Icon === '50n'){
                iconTwo.attr('src', './assets/weather_icons/50d.png')
            }
    
            var day3Icon = data.list[20].weather[0].icon;
            var iconThree = $('#day3Icon');
    
            if(day3Icon === '01d'){
                iconThree.attr('src', './assets/weather_icons/01d.png')
            } else if (day3Icon === '01n'){
                iconThree.attr('src', './assets/weather_icons/01n.png')
            } else if (day3Icon === '02d'){
                iconThree.attr('src', './assets/weather_icons/02d.png')
            } else if (day3Icon === '02n'){
                iconThree.attr('src', './assets/weather_icons/02n.png')
            } else if (day3Icon === '03d'){
                iconThree.attr('src', './assets/weather_icons/03d.png')
            } else if (day3Icon === '03n'){
                iconThree.attr('src', './assets/weather_icons/03d.png')
            } else if (day3Icon === '04d'){
                iconThree.attr('src', './assets/weather_icons/04d.png')
            } else if (day3Icon === '04n'){
                iconThree.attr('src', './assets/weather_icons/04d.png')
            } else if (day3Icon === '09d'){
                iconThree.attr('src', './assets/weather_icons/09d.png')
            } else if (day3Icon === '09n'){
                iconThree.attr('src', './assets/weather_icons/09d.png')
            } else if (day3Icon === '10d'){
                iconThree.attr('src', './assets/weather_icons/10d.png')
            } else if (day3Icon === '10n'){
                iconThree.attr('src', './assets/weather_icons/10n.png')
            } else if (day3Icon === '11d'){
                iconThree.attr('src', './assets/weather_icons/11d.png')
            } else if (day3Icon === '11n'){
                iconThree.attr('src', './assets/weather_icons/11d.png')
            } else if (day3Icon === '13d'){
                iconThree.attr('src', './assets/weather_icons/13d.png')
            } else if (day3Icon === '13n'){
                iconThree.attr('src', './assets/weather_icons/13d.png')
            } else if (day3Icon === '50d'){
                iconThree.attr('src', './assets/weather_icons/50d.png')
            } else if (day3Icon === '50n'){
                iconThree.attr('src', './assets/weather_icons/50d.png')
            }
    
            var day4Icon = data.list[28].weather[0].icon;
            var iconFour = $('#day4Icon');
    
            if(day4Icon === '01d'){
                iconFour.attr('src', './assets/weather_icons/01d.png')
            } else if (day4Icon === '01n'){
                iconFour.attr('src', './assets/weather_icons/01n.png')
            } else if (day4Icon === '02d'){
                iconFour.attr('src', './assets/weather_icons/02d.png')
            } else if (day4Icon === '02n'){
                iconFour.attr('src', './assets/weather_icons/02n.png')
            } else if (day4Icon === '03d'){
                iconFour.attr('src', './assets/weather_icons/03d.png')
            } else if (day4Icon === '03n'){
                iconFour.attr('src', './assets/weather_icons/03d.png')
            } else if (day4Icon === '04d'){
                iconFour.attr('src', './assets/weather_icons/04d.png')
            } else if (day4Icon === '04n'){
                iconFour.attr('src', './assets/weather_icons/04d.png')
            } else if (day4Icon === '09d'){
                iconFour.attr('src', './assets/weather_icons/09d.png')
            } else if (day4Icon === '09n'){
                iconFour.attr('src', './assets/weather_icons/09d.png')
            } else if (day4Icon === '10d'){
                iconFour.attr('src', './assets/weather_icons/10d.png')
            } else if (day4Icon === '10n'){
                iconFour.attr('src', './assets/weather_icons/10n.png')
            } else if (day4Icon === '11d'){
                iconFour.attr('src', './assets/weather_icons/11d.png')
            } else if (day4Icon === '11n'){
                iconFour.attr('src', './assets/weather_icons/11d.png')
            } else if (day4Icon === '13d'){
                iconFour.attr('src', './assets/weather_icons/13d.png')
            } else if (day4Icon === '13n'){
                iconFour.attr('src', './assets/weather_icons/13d.png')
            } else if (day4Icon === '50d'){
                iconFour.attr('src', './assets/weather_icons/50d.png')
            } else if (day4Icon === '50n'){
                iconFour.attr('src', './assets/weather_icons/50d.png')
            }
    
            var day5Icon = data.list[36].weather[0].icon;
            var iconFive = $('#day5Icon');
    
            if(day5Icon === '01d'){
                iconFive.attr('src', './assets/weather_icons/01d.png')
            } else if (day5Icon === '01n'){
                iconFive.attr('src', './assets/weather_icons/01n.png')
            } else if (day5Icon === '02d'){
                iconFive.attr('src', './assets/weather_icons/02d.png')
            } else if (day5Icon === '02n'){
                iconFive.attr('src', './assets/weather_icons/02n.png')
            } else if (day5Icon === '03d'){
                iconFive.attr('src', './assets/weather_icons/03d.png')
            } else if (day5Icon === '03n'){
                iconFive.attr('src', './assets/weather_icons/03d.png')
            } else if (day5Icon === '04d'){
                iconFive.attr('src', './assets/weather_icons/04d.png')
            } else if (day5Icon === '04n'){
                iconFive.attr('src', './assets/weather_icons/04d.png')
            } else if (day5Icon === '09d'){
                iconFive.attr('src', './assets/weather_icons/09d.png')
            } else if (day5Icon === '09n'){
                iconFive.attr('src', './assets/weather_icons/09d.png')
            } else if (day5Icon === '10d'){
                iconFive.attr('src', './assets/weather_icons/10d.png')
            } else if (day5Icon === '10n'){
                iconFive.attr('src', './assets/weather_icons/10n.png')
            } else if (day5Icon === '11d'){
                iconFive.attr('src', './assets/weather_icons/11d.png')
            } else if (day5Icon === '11n'){
                iconFive.attr('src', './assets/weather_icons/11d.png')
            } else if (day5Icon === '13d'){
                iconFive.attr('src', './assets/weather_icons/13d.png')
            } else if (day5Icon === '13n'){
                iconFive.attr('src', './assets/weather_icons/13d.png')
            } else if (day5Icon === '50d'){
                iconFive.attr('src', './assets/weather_icons/50d.png')
            } else if (day5Icon === '50n'){
                iconFive.attr('src', './assets/weather_icons/50d.png')
            }
    
            // 5 Day Icon End
    
            // 5 Day Temp
            $('#day1Temp').text(data.list[4].main.temp);
            $('#day2Temp').text(data.list[12].main.temp);
            $('#day3Temp').text(data.list[20].main.temp);
            $('#day4Temp').text(data.list[28].main.temp);
            $('#day5Temp').text(data.list[36].main.temp);
            // 5 Day Temp End
    
            // 5 Day Humidity
            $('#day1Humidity').text(data.list[4].main.humidity);
            $('#day2Humidity').text(data.list[12].main.humidity);
            $('#day3Humidity').text(data.list[20].main.humidity);
            $('#day4Humidity').text(data.list[28].main.humidity);
            $('#day5Humidity').text(data.list[36].main.humidity);
            // 5 Day Humidity End
    
            return data;
        })
}
pathUpdate();