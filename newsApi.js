var apiKey = "09a51a1a7002430abd69b82f52b2eaf3";
var baseUrl = "https://newsapi.org/v2/top-headlines";

$(document).ready(function() {
    getNews();
})

$(document).ready(function() {
    getNews("sports");
})

$(document).ready(function() {
    getNews("entertainment");
})

// Category options are business, entertainment, general, health, science, sports, technology
function getNews(category='') {
    $.ajax({
        url: `${baseUrl}?apiKey=${apiKey}&category=${category}`,
        type: 'GET'
    }).then(function(response) {
        console.log(response);
        response.forEach(story => {
            console.log(story);
        });
    });
}