var APIkey="a59ec84f2020621559b2a178b00f32e1";
var weatherFormEl = document.getElementById("user-form")
var part2 = document.getElementById("part-2")

var lat=0;
var lon=0;
var stateIndex=0;
//Get coordinates for the searched City
var getState = function(cityName){
    // Geocoding API
    var geoURL = "http://api.openweathermap.org/geo/1.0/direct?q="+cityName+"&limit=5&appid="+APIkey;
    console.log("Geo URL: "+ geoURL)
    // Fetch 
    fetch(geoURL)
        .then(function (response) {
        return response.json();
        })
        .then(function (data) {
        console.log(data)
        // Get all states
        for(i=0;i<5;i++){
        var locations = data[i].state;
        console.log("Location: " + locations)
        //Choose State
        var chooseState = window.confirm ("Are you searching for " + cityName+","+locations)
            if(chooseState == true){
                stateIndex=i;
                console.log("stateIndex= "+stateIndex)
                //get lon
                lon= data[stateIndex].lon;
                console.log("lon= "+lon)
                //get lat
                lat= data[stateIndex].lat;
                console.log("lat= "+ lat)
                //display state
                var stateEl = document.getElementById("display-state")
                stateEl.textContent= locations;
                
                getLocation(lat,lon)
                return;
            }
        }
        })
    }

//Get city based on coord
var getLocation=function(lat,lon){
        //One call weather API
       var weatherURL = "https://api.openweathermap.org/data/2.5/onecall?lat="+lat+"&lon="+lon+"&exclude=hourly,minutely&units=metric&appid="+APIkey
       console.log("One call API: "+weatherURL)
       fetch(weatherURL)
        .then(function (response) {
        return response.json();
        })
        .then(function (data) {
        console.log(data)

        displayWeather(data)    
    })
}

var displayWeather=function(data){
    //display current date
    var dateEl = document.getElementById("display-date")
    dateEl.textContent=moment.unix(data.current.dt).format("MM/DD/YYYY")
    //display current icon
    var iconEl = document.getElementById("display-icon")
    iconCode= data.current.weather[0].icon
    iconSrc = "http://openweathermap.org/img/wn/"+iconCode+".png"
    iconEl.setAttribute("src",iconSrc)
    //display current temp
    var tempEl = document.getElementById("display-temp")
    tempEl.textContent = Math.floor(data.current.temp) + "°C";
    //display current wind
    var windEl = document.getElementById("display-wind")
    windEl.textContent = data.current.wind_speed + " m/s";
    //display current wind
    var humidityEl = document.getElementById("display-humidity")
    humidityEl.textContent = data.current.humidity + "%";
    //display UV index
    var uvIndexEl = document.getElementById("display-uv-index")
    uvIndexEl.textContent = data.current.uvi;
    if(data.current.uvi>=7){
        uvIndexEl.setAttribute("class","high")
    }
    else if(data.current.uvi>=2){
        uvIndexEl.setAttribute("class","moderate")
    }
    else if(data.current.uvi<2){
        uvIndexEl.setAttribute("class","low")
    }
}

weatherFormEl.addEventListener("submit",function(event){
    event.preventDefault();
    var cityName = document.getElementById("city").value.trim();
    console.log("City Name: "+ cityName)

    // If input is empty display an alert
    if(cityName == ""){
        alert("Please enter a City name")
        return;
    }
    
    //Else get weather and other details
    part2.setAttribute("style","visibility:visible")
    var displayCity= document.getElementById("display-city")
    displayCity.textContent=cityName;
    
    getState(cityName)
    // getWeather(cityName)
})
