window.onload = function() {
	document.getElementById("copyyear").innerHTML = (copyright(2013));
	document.getElementById("age").innerHTML = getAge(new Date("November 3, 1997"));
};

/*$(document).ready(function() {
	$("#instafeed").removeClass("none");
}*/

$(document).ready(function() {
	var method = "user.getTopArtists"
	var username = "nothingrandom";
	var api_key = "928f184254c119b939f618cdbf36e58d";
	var period = "1month";
	var limit = "3";
    $.getJSON("http://ws.audioscrobbler.com/2.0/?method=" + method + "&user=" + username + "&api_key=" + api_key + "&period=" + period + "&limit=" + limit + "&format=json&callback=?", function(json) {
        var html = '';
        $.each(json.topartists.artist, function(i, item) {
            html += "<li><a href=" + item.url + " target='_blank'>" + item.name + "</a></li>";
        });
        $('#lastfm').append(html);
    });
});

var feed = new Instafeed({
	get: 'user',
    limit: 6,
    links: true,
    resolution: 'low_resolution',
    sortBy: 'most-recent',
    template: '<div class="box"><a href="{{link}}"><img src="{{image}}" /><div class="hover"><h4>{{caption}}</h4></div></a></div>',
    userId: 896545907,
    accessToken: '896545907.1210342.dcf80e3b731848189d8ed763572cca5d'
});
feed.run();