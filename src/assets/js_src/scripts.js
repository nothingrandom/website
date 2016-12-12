var $ = require('jquery'); // ^2.1.4 included

var scrolled = $(window).scrollTop();

function parallax() {
	//set the div that you want to scroll at a different speed
	//set it to negative scroll so that is goes at the same speed

	//*x.x is the times faster you want it to scroll
	//in this case 0.65px faster than the scroll speed of the actual website
	$('h3').css('top', -(scrolled * 0.15) + 'px');
}

function opacity() {
	if (scrolled >= $('.section--blog').offset().top - 200) {
		var eq = Math.min(1, ((scrolled - ($('.section--blog').offset().top - 100)) * 0.0025));
		var eq2 = Math.min(1, ((scrolled - ($('.section--photos').offset().top - 400)) * 0.0025));
		var eq3 = Math.min(1, ((scrolled - ($('.section--photos').offset().top + 1050)) * 0.0025));

		$('.page-opacity').css('opacity', eq).addClass('show').removeClass('hide');
		$('.page-opacity-two').css('opacity', eq2);
		$('.section--contact .section__content').css('opacity', eq3);
	}

	else {
		$('.page-opacity').removeClass('show').addClass('hide');
	}
}

$(window).scroll(function() {
	scrolled = $(window).scrollTop();

	opacity();

	if ($(window).width() >= 1024) {
		parallax();
	}

	if (scrolled >= $('.section--photos').offset().top) {
		$('.section--photos').addClass('scrolled');
		$('.section--contact').addClass('show').removeClass('hide');
	}

	else {
		$('.section--photos').removeClass('scrolled');
		$('.section--contact').removeClass('show').addClass('hide');
	}
});

$.ajax({
	url: document.location.protocol + '//ajax.googleapis.com/ajax/services/feed/load?v=1.0&num=10&callback=?&q=' + encodeURIComponent('https://medium.com/feed/@nothingrandom'),
	dataType: 'json',
	success: function(data) {
		if (data.responseData.feed && data.responseData.feed.entries) {
			$.each(data.responseData.feed.entries, function(i, e) {
				$('.js-medium-first').append('<div class="js-medium-item"><h5><a href="' + e.link + '">' + e.title + '</a></h5><p class="font--large">' + e.contentSnippet.slice(0, -28) + ' <a href="' + e.link + '">+</a></p></div>');
				$('.js-medium').append('<li><a href="' + e.link + '">' + e.title + '</a></li>');
			});
		}
	}
});

$(function() {
	$('.js-loaded').addClass('true');
	$('.js-not-loaded').addClass('false');
	$('.page-wrapper').removeClass('no-js');

	$('.menu-button').on('click', function(e) {
		e.preventDefault();

		$(this).toggleClass('active');
		$('.header--main').toggleClass('active');
	});

	var gridElem = document.querySelector('#instafeed');
	var msnry;

	if ($('#instafeed').length > 0) {
		var feed = new Instafeed({
			get: 'user',
			limit: 12, //goes into 2 and 3
			links: true,
			resolution: 'standard_resolution',
			sortBy: 'most-recent',
			template: '<div class="photo__item"><a href="{{link}}"><img src="{{image}}" /><div class="photo__info"><h5>{{caption}}</h5></div></a></div>',
			userId: 896545907,
			accessToken: '896545907.1210342.dcf80e3b731848189d8ed763572cca5d',
			after: function() {
				msnry = new Masonry('#instafeed', {
					transitionDuration: '0.2s'
				});
				imagesLoaded(gridElem).on('progress', function() {
					msnry.layout();
				});
			}
		});
		feed.run();
	}
});