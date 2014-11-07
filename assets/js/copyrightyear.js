//https://github.com/nothingrandom/copyrightyear.js

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