var toggleArticleType = function () {
  var active = {
    'background-color': '#B22222',
    'color': 'white'
  };
  var inactive = {
    'background-color': 'white',
    'color': '#B22222'
  };

  if (currentCategory === 'videos') {
    $('.display-more').text('SEE MORE VIDEOS...');
    $('.category_videos').css(active);
    $('.category_articles').css(inactive);
  } else {
    $('.display-more').text('SEE MORE ARTICLES...');
    $('.category_videos').css(inactive);
    $('.category_articles').css(active);
  }

};
