var $ = require('jquery'); // ^2.1.4 included

// Google Analytics
// ==============================
var _gaq = _gaq || [];
_gaq.push(['_setAccount', 'UA-41281395-1']);
_gaq.push(['_trackPageview']);

(function() {
	var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
	ga.src = ('https:' == document.location.protocol ? 'https://' : 'http://') + 'stats.g.doubleclick.net/dc.js';
	var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
})();


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
		limit = '3';
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
			template: '<div class="column small-6 medium-4 large-2"><div class="instagram--item"><a href="{{link}}"><img src="{{image}}" /><div class="instagram--item__hover"><h4>{{caption}}</h4></div></a></div></div>',
			userId: 896545907,
			accessToken: '896545907.1210342.dcf80e3b731848189d8ed763572cca5d'
		});
		feed.run();
	}
});
