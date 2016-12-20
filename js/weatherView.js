PogoDANE.WeatherView = function () {
	var $icon = $("#js-weather-icon");
	var $temp = $("#js-weather-temp");
	var $rainMM = $("#js-weather-rain");
	var $drop = $("#js-weather-drop");
	var $snow = $("#js-weather-snow");
	var $windV = $("#js-weather-wind-speed");
	var $windD = $("#js-weather-wind-dir");
	var $pressure = $("#js-weather-pressure");
	var $humid = $("#js-weather-humidity");
	var $cloud = $("#js-weather-cloudiness");
	var $desc = $("#js-weather-description");
	var $back = $("#js-weather-background");
	var currentData;

	var backgroundURL = {
		"01d": "https://static.pexels.com/photos/205335/pexels-photo-205335.jpeg",
		"01n": "https://static.pexels.com/photos/205335/pexels-photo-205335.jpeg",
		"02d":"https://static.pexels.com/photos/205335/pexels-photo-205335.jpeg",
		"02n":"https://static.pexels.com/photos/205335/pexels-photo-205335.jpeg",
		"03d":"https://static.pexels.com/photos/205335/pexels-photo-205335.jpeg",
		"03n":"https://static.pexels.com/photos/205335/pexels-photo-205335.jpeg",
		"04d":"https://static.pexels.com/photos/205335/pexels-photo-205335.jpeg",
		"04n":"https://static.pexels.com/photos/205335/pexels-photo-205335.jpeg",
		"09d":"https://static.pexels.com/photos/205335/pexels-photo-205335.jpeg",
		"09n":"https://static.pexels.com/photos/205335/pexels-photo-205335.jpeg",
		"10d":"https://static.pexels.com/photos/205335/pexels-photo-205335.jpeg",
		"10n":"https://static.pexels.com/photos/205335/pexels-photo-205335.jpeg",
		"11d":"https://static.pexels.com/photos/205335/pexels-photo-205335.jpeg",
		"11n":"https://static.pexels.com/photos/205335/pexels-photo-205335.jpeg",
		"13d":"https://static.pexels.com/photos/205335/pexels-photo-205335.jpeg",
		"13n":"https://static.pexels.com/photos/205335/pexels-photo-205335.jpeg",
		"50d":"https://static.pexels.com/photos/249074/pexels-photo-249074.jpeg",
		"50n":"https://static.pexels.com/photos/1068/lights-night-dark-industry.jpg"
	};

	var setImg = function (weatherCode) {
		var iconPath = "http://openweathermap.org/img/w/" + weatherCode + ".png";
		$back.css("backgroundImage", "url(" + backgroundURL[weatherCode] + ")");
		$icon.css("visibility","visible").attr("src",iconPath)
	};

	var setRain = function (rainType) {
		$drop.hide();
		$snow.hide();

		switch(rainType) {
			case "both":
				$drop.show();
				$snow.show();
				break;
			case "rain":
				$drop.show();
				break;
			case "snow":
				$snow.show();
				break;
			default:
				break;
		}
	};

	this.setWeather = function (data, lang) {
		$temp.text(Math.round(data.getTemperature() - 273.15) + "\u00B0" + "C");
		$desc.text((lang === "pl") ? data.getDescription() : data.getDescriptionEN());
		$cloud.text(data.getCloudiness()+"%");
		$humid.text(data.getHumidity()+"%");
		$pressure.text(data.getPressure()+"hpa");
		data.getWindDirection() ? $windD.show().css("transform", "rotate(" + data.getWindDirection() + "deg)") : $windD.hide();
		$windV.text(data.getWindSpeed() + "m/s");
		$rainMM.text(data.getRain() + "mm");
		setRain(data.getRainType());
		setImg(data.getIconCode());
		currentData = data;
	};
};
