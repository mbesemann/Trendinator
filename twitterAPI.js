//constants
var consumerKey = "n9tuklQ7vCvdyEjVm7Nts9uNc";
var consumerSecretKey = "2GciZDmg4pDoOD8BfnKOsUUssqixf8my4FewOz0Cb1GHG1VHyq";
var accessToken = "1275421014852337672-6mKsYvcidkbFWWzXTH8qS48vJSfwLM";
var accessTokenSecret = "gXo35SEf2Rlsc4Dnc6LLMhJsTRb88kp0wBxHY9JRxxu6u";
var canadaWoeid = 23424775;
var defaultNumTrends = 10;
twitterTrendsContentElement = $(".twitter-trends-content");
var countryToWoeid = 
{
    "World" : 1,
    "Austrialia" : 23424748,
    "Canada" : 23424775,
    "United Kingdom" : 23424975,
    "United States": 23424977,
    "Japan": 23424856, 
    "India": 23424848,
    "Brazil":23424768,
    "Turkey": 23424969
}

var cb = new Codebird();

function fetchTwitterTrends(numItems) {
    cb.setConsumerKey(consumerKey, consumerSecretKey);
    cb.setToken(accessToken, accessTokenSecret);
    cb.__call("trends/place", {id: canadaWoeid}, function (reply, rate, err) {
        console.log(reply);
        console.log(err);
        var count = 0;
        reply[0].trends.some(function(trend, index) {
            if (count++ == numItems) {
                console.log("count === numItems");
                return true;
            }
            var trendDiv = $("<div>");
            trendDiv.addClass("twitter-article-item");
            var trendNum = $("<div>").text(count);
            var trendNameUrl = $("<a>").text(trend.name).prop("href", trend.url).prop("target", "_blank");
            trendDiv.append(trendNum);
            trendDiv.append(trendNameUrl);
            trendDiv.append("<br>");
            if (trend.tweet_volume) {
                var trendTweetVolumeDiv = $("<div>").text("Tweet Volume: " + trend.tweet_volume);
                trendDiv.append(trendTweetVolumeDiv);
            }

            twitterTrendsContentElement.append(trendDiv);
        });
    });    
}

$(".ddl-item").on("click", function (event) {
    event.preventDefault();
    var numberOfItemsToRetrieve = parseInt($(this).text());
    twitterTrendsContentElement.empty();
    fetchTwitterTrends(numberOfItemsToRetrieve);
});

$(document).ready(function () {
    fetchTwitterTrends(defaultNumTrends);
});
