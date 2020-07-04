$(document).ready(function() {
    $('.sidenav').sidenav();
    $(".dropdown-trigger").dropdown();
    $(".dropdown-trigger-country").dropdown({
        constrainWidth: false
      }
    );

    loadTopics();
    loadCountry();
    getIPLocation();
  });

  $(".dropdown-trigger").dropdown();
  $(".dropdown-trigger-country").dropdown();

function getGeoLocation(success, error) {
  var options = {
    enableHighAccuracy: false
  };

  if(!navigator.geolocation) {
    console.log("Geolocation is not supported by your browser");
  } else {
    console.log("Locating…");
    navigator.geolocation.getCurrentPosition(success, error);
  }
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
      var bookmark = $("<li>");
      bookmark.append($("<a>").text(text).prop("href", link).prop("target", "_blank").addClass("waves-effect"));
      $("#bookmarkList").append(bookmark);
  }
  
  localStorage.setItem("bookmarksList", JSON.stringify(bookmarksList));
}

function loadCountry() {
  savedCountry = localStorage.getItem("currentCountry");
    if(savedCountry) {
      setDropdownText(savedCountry, ".dropdown-trigger-country", "");
      $(".dropdown-trigger-country").attr("data-country", savedCountry);
    }
}

function loadTopics() {
  savedTopics = localStorage.getItem("numberOfTopics");
    if(savedTopics) {
      setDropdownText(savedTopics, ".dropdown-trigger", "topics");
      $(".dropdown-trigger").attr("data-article-num", savedTopics);
    }
}

function getIPLocation() {
  $.ajax({
    url: `https://api.ipdata.co?api-key=96aaacac279f559432f1e459db8bf588f981e8e4629a6df548dcc6f0`,
    method: 'GET'
  }).then(function(result) {
    $(".location").text(`(${result.country_name})`);
  });
}

function setDropdownText(text, triggerClass, appendText) {
  $(triggerClass).html(`${text} ${appendText} <i class="material-icons right">arrow_drop_down</i>`);
  $(".dropdown-trigger-side").html(`${text} ${appendText} <i class="material-icons right">arrow_drop_down</i>`);
}

$(".ddl-item").on("click", function() {
  setDropdownText($(this).text(), ".dropdown-trigger", "topics");
  $(".dropdown-trigger").attr("data-article-num", $(this).attr("id"));
  localStorage.setItem("numberOfTopics", $(this).text());
});

$(".country-item").on("click", function() {
  setDropdownText($(this).text(), ".dropdown-trigger-country", "");
  $(".dropdown-trigger-country").attr("data-country", $(this).attr("id"));
  localStorage.setItem("currentCountry", $(this).text());
});

$("#clearBtn").on("click", function(event) {
  event.preventDefault();
  localStorage.removeItem("bookmarksList");
  $("#bookmarkList").empty();
})