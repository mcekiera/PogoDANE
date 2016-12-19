PogoDANE.View = function () {
	var mainLoc = $("#js-loc-main");
	var secLoc = $("#js-loc-sec");
	var countryLoc = $("#js-loc-country");
	var coordsLoc = $("#js-loc-coords")
	var dateStamp = $("#js-date");
	var timeStamp = $("#js-time");
	var weatherBlock = $('#js-weather');
	var weatherIcon = $("#js-weather-icon");
	var weatherTemp = $("#js-weather-temp");
	var weatherWindSpeed = $("#js-weather-wind-speed");
	var weatherWindDir = $('#js-weather-wind-dir');
	var weatherPressure = $("#js-weather-pressure");
	var weatherHumidity = $("#js-weather-humidity");
	var weatherClouds = $("#js-weather-clouds");
	var cover = $("#js-cover");
	var widget = $(".widget");

	this.setLocalization = function(main, sec, country, lat, lng) {
		mainLoc.text(main);
		secLoc.text(sec);
		countryLoc.text(country);
		coordsLoc.text("(" + (Math.round(lat * 100) / 100) + "," + (Math.round(lng * 100) / 100) + ")");
	};
	this.setDataTime = function (date, time) {
		dateStamp.text(date);
		timeStamp.text(time);
	};
	this.setMap = function (url) {
		weatherBlock.css("backgroundImage","url(" + url + ")");
	};
	this.setWeather = function (temp, pressure, wind, humidity, clouds) {
		weatherTemp.text(Math.round(temp - 273.15) + "\u00B0" + "C");
		weatherWindSpeed.text(wind);
		weatherPressure.text(pressure);
		weatherHumidity.text(humidity);
		weatherClouds.text(clouds + "%");
	};
	this.setIcon = function (code) {
		var path = "http://openweathermap.org/img/w/" + code + ".png";
		weatherIcon.css("visibility","visible").attr('src', path);
	};
	this.uncover = function () {
		widget.hide();
		cover.fadeOut();
		widget.fadeIn();
	}
	this.cover = function () {
		cover.fadeIn();
	}
};
