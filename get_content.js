var getContent = function (category, startIdx, count) {
  // create default values if parameter not passed in
  startIdx = startIdx || 0;
  count = count || 20;
  category = category || 'videos'; 
  // ensure that category is lowercase
  category = category.toLowerCase();
  // call function to get query string for API get request
  var APIQuery = getAPIQuery(startIdx, count, category);

  // if category picked is not active category reset start index
  // and clear preloaded data
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
      if (startIdx === 0) {
        currentIndex = 0;
        parseData(response.data, 0, 10);
        toggleArticleType();
      }

      // make additional API requests and save for faster loading of
      // additional content and allow searching of content
      preloadData = preloadData.concat(response.data);
      if (startIdx < 300) {
        getContent(currentCategory, response.startIndex + 20, 20);
      }
    }
  });
};

