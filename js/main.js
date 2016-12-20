var PogoDANE = function(){
	var data = new PogoDANE.Data();
	var localView = new PogoDANE.LocalView();
	var weatherView = new PogoDANE.WeatherView();
	var uiView = new PogoDANE.UiView();
	var lastUpdate;
	var language = "PL";

	var updateData = function () {
		// view.cover();
		var date = new Date();
		if(isReasonableUpdate(date,lastUpdate)) {
			data.updateData();
			var check = setInterval(function () {
				if (data.isDone()) {
					var local = new PogoDANE.Local(data.getLocationData());
					var weather = new PogoDANE.Weather(data.getWeatherData());
					var moon = data.getMoonPhase();
					clearInterval(check);



					lastUpdate = date;
					uiView.setUI(language);
					localView.setLocalization(local);
					localView.setTimeStamp(date);
					weatherView.setWeather(weather);
				}
			}, 300)
		} else {
			// view.uncover();
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

	$("#js-btn-update").click(updateData);

	updateData();
};

