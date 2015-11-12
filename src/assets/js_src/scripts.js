var $ = require('jquery'); // ^2.1.4 included

// Google Analytics
// ==============================
(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
})(window,document,'script','//www.google-analytics.com/analytics.js','ga');

ga('create', 'UA-41281395-1', 'auto');
ga('send', 'pageview');


// Copyright year
// ==============================
function copyright(startingYear) {
	var currentYear = new Date().getFullYear();

	if (startingYear < currentYear) {
		return startingYear + '-' + currentYear;
	}

	else if (startingYear == currentYear) {
		return startingYear;
	}

	else {
		return currentYear;
		console.log("Something is wrong with your startingYear variable. Check that it isn't in the future.");
	}
}

// Availabilty show
// ==============================
function availability() {
	var monthNum = new Date().getMonth();
	var monthArray = [
	'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
	];

	var currentMonth = monthArray[monthNum];

	var monthText = [];

	$('.availability__month .availability__text').each(function() {
		monthText.push($(this).text());
	});

	var monthPos = (monthText.indexOf(currentMonth) + 1);

	$('.availability__month:nth-child(' + monthPos + ')').addClass('show-item');
	$('.availability__month:nth-child(' + (monthPos + 1) + ')').addClass('show-item');
	$('.availability__month:nth-child(' + (monthPos + 2) + ')').addClass('show-item');
	$('.availability__month:nth-child(' + (monthPos + 3) + ')').addClass('show-item');
}

function italicAmp() {
	$('.info-header__section:contains("&")').html(function(_, html) {
		return html.replace(/(&amp;)/g, '<span class="text--italic">$1</span>');
	});
}

function blogTags() {
	$('.js-blog-tags').appendTo('.blog-tags');
}

function blogCatHead() {
	$('.blog-cat-header').prependTo('.page-section--header');
}

function blogLength() {
	var postText = $('.page-section--blog-post').text(),
	regex = /\s+/gi,
	wordCount = postText.trim().replace(regex, " ").split(" ").length,
	readSpeed = 4,
	readTime = Math.round(wordCount / readSpeed);

	if (readTime < 60) {
		$('.js-read-time').html(readTime + " seconds");
	}

	else {
		var readTimeMin = Math.ceil(readTime / 60);

		$('.js-read-time').html(readTimeMin + " minutes");
	}
}

function portfolioURL() {
	var urlLength = $('.page-wrapper--portfolio .page-section--info-header .medium-4:last-child p').text().length;

	if (urlLength == 0) {
		$('.page-wrapper--portfolio .page-section--info-header .medium-4').addClass('info-header__section-wrap');
		$('.info-header__section-wrap').removeClass('medium-4').addClass('medium-6');
		$('.info-header__section-wrap:last-child').addClass('hide');
	}
}

function profileInstagram() {
	var itemWidth = $('.instagram--item .background-image').width();

	console.log(itemWidth);

	$('.instagram--item .background-image').css({
		height: itemWidth + 'px'
	});
}

$(document).ready(function() {
	document.getElementById('copyyear').innerHTML = (copyright(2013));

	// Last.FM
	// ==============================
	if ($('#lastfm').length > 0) {
		$('.profile__sidebar--music').css('display', 'block');
		var method = 'user.getTopArtists',
		username = 'nothingrandom',
		api_key = '928f184254c119b939f618cdbf36e58d',
		period = '1month',
		limit = '5';
		$.getJSON("http://ws.audioscrobbler.com/2.0/?method=" + method + "&user=" + username + "&api_key=" + api_key + "&period=" + period + "&limit=" + limit + "&format=json&callback=?", function(json) {
			var html = '';
			$.each(json.topartists.artist, function(i, item) {
				html += "<li><a href=" + item.url + " target='_blank'>" + item.name + "</a></li>";
			});
			$('#lastfm').append(html);
		});
	}

	// Instafeed (see vendor)
	// ==============================
	if ($('#instafeed').length > 0) {
		var feed = new Instafeed({
			get: 'user',
			limit: 12,
			links: true,
			resolution: 'low_resolution',
			sortBy: 'most-recent',
			template: '<div class="column small-6 medium-4 large-2"><div class="instagram--item"><a href="{{link}}"><div class="background-image" style="background-image: url({{image}});"></div><div class="instagram--item__hover"><h4>{{caption}}</h4></div></div></a></div>',
			userId: 896545907,
			accessToken: '896545907.1210342.dcf80e3b731848189d8ed763572cca5d'
		});
		feed.run();
	}

	availability();
	italicAmp();
	blogTags();
	blogLength();
	blogCatHead();
	portfolioURL();
});

$(window).load(function() {
	profileInstagram();

	$(window).resize(function() {
		profileInstagram();
	});
});
