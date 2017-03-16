var getContent = function (category, startIdx, count) {
  startIdx = startIdx || 0;
  count = count || 20;
  category = category || 'videos'; 
  category = category.toLowerCase();
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
      if (startIdx === 0) {
        currentIndex = 0;
        parseData(response.data, 0, 10);
        toggleArticleType();
      }
      preloadData = preloadData.concat(response.data);

      if (startIdx < 300) {
        getContent(currentCategory, response.startIndex + 20, 20);
      }
    }
  });
};

