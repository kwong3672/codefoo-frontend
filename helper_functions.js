// create API url and query string
var getAPIQuery = function (startIdx, count, category) {
  var url = 'http://ign-apis.herokuapp.com/';
  var query = url + category + '?startIndex=' + startIdx + '&count=' + count;
  return query;
};

// convert time in secs to hh:mm:ss format
var formatTime = function(duration) {
  // if no duration provided return empty string
  if (!duration) {
    return '';
  }

  var hrs = Math.floor(duration / 3600);
  duration %= 3600;
  var mins = Math.floor(duration / 60);
  var secs = duration % 60;
  var result = '';

  if (hrs > 0) { 
    hrs += ':'; 
  } else { 
    hrs = ''; 
  }
  if (hrs !== '' && mins < 10 && mins !== 0) {
    mins = '0' + mins;
  }
  if (secs < 10) {
    secs = '0' + secs; 
  }

  // return formated duration in hh:mm:ss
  return hrs + mins + ':' + secs;
};

// parse API data to be displayed
var parseData = function (videosOrArticles, start, end) {
  // if no end value given parse next 10 videos or articles
  end = end || start + 10;

  for (var index = start; index < end; index++) {
    var data = videosOrArticles[index];
    var title = data.metadata.name || data.metadata.headline;
    var description = data.metadata.description || data.metadata.subHeadline;
    var duration = formatTime(data.metadata.duration);
    var imgUrl = data.thumbnails[0].url;
    var srcSet = data.thumbnails[0].url + ' ' + data.thumbnails[0].width + 'w, ' + data.thumbnails[1].url + ' ' + data.thumbnails[1].width + 'w, ' + data.thumbnails[2].url + ' ' + data.thumbnails[2].width + 'w';
    var url = data.metadata.url;

    displayContent(index + 1, title, description, duration, srcSet, url);
  }  
};

// show/hide image when content clicked
var toggleImage = function (event, data) {
  var display = $('#' + data)[0].style.display;
  $('.picture').hide();

  if (display !== 'block') {
    $('#' + data).show();
  }
};
