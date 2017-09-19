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

// Select all links with hashes
$('a[href*="#"]')
// Remove links that don't actually link to anything
  .not('[href="#"]').not('[href="#0"]').click(function(event) {
  // On-page links
  if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
    // Figure out element to scroll to
    var target = $(this.hash);
    target = target.length
      ? target
      : $('[name=' + this.hash.slice(1) + ']');
    // Does a scroll target exist?
    if (target.length) {
      // Only prevent default if animation is actually gonna happen
      event.preventDefault();
      $('html, body').animate({
        scrollTop: target.offset().top
      }, 1000, function() {
        // Callback after animation
        // Must change focus!
        var $target = $(target);
        $target.focus();
        if ($target.is(':focus')) { // Checking if the target was focused
          return false;
        }

        else {
          $target.attr('tabindex', '-1'); // Adding tabindex for elements not focusable
          $target.focus(); // Set focus again
        }
      });
    }
  }
});
