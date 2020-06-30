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
function getNews(category='', topics=-1, country='ca') { 
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

    savedCountry = localStorage.getItem("currentCountry");
    if(savedCountry)
        country = convertCountry(savedCountry);

    localStorage.setItem("currentCategory", category);
    localStorage.setItem("numberOfTopics", topics);

    $.ajax({
        url: `${proxy}${baseUrl}?apiKey=${apiKey}&country=${country}&category=${category.replace("top-stories","")}&pageSize=${topics}`,
        method: 'GET'
    }).then(function(response) {
        //console.log(response);
        response.articles.forEach(story => {
            var articleDiv = $("<div>").addClass("card blue-grey darken-1");
            var cardContent = $("<div>").addClass("card-content white-text");
            var favicon = $("<img>").prop("src", "https://www.google.com/s2/favicons?domain=" + story.url);
            var articleUrl = $("<span>").addClass("card-title").append(favicon, "&nbsp;", ($("<a>").prop("href", story.url).text(story.title).prop("target", "_blank")));
            var pinImage = $("<img>").prop("src", "https://img.icons8.com/color/48/000000/pin.png").prop("width", 20).prop("height", 20);
            var saveBtn = $("<a>").addClass("saveBtn").append(pinImage).on("click", function() {
                var link = $(this).prev().prop("href");
                var text = $(this).prev().text();
                saveBookmark(text, link);
                sidenav.open();
            });
            var description = $("<p>").text(story.description);
            cardContent.append(articleUrl, description);
            var cardAction = $("<div>").addClass("card-action white-text");
            var storyDate = DateTime.fromISO(story.publishedAt);
            var datePublished = $("<span>").text(storyDate.toLocaleString());
            var source = $("<span>").text(story.source.name);
            cardAction.append(source, "&nbsp;", datePublished, "&nbsp;", saveBtn);
            articleDiv.append(cardContent, cardAction);
            $(".news-articles-content").append(articleDiv);
        });
    });
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
    getNews(localStorage.getItem("currentCategory"), $(this).text());
});

function convertCountry(country) {
    var abbrev = '';
    switch(country) {
        case 'Australia':
            abbrev = 'au';
            break;
        case 'Canada':
            abbrev = 'ca';
            break;
        case 'United Kingdom':
            abbrev = 'gb';
            break;
        case 'United States':
            abbrev = 'us';
            break;
        case 'Japan':
            abbrev = 'jp';
            break;
        case 'India':
            abbrev = 'in';
            break;
        case 'Brazil':
            abbrev = 'br';
            break;
        case 'Turkey':
            abbrev = 'tr';
            break;
    }
    return abbrev;
}

$(".country-item").on("click", function() {
    var country = $(this).first().text();
    getNews(undefined,undefined,convertCountry(country));
})