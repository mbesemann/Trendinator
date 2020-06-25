var consumerKey = "n9tuklQ7vCvdyEjVm7Nts9uNc";
var consumerSecretKey = "2GciZDmg4pDoOD8BfnKOsUUssqixf8my4FewOz0Cb1GHG1VHyq";
var accessToken = "1275421014852337672-6mKsYvcidkbFWWzXTH8qS48vJSfwLM";
var accessTokenSecret = "gXo35SEf2Rlsc4Dnc6LLMhJsTRb88kp0wBxHY9JRxxu6u";
var queryParameters = "id=1";


$(document).ready(function () {
    var cb = new Codebird();
    cb.setConsumerKey(consumerKey, consumerSecretKey);
    cb.setToken(accessToken, accessTokenSecret);
    cb.__call("trends/place", {id: 1}, function (reply, rate, err) {
        console.log(reply);
        console.log(err);
        reply[0].trends.forEach(function(trend, index) {
            console.log(trend);
            var trendDiv = $("<div>");
            var trendNameUrl = $("<a>").text(trend.name).prop("href", trend.url).prop("target", "_blank");
            var trendTweetVolumeDiv = $("<div>").text("Tweet Volume: " + trend.tweet_volume);
            trendDiv.append(trendNameUrl, trendTweetVolumeDiv);
            $(".twitter-trends-content").append(trendDiv);
        });
    });
});
