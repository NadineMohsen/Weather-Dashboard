// var weatherFormEl = document.getElementById("user-form")
// var part2 = document.getElementById("part-2")

// //Submit button event listener
// weatherFormEl.addEventListener("submit",function(event){
//     event.preventDefault();
    
//     //Get input
//     var weatherLocation = document.getElementById("city").value.trim();
//     console.log(weatherLocation)
    
//     //If input is empty display an alert
//     if(weatherLocation == ""){
//         alert("Please enter a City name")
//         return;
//     }
    
//     //Else get weather and other details
//     part2.setAttribute("style","visibility:visible")
//     var displayCity= document.getElementById("display-city")
//     displayCity.textContent=weatherLocation;
    
//     //Api URL
//     // var requestUrl = "https://api.openweathermap.org/data/2.5/forecast?q="+weatherLocation+",GB&appid=a59ec84f2020621559b2a178b00f32e1&units=metric"
//     var requestUrl = "https://api.openweathermap.org/data/2.5/onecall?lat={lat}&lon={lon}&exclude={part}&appid={API key}"
//     console.log(requestUrl)
//     //Fetch
//     fetch(requestUrl)
//         .then(function (response) {
//         return response.json();
//         })
//         .then(function (data) {
//         // console.log(data)
//         //Get dates
//         var forecastDays=[];
//         for(i=0;i<data.list.length;i++){

//               var weatherInfo = data.list[i];
//               console.log(weatherInfo)
              
//               var date = weatherInfo.dt_txt.split(" ")[0];
//               console.log(date)


//             //   var time = weatherInfo.dt_txt.split(" ")[1].split(":")[0]
//             //   console.log(time)
              
//             //   var currentHour = moment().hours()
//             //   console.log(currentHour)
//         }
// })
// })

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
    console.log("Geeo URL: "+ geoURL)
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
        console.log("All Locations: " + locations)
        //Choose State
        var chooseState = window.confirm ("Are you searching for " + cityName+","+locations)
            if(chooseState == true){
                stateIndex=i;
                console.log(stateIndex)
                //get lon
                lon= data[stateIndex].lon;
                console.log(lon)
                //get lat
                lat= data[stateIndex].lat;
                console.log(lat)
                
                getLocation(stateIndex,lat,lon)
                return;
            }
        }
        })
    }

//Get city based on coord
    var getLocation=function(){
        //One call weather API
       var weatherURL = "https://api.openweathermap.org/data/2.5/onecall?lat="+lat+"&lon="+lon+"&exclude=hourly,minutely&units=metric&appid="+APIkey
       console.log(weatherURL)
    }
   


// function getWeather(cityName){
//     // var lat= 33.44;
//     // var lon= -94.04;
//     var APIkey = "a59ec84f2020621559b2a178b00f32e1";
//     var requestUrl = "https://api.openweathermap.org/data/2.5/onecall?lat="+lat+"&lon="+lon+"&exclude=hourly&appid="+APIkey;
//     console.log(requestUrl)
    
//     fetch(requestUrl)
//         .then(function (response) {
//         return response.json();
//         })
//         .then(function (data) {
//         console.log(data)
//         })
//     }


  

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
