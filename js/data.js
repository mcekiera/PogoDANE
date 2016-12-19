function Data() {
	var latitude;
	var longitude;
	var weatherData;
	var locationData;
	var done = 0;

	var getData = function (position) {
		latitude = position.coords.latitude;
		longitude = position.coords.longitude;
		getLocationData();
		getWeatherData();
	};

	var getResponse = function (path, callback) {
		$.getJSON(path, function (data) {
			callback(data);
		});
	};

	var getLocationData = function () {
		var path = "http://maps.googleapis.com/maps/api/geocode/json?latlng=" + latitude + "," + longitude + "&sensor=true&language=pl";
		var callback = function (data) {
			locationData = data;
			done += 1;
		};
		getResponse(path, callback)
	};

	var getWeatherData = function () {
		var path =  "http://api.openweathermap.org/data/2.5/weather?lat=" + Math.round(latitude * 100) / 100 + "&lon=" +
				Math.round(longitude * 100) / 100 + "&APPID=cf877ce314aa5244a62d3f93fc27ab15&lang=pl";
		var callback = function (data) {
			weatherData = data;
			done += 1;
		};
		getResponse(path, callback);
	};

	this.getWeatherData = function () {
		return weatherData;
	};

	this.getLocationData = function () {
		return locationData;
	};

	this.updateData = function () {
		done = 0;
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(getData);
		} else {
			throw new Error("No geolocation");
		}
	};

	this.isDone = function () {
		return done === 2;
	};


	this.updateData();
}





