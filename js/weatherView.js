PogoDANE.WeatherView = function () {
	var $icon = $("#js-weather-icon");
	var $temp = $("#js-weather-temp");
	var $rainMM = $("#js-weather-rain");
	var $rainKind = $("#js-weather-rain-kind");
	var $windV = $("#js-weather-wind-speed");
	var $windD = $("#js-weather-wind-dir");
	var $pressure = $("#js-weather-pressure");
	var $humid = $("#js-weather-humidity");
	var $cloud = $("#js-weather-cloudiness");
	var $desc = $("#js-weather-description");
	var $back = $("#js-weather-background");

	var setImg = function (weatherCode) {
		var iconPath = "http://openweathermap.org/img/w/" + weatherCode + ".png";
		$back.css("backgroundColor", "blue");
		$icon.attr("src",iconPath)
	};
	this.setWeather = function (data) {
		$temp.text(Math.round(data.getTemperature() - 273.15) + "\u00B0" + "C");
		$desc.text(data.getDescription());
		$cloud.text(data.getCloudiness()+"%");
		$humid.text(data.getHumidity()+"%");
		$pressure.text(data.getPressure()+"hpa");
		data.getWindDirection() ? $windD.show().css("transform", "rotate(" + data.getWindDirection() + "deg)") : $windD.hide();
		$windV.text(data.getWindSpeed() + "m/s");
		// $rainMM.text(data.getRain());
		setImg(data.getIconCode());
	};
};
