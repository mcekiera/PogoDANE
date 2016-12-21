var PogoDANE = function(){
	var language = "pl";
	var data = new PogoDANE.Data();
	var localView = new PogoDANE.LocalView();
	var weatherView = new PogoDANE.WeatherView();
	var uiView = new PogoDANE.UiView();
	var lastUpdate;

	var interval = function() {
		var check = setInterval(function () {
			if (data.isDone()) {
				var date = new Date();
				var local = new PogoDANE.Local(data.getLocationData());
				var weather = new PogoDANE.Weather(data.getWeatherData());
				clearInterval(check);

				uiView.uncover();
				lastUpdate = date;
				uiView.setUI(language);
				localView.setLocalization(local);
				localView.setTimeStamp(date);
				weatherView.setWeather(weather, language);
			}
		}, 300);
	};

	var updateAll = function () {
		data.updateAll(language);
		interval();
		clearInterval(every10min);
		var every10min = setTimeout(updateDataOnly, 600000);
	};

	var updateDataOnly = function () {
		data.updateData();
		interval();
	};

	var requestUpdate = function () {
		var date = new Date();
		if(isReasonableUpdate(date,lastUpdate)) {
			updateAll();
		} else {
			updateDataOnly()
		}
	};

	/**
	 * According to OpenWeatherMap documentation, due to slow weather changes data requests with time difference shorter
	 * than 10 min will not return different data. To avoid to often data updating, application automatically ignore
	 * some of user update request and display previously retrieved data.
	 * @param stDate, data and time of new request
	 * @param ndDate, data and time of last request
	 * @returns {boolean} true, if difference between requests is more than 10 minutes
	 */
	var isReasonableUpdate = function (stDate, ndDate) {
		if(!ndDate) {
			return true;
		}
		if(stDate.toDateString() === ndDate.toDateString()) {
			if(stDate.getHours() === ndDate.getHours()) {
				if(stDate.getMinutes() - ndDate.getMinutes() > 10) {
					console.log("time period ok")
					return true;
				}
			}
		}
		console.log("too short time period")
		return false;
	};

	var clock = function () {
		var update = function () {
			var date = new Date();
			localView.setTimeStamp(date);
		};
		setInterval(update, 1000);
	};

	$("#js-btn-update").click(requestUpdate);

	$("#js-btn-lang").click(function () {
		var lang = (language === "pl") ? "en" : "pl";
		$(this).text(language);
		language = lang;
		updateDataOnly();
		uiView.setUI(lang);
	});

	$("#js-btn-info").click(function () {
		$(".info").fadeIn();
	});

	$("#js-btn-cancel").click(function () {
		$(".info").fadeOut();
	});

	$("#js-btn-unit").click(function () {
		$(this).children().text($(this).children().text() === "F" ? "C" : "F");
		weatherView.changeUnit();
	});

	updateAll();
};

