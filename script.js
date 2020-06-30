$(document).ready(function() {
    $('.sidenav').sidenav();
    $(".dropdown-trigger").dropdown();
    $(".dropdown-trigger-country").dropdown();
});

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
      var bookmark = $("<li>").append($("<a>").text(text).prop("href", link).prop("target", "_blank").addClass("waves-effect"));
      $("#bookmarkList").append(bookmark);
  }
  
  localStorage.setItem("bookmarksList", JSON.stringify(bookmarksList));
}

function setDropdownText(text, triggerClass, appendText) {
  $(triggerClass).html(`${text} ${appendText} <i class="material-icons right">arrow_drop_down</i>`);
  $(".dropdown-trigger-side").html(`${text} ${appendText} <i class="material-icons right">arrow_drop_down</i>`);
}

$(".ddl-item").on("click", function() {
  setDropdownText($(this).text(), ".dropdown-trigger", "topics");
  $(".dropdown-trigger").attr("data-article-num", $(this).attr("id"));
});

$(".country-item").on("click", function() {
  setDropdownText($(this).text(), ".dropdown-trigger-country", "");
  $(".dropdown-trigger-country").attr("data-country", $(this).attr("id"));
  localStorage.setItem("currentCountry", $(this).text());
});

