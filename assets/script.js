var weatherFormEl = document.getElementById("user-form")

weatherFormEl.addEventListener("submit",function(event){
    event.preventDefault();
    var weatherLocation = document.getElementById("city").value.trim();
    console.log(weatherLocation)

    var requestUrl = "https://api.openweathermap.org/data/2.5/forecast?q="+weatherLocation+", GB&appid=a59ec84f2020621559b2a178b00f32e1&units=metric"
    console.log(requestUrl)
    fetch(requestUrl)
        .then(function (response) {
        return response.json();
        })
        .then(function (data) {
        console.log(data)
        var forecastDays = []
        for(i=0;i<data.list.length;i++){
              
            var weatherInfo = data.list[i];
              var date = weatherInfo.dt_txt.split(" ")[0];
              console.log(date)

              var displayCity= document.getElementById("display-city")
              displayCity.textContent=weatherLocation;

            // var displayDate = document.querySelector("dates")
            // console.log(displayDate)
            
        }

})
})
