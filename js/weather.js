PogoDANE.Weather = function(weatherData) {

	this.getDescription = function () {
		return weatherData.weather[0].description;
	};
	this.getDescriptionEN = function() {
		return weatherData.weather[0].main;
	}
	this.getTemperature = function () {
		return weatherData.main.temp;
	};
	this.getPressure = function () {
		return weatherData.main.pressure;
	};
	this.getHumidity = function () {
		return weatherData.main.humidity;
	};
	this.getWindSpeed = function () {
		return weatherData.wind.speed;
	};
	this.getWindDirection = function () {
		return weatherData.wind.deg;
	};
	this.getRainType = function () {
		if(weatherData.rain && weatherData.snow) {
			return "both";
		} else if(weatherData.rain) {
			return "rain";
		} else if(weatherData.snow) {
			return "snow";
		} else {
			return "none";
		}
	};
	this.getRain = function () {
		if(weatherData.rain && weatherData.snow) {
			return weatherData.rain["3h"];
		} else if(weatherData.rain) {
			return weatherData.rain["3h"];
		} else if(weatherData.snow) {
			return weatherData.snow["3h"];
		} else {
			return 0.0;
		}
	};
	this.getCloudiness = function () {
		return weatherData.clouds.all;
	};
	this.getIconCode = function () {
		return weatherData.weather[0].icon;
	}
};
