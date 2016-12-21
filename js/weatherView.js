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
	var $back = $(".weather-background");
	var currentData;

	var backgroundURL = function (weatherCode) {
		return "img/" + weatherCode + ".jpg"
	};

	var setImg = function (weatherCode) {
		$back.css("backgroundImage", "url(" + backgroundURL(weatherCode) + ")");
		$icon.css("visibility","visible").removeAttr("class").addClass("fi flaticon-" + weatherCode)
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
