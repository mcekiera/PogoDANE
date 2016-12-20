PogoDANE.Data = function() {
	var latitude;
	var longitude;
	var weatherData;
	var locationData;
	var timeStamp;
	var alternative;
	var localMap;
	var done = 0;
	var isRunning = false;
	var lang = "pl";

	var init = function (position) {
		isRunning = true;
		latitude = position.coords.latitude;
		longitude = position.coords.longitude;
		getData();
	};

	var getData = function() {
		done = 0;
		collectLocationData();
		collectWeatherData();
		collectDateTimeData();
	};

	var getResponse = function (path, callback) {
		$.getJSON(path, function (data) {
			callback(data);
		});
	};

	var collectLocationData = function () {
		var path = "http://maps.googleapis.com/maps/api/geocode/json?latlng=" + latitude + "," + longitude + "&sensor=true&language=" + lang;
		var callback = function (data) {
			locationData = data;
			done += 1;
			console.log("local")
		};
		getResponse(path, callback)
	};

	var useAlternativeGeolocation = function () {
		var path = "http://ipinfo.io/json";
		console.log("alternative");

		var callback = function (data) {
			alternative = data;
			var loc = alternative.loc.split(",");
			var lat = (+loc[0]).toFixed(6);
			var lng = (+loc[1]).toFixed(6);
			var position = {
				coords: {
					latitude: lat,
					longitude: lng
				}
			};
			init(position);
			console.log("alternative callback")
		};

		getResponse(path, callback)
	};

	var collectWeatherData = function () {
		var path =  "http://api.openweathermap.org/data/2.5/weather?lat=" + Math.round(latitude * 100) / 100 + "&lon=" +
				Math.round(longitude * 100) / 100 + "&APPID=cf877ce314aa5244a62d3f93fc27ab15&lang=" + lang;
		var callback = function (data) {
			weatherData = data;
			done += 1;
			console.log("weather")
		};
		getResponse(path, callback);
	};

	var collectDateTimeData = function () {
		timeStamp = new Date();
	};

	var determineMoonPhase = function () {
			var lp = 2551443;
			var now = timeStamp;
			var new_moon = new Date(1970, 0, 7, 20, 35, 0);
			var phase = ((now.getTime() - new_moon.getTime())/1000) % lp;
			return Math.floor(phase /(24*3600)) + 1;
	};

	var useAlternativeSource = function () {
		var alternative = function () {
			clearTimeout(alter);
			console.log("timeout");
			if (!isRunning && done === 0) {
				isRunning = true;
				useAlternativeGeolocation();
			}
		};

		var alter = setTimeout(alternative, 10000);
	};

	this.getWeatherData = function () {
		return weatherData;
	};

	this.getLocationData = function () {
		return locationData;
	};

	this.getMoonPhase = function () {
		return determineMoonPhase();
	};

	this.updateAll = function (language) {
		lang = language;
		isRunning = false;
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(init);
			useAlternativeSource();
		} else {
			console.log("No service");
		}
	};

	this.updateData = function () {
		getData();
	};

	this.isDone = function () {
		console.log(done);
		return done >= 2;
	};


	this.updateAll();
};





