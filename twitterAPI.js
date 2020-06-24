var queryURL = "https://api.twitter.com/1.1/trends/place.json?";
var authParameters = "consumer_key=CvCZcL1YQpB5ndLhDnPATt784,consumer_secret=28Ap0upYFI3okcorEK0dcA5GYglpkGbxgym7NX0ClxAIHqqKtO, access_token=29120924-nxsRCe0q8AY1Q7SNlUUNGVKin3RP7UHrSjAbsyGv4, access_token_secret=60b31hGCBNRJo7lLRgDh9hKFbnkiUjFa5MeJzrRVpHfk8";
var queryParameters = "id=1";

/*
    consumer_key:         'CvCZcL1YQpB5ndLhDnPATt784',
    consumer_secret:      '28Ap0upYFI3okcorEK0dcA5GYglpkGbxgym7NX0ClxAIHqqKtO',
    access_token:         '29120924-nxsRCe0q8AY1Q7SNlUUNGVKin3RP7UHrSjAbsyGv4',
    access_token_secret:  '60b31hGCBNRJo7lLRgDh9hKFbnkiUjFa5MeJzrRVpHfk8',
*/

var cb = new Codebird;
cb.setConsumerKey("CvCZcL1YQpB5ndLhDnPATt784", "28Ap0upYFI3okcorEK0dcA5GYglpkGbxgym7NX0ClxAIHqqKtO");
cb.setToken("29120924-nxsRCe0q8AY1Q7SNlUUNGVKin3RP7UHrSjAbsyGv4", "60b31hGCBNRJo7lLRgDh9hKFbnkiUjFa5MeJzrRVpHfk8");
cb.__call("trends/place", {id: 1}, function(reply, rate, err) {
    console.log(reply);
    console.log(err);
});

/*
$(document).ready(function () {
    
    var cb = new Codebird;
    cb.setConsumerKey("CvCZcL1YQpB5ndLhDnPATt784", "28Ap0upYFI3okcorEK0dcA5GYglpkGbxgym7NX0ClxAIHqqKtO");
    cb.setToken("29120924-nxsRCe0q8AY1Q7SNlUUNGVKin3RP7UHrSjAbsyGv4", "60b31hGCBNRJo7lLRgDh9hKFbnkiUjFa5MeJzrRVpHfk8");
    cb.__call("trends/place", {id: 1}, function(reply, rate, err) {
        console.log(reply);
        console.log(err);
    });

    
    var query = queryURL + authParameters + queryParameters;
    $.ajax({url: query, method: "GET"}).then(function(response) {
        console.log(response);
    });
   
});
*/
