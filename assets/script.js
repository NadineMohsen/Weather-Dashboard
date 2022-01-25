var weatherFormEl = document.getElementById("user-form")
var part2 = document.getElementById("part-2")

//Submit button event listener
weatherFormEl.addEventListener("submit",function(event){
    event.preventDefault();
    
    //Get input
    var weatherLocation = document.getElementById("city").value.trim();
    console.log(weatherLocation)
    
    //If input is empty display an alert
    if(weatherLocation == ""){
        alert("Please enter a City name")
        return;
    }
    
    //Else get weather and other details
    part2.setAttribute("style","visibility:visible")
    var displayCity= document.getElementById("display-city")
    displayCity.textContent=weatherLocation;
    
    //Api URL
    var requestUrl = "https://api.openweathermap.org/data/2.5/forecast?q="+weatherLocation+", GB&appid=a59ec84f2020621559b2a178b00f32e1&units=metric"
    console.log(requestUrl)
    //Fetch
    fetch(requestUrl)
        .then(function (response) {
        return response.json();
        })
        .then(function (data) {
        console.log(data)
        //Get dates
        var forecastDays=[];
        for(i=0;i<data.list.length;i++){
              var weatherInfo = data.list[i];
              var date = weatherInfo.dt_txt.split(" ")[0];
            //   console.log(date)
              
              var time = weatherInfo.dt_txt.split(" ")[1].split(":")[0]
            //   console.log(time)
              
              var currentHour = moment().hours()
            //   console.log(currentHour)
        }
})
})
