// duplicates if multiple tags contain searchString
var search = function (event, searchString) {
  // if key press is "enter"
  var matchedSearch = [];
  if (event.keyCode === 13) {
    // create new regex expression
    // debugger;
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

    if (!matchedSearch.length) {
      displayNoMatches();
    } else {
      parseData(matchedSearch, 0, matchedSearch.length);
    }
    $('.display-more').text('');
  }
};

// var testString = function (regex, string) {
//   return regex.test(string);
// };
