PogoDANE.Weather = function(weatherData) {

	this.getDescription = function () {
		return weatherData.weather[0].description;
	};
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
	this.getRainKind = function () {
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
		try {
			return weatherData.rain["3h"];
		} catch (err) {
			return 0.0;
		}
	};
	this.getSnow = function () {
		try {
			return weatherData.snow["3h"];
		} catch (err) {
			return 0.0;
		}
	}
	this.getCloudiness = function () {
		return weatherData.clouds.all;
	};
	this.getIconCode = function () {
		return weatherData.weather[0].icon;
	}
}
