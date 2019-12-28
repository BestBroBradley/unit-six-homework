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
    console.log(btnArray)

    for (var i = 0; i < btnArray.length; i++) {
        var newBtn = $(`<button id=${btnArray[i]}>${btnArray[i]}</button>`)
        newBtn.addClass("btn")
        $("#prevSearches").append(newBtn)
    }

$("#submitBtn").on("click", function (event) {
    event.preventDefault()
    userQuery = ($("#searchQuery").val())
    btnArray.push(userQuery)
    $("#searchQuery").val("")
    console.log(btnArray)
    localStorage.setItem("button array", JSON.stringify(btnArray))
})

$("#prevSearches").on("click", ".btn", function (event) {
    event.preventDefault()
    queryUrl = (`https://api.openweathermap.org/data/2.5/weather?q=${this.id}&APPID=${apiKey}`)
    var fiveDayUrl

    $.ajax({
        url: queryUrl,
        method: "GET"
    }).then(function(response) {
        console.log(response)
        fiveDayUrl = (`https://api.openweathermap.org/data/2.5/forecast?id=${response.id}&APPID=${apiKey}`)
        console.log(fiveDayUrl)
        $.ajax({
            url: fiveDayUrl,
            method: "GET"
        }).then(function(fiveDay) {
            for (var j = 0; j < 5; j++) {
                console.log(fiveDay)
                console.log(fiveDay.list[j].dt)
                var fiveDayDate = $(`<div id="fiveDayDate">Date: ${fiveDay.list[j].dt}</div>`)
                var fiveDayIcon = $(`<div id="fiveDayIcon">Icon: ${fiveDay.list[j].main.temp}</div>`)
                var fiveDayTemp = $(`<div id="fiveDayTemp">Temp: ${fiveDay.list[j].main.temp}</div>`)
                var fiveDayHumidity = $(`<div id="fiveDayHumidity">Humidity: ${fiveDay.list[j].main.humidity}</div>`)
                var newDiv = $(`<div id=${j}>${fiveDayDate}${fiveDayIcon}${fiveDayTemp}${fiveDayHumidity}</div>`)
                $("#fiveDayForecast").append(newDiv)
            }
        })
        $("#temp").text(response.main.temp)
        $("#humidity").text(response.main.humidity)
        
    })
})

// $("#submitBtn").on("click", function(event){
//     event.preventDefault()
//     userQuery = ($("#searchQuery").val())
//     var newBtn = $(`<button id=${userQuery}>${userQuery}</button>`)
//     newBtn.addClass("btn")
//     $("#prevSearches").append(newBtn)
//     $("#searchQuery").val("")
//    
//     $("#testDiv").text()
// })

// $

}

onLoad()