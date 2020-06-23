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

    //Get favicons
    $("a[href^='http']").each(function() {
        $(this).prepend('<img src="https://www.google.com/s2/favicons?domain=' + this.href + '">');
    });
})

// Category options are business, entertainment, general, health, science, sports, technology
function getNews(category='') {
    $.ajax({
        url: `${baseUrl}?apiKey=${apiKey}&country=ca&category=${category}`,
        type: 'GET'
    }).then(function(response) {
        response.articles.forEach(story => {
            var articleDiv = $("<div>");
            var favicon = $("<img>").prop("src", "https://www.google.com/s2/favicons?domain=" + story.url);
            var articleUrl = $("<a>").prop("href", story.url).text(story.title).prop("target", "_blank");
            var source = $("<h4>").text(story.source.name);
            var datePublished = $("<span>").text(story.publishedAt);
            var description = $("<p>").text(story.description);
            articleDiv.append(favicon, articleUrl, source, datePublished, description);
            $(".news-articles-content").append(articleDiv);
        });
    });
}

$("#top-")