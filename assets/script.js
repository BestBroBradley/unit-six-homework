function onLoad() {

    var apiKey = "addb6fc1f7165f72fdb4baa7a5715f8e"
    var queryUrl
    var userQuery
    var btnArray

    // $.ajax({
    //     url: queryUrl,
    //     method: "GET"
    // })

    btnArray = JSON.parse(localStorage.getItem("button array")) || [];

    function buttonDisplay() {
        $('#prevSearches').html("")
    for (var i = 0; i < btnArray.length; i++) {
        var newBtn = $(`<button id=${btnArray[i].split(" ").join("-")}>${btnArray[i]}</button>`)
        newBtn.addClass("btn")
        $("#prevSearches").append(newBtn)
    }
}


$("#submitBtn").on("click", function (event) {
    if ($("#searchQuery").val() === "") {
        return
    } else {
    event.preventDefault()
    userQuery = ($("#searchQuery").val())
    btnArray.push(userQuery)
    $("#searchQuery").val("")
    localStorage.setItem("button array", JSON.stringify(btnArray))
    buttonDisplay()
    }
})

$("#prevSearches").on("click", ".btn", function (event) {
    event.preventDefault()
    queryUrl = (`https://api.openweathermap.org/data/2.5/weather?q=${this.id.trim().split("-").join("+")}&APPID=${apiKey}`)
    console.log(queryUrl)
    var fiveDayUrl
    var UVindex
    $("#city").text(this.id.split("-").join(" "))

    $.ajax({
        url: queryUrl,
        method: "GET"
    }).then(function(response) {
        fiveDayUrl = (`https://api.openweathermap.org/data/2.5/forecast?id=${response.id}&APPID=${apiKey}`)
        UVindex = (`https://api.openweathermap.org/data/2.5/uvi/forecast?lat=${response.coord.lat}&lon=${response.coord.lon}&APPID=${apiKey}`)
        console.log(UVindex)
        $("#temp").text(response.main.temp)
        $("#humidity").text(response.main.humidity)
        
        $.ajax({
            url: UVindex,
            method: "GET"
        }).then(function(UV) {
            $("#uv-index").text(UV[0].value)
        })
        
        $.ajax({
            url: fiveDayUrl,
            method: "GET"
        }).then(function(fiveDay) {
            $("#fiveDayForecast").text("")
            for (var j = 5; j < 40; j+=8) {
                console.log(fiveDay)
                console.log(fiveDayUrl)
                var fiveDayDate =  `<div id="fiveDayDate">${moment(fiveDay.list[j].dt_txt).format("MMM Do YYYY")}</div>`
                console.log(fiveDay.list[j].weather[0].icon)
                var fiveDayIcon = `<div><img src="http://openweathermap.org/img/w/${fiveDay.list[j].weather[0].icon}.png"></div>`
                var fiveDayTemp = `<div>Temp: ${fiveDay.list[j].main.temp}</div>`
                var fiveDayHumidity = `<div>Humidity: ${fiveDay.list[j].main.humidity}%</div>`
                $("#fiveDayForecast").append(`<div class="futureDate">${fiveDayDate}${fiveDayIcon}${fiveDayTemp}${fiveDayHumidity}</div>`)
            }
        })
        
    })

})

buttonDisplay()
}

onLoad()