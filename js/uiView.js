PogoDANE.UiView = function () {
	var $humidity = $("#js-label-humidity");
	var $pressure = $("#js-label-pressure");
	var $rain = $("#js-label-rain");
	var $cloudiness = $("#js-label-cloudiness");
	var $wind = $("#js-label-wind");
	var end =  ":";

	var dict = {
		rain: {
			EN: "rain",
			PL: "opady"
		},
		pressure: {
			EN: "pressure",
			PL: "ciśnienie"
		},
		humidity: {
			EN: "humidity",
			PL: "wilgotność"
		},
		wind: {
			EN: "wind",
			PL: "wiatr"
		},
		cloudiness: {
			EN: "cloudiness",
			PL: "zachmurzenie"
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
