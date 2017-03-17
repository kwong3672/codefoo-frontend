var displayContent = function (index, title, description, duration, srcSet, url) {
  //If displaying from first index empty content before appending data
  if (index === 1) {
    $('.content').empty();
  }
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
    // if no URL included create without link
    var appendImage = 
      '<div class="picture" id="image' + index + '">\n'
    + '  <img class="image" srcset="' + srcSet + '">'
    + '</div>';
  }

  // append to content div
  $('.content').append(appendContent);
  $('.content').append(appendImage);

  currentIndex++;
};

// Content to display if no matches found
var displayNoMatches = function () {
  var noMatches = '<div class="col-xs-12 no-match">No Matches Found</div>';
  $('.content').empty();
  $('.content').append(noMatches);
};
