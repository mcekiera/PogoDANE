var PogoDANE = function(){
	var data = new PogoDANE.Data();
	var view = new PogoDANE.View();
	var lastUpdate;
	var local;
	var weather;

	var updateData = function () {
		data.updateData();
		var check = setInterval(function () {
			if(data.isDone()) {
				clearInterval(check);
				var date = new Date();
				if(isReasonableUpdate(date,lastUpdate)) {
					local = new PogoDANE.Local(data.getLocationData());
					weather = new PogoDANE.Weather(data.getWeatherData());
					lastUpdate = date;
				}
				view.setLocalization(local.getCity(), local.getDistrict(), local.getCountry(), local.getLatitude(), local.getLongitude());
				view.setDataTime(date.toLocaleDateString(), date.toLocaleTimeString());
				view.setMap(data.getLocalMap());
				console.log(data.getLocalMap());
				// console.log(local.getCountry() + "," +  + ',' + local.getDistrict() + ',' + local.getRegion() + '.' + local.getLatitude() + ',' + local.getLongitude());
				console.log(weather.getDescription() + ',' + weather.getClouds() + ',' + weather.getHumidity() + ','
					+ weather.getPressure() + ',' + weather.getRain() + ',' + weather.getTemperature() + ',' + weather.getWindDirection() + ',' + weather.getWindSpeed());

			}
		}, 300)
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

