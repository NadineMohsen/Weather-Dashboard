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
                saveLocation(cityName,locations,stateIndex)
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
        displayForecast(data)    
    })
}

var displayWeather=function(data){
    //display current date
    var dateEl = document.getElementById("display-date")
    dateEl.textContent=moment.unix(data.current.dt).format("MM/DD/YYYY")
    //display current icon
    var iconEl = document.getElementById("display-icon")
    var iconCode= data.current.weather[0].icon
    var iconSrc = "http://openweathermap.org/img/wn/"+iconCode+".png"
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
    //chose color based on uv index
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

var displayForecast= function(data){
    //for loop for 5 forecast days
    for(var i=0;i<5;i++){
        //dates
        var date = document.getElementById("date-"+ i)
        date.textContent= moment.unix(data.daily[i].dt).format("MM/DD/YYYY")
        //icons
        var icon = document.getElementById("icon-"+ i)
        var iconCode= data.daily[i].weather[0].icon
        var iconSrc = "http://openweathermap.org/img/wn/"+iconCode+".png"
        icon.setAttribute("src",iconSrc)
        //temp
        var temp = document.getElementById("temp-"+i)
        temp.textContent = Math.floor(data.daily[i].temp.day) + "°C";
        //wind
        var wind = document.getElementById("wind-"+i)
        wind.textContent = data.daily[i].wind_speed + " m/s";
        //humidity
        var humidity = document.getElementById("humidity-"+i)
        humidity.textContent = data.daily[i].humidity + "%";
    }
}

var saveLocation=function(cityName,locations){
    //history div
    var historyEl = document.getElementById("history");
    // local storage
    var localStorageCities=""; 
    var existingCities = JSON.parse(localStorage.getItem(localStorageCities));
    var newCity = {
        city:cityName,
        state: locations
    }
    var updatesCities = [newCity];
    if(existingCities){
        updatesCities= updatesCities.concat(existingCities);
    }
    localStorage.setItem(localStorageCities, JSON.stringify(updatesCities));
    //create buttons 
    for(var i=0;i<updatesCities.length;i++){
        var buttonEl= document.createElement("button")
        historyEl.appendChild(buttonEl)
        buttonEl.textContent =  updatesCities[i].city +","+ updatesCities[i].state;
        buttonEl.setAttribute("class","btn-city")
        //Event listener for buttons in search history
        buttonEl.addEventListener("click",function(){
            console.log(stateIndex)
            return;
        })

        return;
    }
    if(!existingCities){
        return;
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
})
