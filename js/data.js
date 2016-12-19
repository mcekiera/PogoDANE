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

	var getData = function (position) {
		isRunning = true;
		latitude = position.coords.latitude;
		longitude = position.coords.longitude;
		collectLocationData();
		collectWeatherData();
		collectLocalMap();
		collectDateTimeData();
	};

	var getResponse = function (path, callback) {
		$.getJSON(path, function (data) {
			callback(data);
		});
	};

	var collectLocationData = function () {
		var path = "http://maps.googleapis.com/maps/api/geocode/json?latlng=" + latitude + "," + longitude + "&sensor=true&language=pl";
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
			getData(position);
			console.log("alternative callback")
		};

		getResponse(path, callback)
	};

	var collectWeatherData = function () {
		var path =  "http://api.openweathermap.org/data/2.5/weather?lat=" + Math.round(latitude * 100) / 100 + "&lon=" +
				Math.round(longitude * 100) / 100 + "&APPID=cf877ce314aa5244a62d3f93fc27ab15&lang=pl";
		var callback = function (data) {
			weatherData = data;
			done += 1;
			console.log("weather")
		};
		getResponse(path, callback);
	};

	var collectLocalMap = function () {
		var path = "https://maps.googleapis.com/maps/api/staticmap?center=" + latitude + "," + longitude + "&zoom=13&size=300x300&key=AIzaSyCwSI2vWcynkzIch96NzRmLEwh_E2ncsvg";
		var callback = function (data) {
			console.log("map");
			localMap = path;
			done += 1;
			console.log(localMap)
		};
		$.get(path, function (data) {
			callback(data);
		});
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

	this.getLocalMap = function () {
		return localMap;
	};

	this.getTimeStamp = function () {
		return timeStamp;
	};

	this.getMoonPhase = function () {
		return determineMoonPhase();
	};

	this.updateData = function () {
		isRunning = false;
		done = 0;
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(getData);
			useAlternativeSource();
		} else {
			console.log("No service");
		}
	};

	this.isDone = function () {
		console.log(done);
		return done >= 3;
	};


	this.updateData();
};





