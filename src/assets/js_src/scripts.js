var $ = require('jquery'); // ^2.1.4 included

$.ajax({
	url: document.location.protocol + '//ajax.googleapis.com/ajax/services/feed/load?v=1.0&num=10&callback=?&q=' + encodeURIComponent('https://medium.com/feed/@nothingrandom'),
	dataType: 'json',
	success: function(data) {
		if (data.responseData.feed && data.responseData.feed.entries) {
			$.each(data.responseData.feed.entries, function(i, e) {
				$('.js-medium-first').append('<div class="js-medium-item"><h5><a href="' + e.link + '">' + e.title + '</a></h5><p class="font--large">' + e.contentSnippet.slice(0, -22) + ' <a href="' + e.link + '">+</a></p></div>');
				$('.js-medium').append('<li><a href="' + e.link + '">' + e.title + '</a></li>');
			});
		}
	}
});

$(function() {
	$('.js-loaded').addClass('true');
	$('.js-not-loaded').addClass('false');

	var gridElem = document.querySelector('#instafeed');
	var msnry;

	if ($('#instafeed').length > 0) {
		var feed = new Instafeed({
			get: 'user',
			limit: 12, //goes into 2 and 3
			links: true,
			resolution: 'standard_resolution',
			sortBy: 'most-recent',
			template: '<div class="photo__item"><a href="{{link}}"><img src="{{image}}" /><div class="project__info"><h5>{{caption}}</h5></div></a></div>',
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

$(window).load(function() {
	$('.js-medium-first').contains('reading').remove();
});