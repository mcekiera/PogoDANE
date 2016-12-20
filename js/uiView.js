PogoDANE.UiView = function () {
	var $humidity = $("#js-label-humidity");
	var $pressure = $("#js-label-pressure");
	var $rain = $("#js-label-rain");
	var $cloudiness = $("#js-label-cloudiness");
	var $wind = $("#js-label-wind");
	var end =  ":";

	var dict = {
		rain: {
			en: "rain",
			pl: "opady"
		},
		pressure: {
			en: "pressure",
			pl: "ciśnienie"
		},
		humidity: {
			en: "humidity",
			pl: "wilgotność"
		},
		wind: {
			en: "wind",
			pl: "wiatr"
		},
		cloudiness: {
			en: "cloudiness",
			pl: "zachmurzenie"
		}
	};

	this.setUI = function(lang) {
		$wind.text(dict["wind"][lang] + end);
		$pressure.text(dict["pressure"][lang] + end);
		$rain.text(dict["rain"][lang] + end);
		$cloudiness.text((dict["cloudiness"][lang]) + end);
		$humidity.text(dict["humidity"][lang] + end);
	};
};
