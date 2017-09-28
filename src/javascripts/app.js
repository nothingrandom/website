// import './modules';
import $ from 'jquery';
// import mousewheel from 'vendor/mousewheel.min.js';

var e = ['%c Created by Benjamin Hollway - http://nothingrandom.com ',
  'display:block; padding:5px; background: #2CD8D5; line-height:40px; color:#fff;',];
window.console.log.apply(console, e);

$(function() {
  var $content = $('#js-blog'),
    data = {
      rss_url: 'https://medium.com/feed/@nothingrandom',
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

/*
 * - autoSmoothScroll -
 * Licence MIT
 * Written by Gabriel Delépine
 * Current version  1.3.1 (2014-10-22)
 * Fork-me on github : https://github.com/Yappli/smooth-scroll
 * */
(function(window, undefined) {
  'use strict';
  var height_fixed_header = 0, // For layout with header with position:fixed.
    speed = 500,
    moving_frequency = 15, // Affects performance ! High number makes scroll more smooth
    links = document.getElementsByTagName('a'),
    href;

  for (var i = 0; i < links.length; i++) {
    href = (links[i].attributes.href === undefined) ? null : links[i].attributes.href.nodeValue.toString();

    if (href !== null && href.length > 1 && href.indexOf('#') != -1) {// href.substr(0, 1) == '#'
      links[i].onclick = function() {
        var element,
          href = this.attributes.href.nodeValue.toString(),
          url = href.substr(0, href.indexOf('#')),
          id = href.substr(href.indexOf('#') + 1);

        if (element === document.getElementById(id)) {
          var hop_count = (speed - (speed % moving_frequency)) / moving_frequency, // Always make an integer
            getScrollTopDocumentAtBegin = getScrollTopDocument(),
            gap = (getScrollTopElement(element) - getScrollTopDocumentAtBegin) / hop_count;

          if (window.history && typeof window.history.pushState == 'function')
            window.history.pushState({}, undefined, url + '#' + id); // Change URL for modern browser

          for (var i = 1; i <= hop_count; i++) {
            (function() {
              var hop_top_position = gap * i;
              setTimeout(function() {
                window.scrollTo(0, hop_top_position + getScrollTopDocumentAtBegin);
              }, moving_frequency * i);
            })();
          }

          return false;
        }
      };
    }
  }

  var getScrollTopElement =  function(e) {
    var top = height_fixed_header * -1;

    while (e.offsetParent != undefined && e.offsetParent != null) {
      top += e.offsetTop + (e.clientTop != null ? e.clientTop : 0);
      e = e.offsetParent;
    }

    return top;
  };

  var getScrollTopDocument = function() {
    return window.pageYOffset !== undefined ? window.pageYOffset :
      document.documentElement.scrollTop !== undefined ? document.documentElement.scrollTop :
        document.body.scrollTop;
  };
})(window);
