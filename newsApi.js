const apiKey = "09a51a1a7002430abd69b82f52b2eaf3";
const baseUrl = "https://newsapi.org/v2/top-headlines";
const proxy = "https://highlycaffeinated.ca:5001/"

var DateTime = luxon.DateTime;
var sidenav;

$(document).ready(function() {
    sidenav = M.Sidenav.getInstance($(".sidenav"));
    loadBookmarks();
    getNews();
})

// Category options are business, entertainment, general, health, science, sports, technology
function getNews(category='', topics=-1) { 
    sidenav.close();
    $(".news-articles-content").empty();

    // Check for existing preferences
    if(category == '') {
        var currentCategory = localStorage.getItem("currentCategory");
        if (currentCategory) {
            category = currentCategory;
            setCategory(`#${currentCategory}-btn`);
        }
    }
    if(topics == -1) {
        var numberOfTopics = localStorage.getItem("numberOfTopics");
        if (numberOfTopics) {
            topics = numberOfTopics;
            setDropdownText(numberOfTopics);
        }
        else
            topics = 10
    }

    localStorage.setItem("currentCategory", category);
    localStorage.setItem("numberOfTopics", topics);

    $.ajax({
        url: `${proxy}${baseUrl}?apiKey=${apiKey}&country=ca&category=${category.replace("top-stories","")}&pageSize=${topics}`,
        method: 'GET'
    }).then(function(response) {
        //console.log(response);
        response.articles.forEach(story => {
            var articleDiv = $("<div>");
            articleDiv.addClass("news-article-item");
            var favicon = $("<img>").prop("src", "https://www.google.com/s2/favicons?domain=" + story.url);
            var articleUrl = $("<a>").prop("href", story.url).text(story.title).prop("target", "_blank").addClass("article-link");
            var saveBtn = $("<a>").addClass("waves-effect waves-light btn saveBtn").text("Save").on("click", function() {
                var link = $(this).prev().prop("href");
                var text = $(this).prev().text();
                saveBookmark(text, link);
                sidenav.open();
            });
            var storyDate = DateTime.fromISO(story.publishedAt);
            var datePublished = $("<span>").text(storyDate.toLocaleString());
            var source = $("<span>").text(story.source.name);
            var description = $("<p>").text(story.description);
            articleDiv.append(favicon, articleUrl, "&nbsp;", saveBtn, $("<br>"), datePublished, $("<br>"), source, description);
            $(".news-articles-content").append(articleDiv);
        });
    });
}

function loadBookmarks() {
var bookmarksList = JSON.parse(localStorage.getItem("bookmarksList"));
if(bookmarksList)
    bookmarksList.forEach(bookmark => {
        var bookmark = $("<li>").append($("<a>").text(bookmark.title).prop("href", bookmark.url).prop("target", "_blank").addClass("waves-effect"));
        $("#bookmarkList").append(bookmark);
    });
}

function saveBookmark(text, link) {
var bookmark = {title: text, url: link}
var bookmarksList = JSON.parse(localStorage.getItem("bookmarksList"));
if(!bookmarksList)
    bookmarksList = []
var found = false;
bookmarksList.forEach(existingBookmark => {
    if(bookmark.url == existingBookmark.url)
        found = true;
});
if(!found) {
    bookmarksList.push(bookmark);
    var bookmark = $("<li>").append($("<a>").text(text).prop("href", link).prop("target", "_blank").addClass("waves-effect"));
    $("#bookmarkList").append(bookmark);
}

localStorage.setItem("bookmarksList", JSON.stringify(bookmarksList));
}

function setDropdownText(text) {
    $(".dropdown-trigger").html(`${text} topics<i class="material-icons right">arrow_drop_down</i>`);
    $(".dropdown-trigger-side").html(`${text} topics<i class="material-icons right">arrow_drop_down</i>`);
}

$("#top-stories-btn").on("click", function(){getNews("top-stories");});
$("#top-stories-btn-side").on("click", function(){setCategory("#top-stories-btn"); getNews("top-stories");});
$("#sports-btn").on("click", function(){getNews("sports");});
$("#sports-btn-side").on("click", function(){setCategory("#sports-btn"); getNews("sports");});
$("#entertainment-btn").on("click", function(){getNews("entertainment");});
$("#entertainment-btn-side").on("click", function(){setCategory("#entertainment-btn"); getNews("entertainment");});
$("#technology-btn").on("click", function(){getNews("technology");});
$("#technology-btn-side").on("click", function(){setCategory("#technology-btn"); getNews("technology");});

$('.category').on("click", function() {
    $('.category').removeClass("teal");
    $('.category').addClass("coral");
    $(this).addClass("teal");
});

function setCategory(id) {
    $('.category').removeClass("teal");
    $('.category').addClass("coral");
    $(id).addClass("teal");
}

$(".ddl-item").on("click", function() {
    setDropdownText($(this).text());
    getNews(localStorage.getItem("currentCategory"), $(this).text());
});