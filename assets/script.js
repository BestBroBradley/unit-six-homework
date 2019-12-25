function onLoad(){

$("#submitBtn").on("click", function(event){
    event.preventDefault()
    var userQuery = ($("#searchQuery").val())
    var newBtn = $(`<button>${userQuery}</button>`)
    newBtn.addClass(userQuery)
    $("#prevSearches").append(newBtn)
    $("#searchQuery").val("")    
})









}

onLoad();