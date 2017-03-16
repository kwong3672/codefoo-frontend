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
        toggleArticleType();
      }
      preloadData = preloadData.concat(response.data);
      console.log(preloadData);

      if (startIdx < 300) {
        getContent(currentCategory, response.startIndex + 20, 20);
      }
    }
  });
};

