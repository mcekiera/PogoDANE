var PogoDANE = function(){
	var data = new PogoDANE.Data();
	var localView = new PogoDANE.LocalView();
	var weatherView = new PogoDANE.WeatherView();
	var lastUpdate;
	var moon;

	var updateData = function () {
		// view.cover();
		var date = new Date();
		if(isReasonableUpdate(date,lastUpdate)) {
			data.updateData();
			var check = setInterval(function () {
				if (data.isDone()) {
					var local = new PogoDANE.Local(data.getLocationData());
					var weather = new PogoDANE.Weather(data.getWeatherData());
					clearInterval(check);


					moon = data.getMoonPhase();
					lastUpdate = date;

					var localData = {
						country: local.getCountry(),
						city: local.getCity(),
						district: local.getDistrict(),
						latitude: local.getLatitude(),
						longitude: local.getLongitude()
					};
					localView.setLocalization(localData);

					localView.setTimeStamp(date.toLocaleDateString(), date.toLocaleTimeString());
					// view.setMap(data.getLocalMap());
					// view.setIcon(weather.getIconCode());
					// view.setWeather(weather.getTemperature(),weather.getPressure(),weather.getWindSpeed(), weather.getWindDirection(),
					// 	weather.getHumidity(), weather.getClouds());
					// view.uncover();
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

