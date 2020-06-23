var queryURL = "https://api.twitter.com/1.1/trends/place.json?";
var queryParameters = "id=1";

$(document).ready(function () {
    
    var query = queryURL + queryParameters;
    $.ajax({url: query, method: "GET"}).then(function(response) {
        console.log(response);
    })

});