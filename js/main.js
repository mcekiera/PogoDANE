var PogoDANE = function(){
	var data = new PogoDANE.Data();

	var updateData = function () {
		data.updateData();
		var check = setInterval(function () {
			if(data.isDone()) {
				clearInterval(check);
				var local = new PogoDANE.Local(data.getLocationData());
				var weather = new PogoDANE.Weather(data.getWeatherData());
				var date = new Date();
				console.log(local.getCountry() + "," + local.getCity() + ',' + local.getDistrict() + ',' + local.getRegion() + '.' + local.getLatitude() + ',' + local.getLongitude());
				console.log(weather.getDescription() + ',' + weather.getClouds() + ',' + weather.getHumidity() + ','
				+ weather.getPressure() + ',' + weather.getRain() + ',' + weather.getTemperature() + ',' + weather.getWindDirection() + ',' + weather.getWindSpeed());
				console.log(date.toDateString() + "," + date.toTimeString());
			}
		}, 300)
	};

	updateData();
};

