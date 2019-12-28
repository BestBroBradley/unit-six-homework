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

    function buttonDisplay() {
        $('#prevSearches').html("")
    for (var i = 0; i < btnArray.length; i++) {
        var newBtn = $(`<button id=${btnArray[i]}>${btnArray[i]}</button>`)
        newBtn.addClass("btn")
        $("#prevSearches").append(newBtn)
    }
}


$("#submitBtn").on("click", function (event) {
    event.preventDefault()
    userQuery = ($("#searchQuery").val())
    btnArray.push(userQuery)
    $("#searchQuery").val("")
    console.log(btnArray)
    localStorage.setItem("button array", JSON.stringify(btnArray))
    buttonDisplay()
})

$("#prevSearches").on("click", ".btn", function (event) {
    event.preventDefault()
    queryUrl = (`https://api.openweathermap.org/data/2.5/weather?q=${this.id.split(" ").join("+")}&APPID=${apiKey}`)
    var fiveDayUrl

    $.ajax({
        url: queryUrl,
        method: "GET"
    }).then(function(response) {
        console.log(response)
        fiveDayUrl = (`https://api.openweathermap.org/data/2.5/forecast?id=${response.id}&APPID=${apiKey}`)
        $.ajax({
            url: fiveDayUrl,
            method: "GET"
        }).then(function(fiveDay) {
            for (var j = 5; j < 40; j+=8) {
                console.log(fiveDay)
                console.log(fiveDayUrl)
                var fiveDayDate =  `<div>${fiveDay.list[j].dt}</div>`
                var fiveDayIcon = `<div>Icon: ${fiveDay.list[j].main.temp}</div>`
                var fiveDayTemp = `<div>Temp: ${fiveDay.list[j].main.temp}</div>`
                var fiveDayHumidity = `<div>Humidity: ${fiveDay.list[j].main.humidity}</div>`
                $("#fiveDayForecast").html(`<div>${fiveDayDate}${fiveDayIcon}${fiveDayTemp}${fiveDayHumidity}</div>`)
            }
        })
        $("#temp").text(response.main.temp)
        $("#humidity").text(response.main.humidity)
        
    })
})

buttonDisplay()
}

onLoad()