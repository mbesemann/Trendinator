$(document).ready(function(){
    $('.sidenav').sidenav();
  });

  $(".dropdown-trigger").dropdown();

  $(".dropdown-trigger-country").dropdown();

  function getGeoLocation(success, error) {

    if(!navigator.geolocation) {
      status.textContent = 'Geolocation is not supported by your browser';
    } else {
      status.textContent = 'Locating…';
      navigator.geolocation.getCurrentPosition(success, error);
    }

  if(!navigator.geolocation) {
    status.textContent = 'Geolocation is not supported by your browser';
  } else {
    status.textContent = 'Locating…';
    navigator.geolocation.getCurrentPosition(success, error);
  }

  navigator.geolocation.getCurrentPosition(success, error);

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