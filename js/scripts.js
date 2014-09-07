//https://github.com/nothingrandom/copyrightyear.js
//https://github.com/nothingrandom/calculate-age.js
//https://github.com/nothingrandom/lastfm-topartists.js

window.onload = function() {

function copyright(startingYear) {
	var currentYear = new Date().getFullYear();

	if (startingYear < currentYear) {
		return startingYear + "-" + currentYear;
	}

	else if (startingYear == currentYear) {
		return startingYear;
	}

	else {
		return currentYear;
		console.log("Something is wrong with your startingYear variable. Check that it isn't in the future.");
	}
}

document.getElementById("copyyear").innerHTML = (copyright(2013));

function getAge(birth) {

	var now = new Date();

	//Define how long each period of time lasts
	aSecond = 1000;
	aMinute = aSecond * 60;
	aHour = aMinute * 60;
	aDay = aHour * 24;
	aWeek = aDay * 7;
	aMonth = aDay * 30;

	var age = now.getTime() - birth.getTime();

	//Just some maths
	years = (new Date(now.getTime() - aMonth * (birth.getMonth()))).getYear() - (new Date(birth.getTime() - aMonth * (birth.getMonth()))).getYear();

	offsetNow = (new Date(now.getTime() - aDay * (birth.getDate() -1)));
	offsetBirth = (new Date(birth.getTime() - aDay * (birth.getDate() -1)));
	if (years > 1) {
		months = years * 12 + (offsetNow.getMonth() - offsetBirth.getMonth());
	}
	else {
		months = (now.getYear() - birth.getYear()) * 12 + (offsetNow.getMonth() - offsetBirth.getMonth());
	}

	agestr = "";

	if (months < 24) {
		weeks = Math.floor(age / aWeek);
		age -= weeks * aWeek;
		days = Math.floor(age / aDay);
	}

	else {
		agestr = agestr + years;
		agestr = agestr;
	}

	return agestr;

}

document.getElementById("age").innerHTML = getAge(new Date("November 3, 1997"));

};

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
    limit: 5,
    links: true,
    resolution: 'standard_resolution',
    sortBy: 'most-recent',
    clientId: '1210342b48a44533879e8ece5df0bf97',
    userId: 896545907,
    accessToken: '896545907.1210342.dcf80e3b731848189d8ed763572cca5d'
});
feed.run();