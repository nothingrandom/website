//https://github.com/nothingrandom/copyrightyear.js

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

};

//https://github.com/nothingrandom/calculate-age.js

window.onload = function() {

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