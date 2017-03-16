var testModule = ('./testMod.js');

console.log('codefoo_frontend.js loaded');

var currentCategory = '';
var currentIndex = 0;
var preloadData = [];

var getAPIQuery = function (startIdx, count, category) {
  console.log('*********************getAPIQuery Function************************');
  var url = 'http://ign-apis.herokuapp.com/';
  var query = url + category + '?startIndex=' + startIdx + '&count=' + count;
  return query;
};

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

var parseData = function (videosOrArticles, start, end) {
  console.log('********************inside popData function****************');
  console.log('Start Index is: ', start);
  end = end || start + 10;
  // need to add more code here for when to add more content vs just empting content out
  if (start === 0) {
    $('.content').empty();
  }

  for (var index = start; index < end; index++) {
    var data = videosOrArticles[index];
    console.log(data);

    var title = data.metadata.name || data.metadata.headline;
    var description = data.metadata.description || data.metadata.subHeadline;
    var duration = formatTime(data.metadata.duration);
    var imgUrl = data.thumbnails[0].url;
    var srcSet = data.thumbnails[0].url + ' ' + data.thumbnails[0].width + 'w, ' + data.thumbnails[1].url + ' ' + data.thumbnails[1].width + 'w, ' + data.thumbnails[2].url + ' ' + data.thumbnails[2].width + 'w';
    console.log('srcset is :', srcSet);
    var url = data.metadata.url;

    displayContent(index + 1, title, description, duration, srcSet, url);
  }
  
};

var displayContent = function (index, title, description, duration, srcSet, url) {

  // if index < 10 add 0 in front
  if (index < 10) {
    index = '0' + index;
  }

  var appendContent = 
    '<div class="row toggle seperator" onClick="toggleImage(event,\'image' + index + '\')">\n'
  + '  <div class="heading center no-padding col-xs-1">' + index + '</div>\n'
  + '  <div class=" no-padding col-xs-11">\n'
  + '    <div class="heading no-padding">' + title + '</div>\n'
  + '    <div class="row info">\n'
  + '      <div class="description no-padding col-xs-10">' + description + '</div>\n'
  + '      <div class="duration no-padding col-xs-2">' + duration + '</div>\n'
  + '    </div>\n'
  + '  </div>\n'
  + '</div>\n';

  // if URL found make link to URL
  if (url !== undefined) {
    var appendImage = 
      '<div class="picture" id="image' + index + '">\n'
    + '  <a href="' + url + '"><img class="image" srcset="' + srcSet + '"></a>'
    + '</div>';
  } else {
    var appendImage = 
      '<div class="picture" id="image' + index + '">\n'
    + '  <img class="image" srcset="' + srcSet + '">'
    + '</div>';
  }


  $('.content').append(appendContent);
  $('.content').append(appendImage);


  currentIndex++;
};

var getContent = function (category, startIdx, count) {
  console.log('**********************inside getData function****************');
  var startIdx = startIdx || 0;
  var count = count || 20;
  var category = category || 'videos'; 
  var APIQuery = getAPIQuery(startIdx, count, category);

  if (currentCategory !== category) {
    currentCategory = category;
    startIdx = 0;
    preloadData = [];
  }

  $.ajax({
    type: 'GET',
    url: APIQuery,
    dataType: 'jsonp',
    success: function (response) {
      console.log('API get request successful');
      console.log(response.data);
      if (startIdx === 0) {
        currentIndex = 0;
        parseData(response.data, 0, 10);
      }

      preloadData = preloadData.concat(response.data);
      console.log(preloadData);

      if (startIdx < 300) {
        getContent(currentCategory, response.startIndex + 20, 20);
      }
    }
  });
};

var toggleImage = function (event, data) {

  var display = $('#' + data)[0].style.display;
  $('.picture').hide();

  if (display !== 'block') {
    $('#' + data).show();
  }
};


// duplicates if multiple tags contain searchString
var search = function (event, searchString) {
  // if key press is "enter"
  var matchedSearch = [];
  if (event.keyCode === 13) {
    // create new regex expression
    searchString = new RegExp('\\b' + searchString.replace(/\s/g, '\\W*'), 'i');
    // clears search textbox
    $('input').val('');
    _.forEach(preloadData, function (videoOrArticle) {
      var containsString = false;
      var title = videoOrArticle.metadata.name || videoOrArticle.metadata.headline;
      var description = videoOrArticle.metadata.description || videoOrArticle.metadata.subHeadline;

      //if expression found change value of containsString to true
      if (searchString.test(title) || searchString.test(description)) {
        containsString = true;
      } else {
        // if expression not found test each tag
        _.forEach(videoOrArticle.tags, function (tag) {
          if (searchString.test(tag)) {
            containsString = true;
          }
        }); 
      }

      if (containsString) { 
        matchedSearch.push(videoOrArticle); 
      }
    });

    console.log('matchedSearch is :', matchedSearch);
    parseData(matchedSearch, 0, matchedSearch.length);
  }
};



var testString = function (regex, string) {
  return regex.test(string);
};




getContent('videos', 0, 20);
