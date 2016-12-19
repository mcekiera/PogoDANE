PogoDANE.View = function () {
	var mainLoc = $("#js-loc-main");
	var secLoc = $("#js-loc-sec");
	var countryLoc = $("#js-loc-country");
	var coordsLoc = $("#js-loc-coords")
	var dateStamp = $("#js-date");
	var timeStamp = $("#js-time");

	this.setLocalization = function(main, sec, country, lat, lng) {
		mainLoc.text(main);
		secLoc.text(sec);
		countryLoc.text(country);
		coordsLoc.text("(" + lat + "," + lng + ")");
	};
	this.setDataTime = function (date, time) {
		dateStamp.text(date);
		timeStamp.text(time);
	};
};
