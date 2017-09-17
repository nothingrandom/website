import './modules';
import $ from 'jquery';
// import mousewheel from 'vendor/mousewheel.min.js';

var e = ['%c Created by Benjamin Hollway - http://nothingrandom.com ', 'display:block; padding:5px; background: #2CD8D5; line-height:40px; color:#fff;'];
window.console.log.apply(console, e);

$(function() {
  var $content = $('#js-blog'),
    data = {
    rss_url: 'https://medium.com/feed/@nothingrandom'
  };

  $.get('https://api.rss2json.com/v1/api.json', data, function(response) {
    if (response.status == 'ok') {

      var output = '';

      $.each(response.items, function(k, item) {
        if (item.categories.length) {
          output += '<li class="blog__item"><a href="' + item.link + '" class="blog__link">';
          output += '<h4 class="blog__title">' + item.title + '</h4>';
          var $desc = $(item.description).filter('h4');

          if ($desc.length) {

            output += '<h5 class="blog__subtitle">' + $desc['0'].innerHTML + '</h5>';
          }

          output += '<p>Read article <i class="far fa-long-arrow-right"></i></p>';
          output += '</a></li>';
        }
      });

      $content.html(output);
    }
  });
});
