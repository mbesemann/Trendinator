const apiKey = "09a51a1a7002430abd69b82f52b2eaf3";
const baseUrl = "https://newsapi.org/v2/top-headlines";
const proxy = "https://highlycaffeinated.ca:5001/"

var DateTime = luxon.DateTime;

$(document).ready(function() {
    getNews();
})

// Category options are business, entertainment, general, health, science, sports, technology
function getNews(category='', topics=10) { 
    $(".news-articles-content").empty();
    localStorage.setItem("currentCategory", category);
    localStorage.setItem("numberOfTopics", topics);
    $.ajax({
        url: `${proxy}${baseUrl}?apiKey=${apiKey}&country=ca&category=${category}&pageSize=${topics}`,
        method: 'GET'
    }).then(function(response) {
        //console.log(response);
        response.articles.forEach(story => {
            var articleDiv = $("<div>");
            articleDiv.addClass("news-article-item");
            var favicon = $("<img>").prop("src", "https://www.google.com/s2/favicons?domain=" + story.url);
            var articleUrl = $("<a>").prop("href", story.url).text(story.title).prop("target", "_blank").addClass("article-link");
            var storyDate = DateTime.fromISO(story.publishedAt);
            var datePublished = $("<span>").text(storyDate.toLocaleString());
            var source = $("<h4>").text(story.source.name);
            var description = $("<p>").text(story.description);
            articleDiv.append(favicon, articleUrl, $("<br>"), datePublished, source, description);
            $(".news-articles-content").append(articleDiv);
        });
    });
}

$("#top-stories-btn").on("click", function(){getNews()});
$("#top-stories-btn-side").on("click", function(){getNews()});
$("#sports-btn").on("click", function(){getNews("sports")});
$("#sports-btn-side").on("click", function(){getNews("sports")});
$("#entertainment-btn").on("click", function(){getNews("entertainment")});
$("#entertainment-btn-side").on("click", function(){getNews("entertainment")});
$("#technology-btn").on("click", function(){getNews("technology")});
$("#technology-btn-side").on("click", function(){getNews("technology")});

$(".ddl-item").on("click", function() {
    $(".dropdown-trigger").html(`${$(this).text()} topics<i class="material-icons right">arrow_drop_down</i>`);
    $(".dropdown-trigger-side").html(`${$(this).text()} topics<i class="material-icons right">arrow_drop_down</i>`);
    getNews(localStorage.getItem("currentCategory"), $(this).text());
});