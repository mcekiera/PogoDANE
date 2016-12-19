function PogaDANE() {
	var data = new Data();

	var updateData = function () {
		data.updateData();
		var check = setInterval(function () {
			if(data.isDone()) {
				clearInterval(check);
				var local = new Local(data.getLocationData());
				var weather = new Weather(data.getWeatherData());
				console.log(local.getCountry() + "," + local.getCity() + ',' + local.getDistrict() + ',' + local.getRegion() + '.' + local.getLatitude() + ',' + local.getLongitude());
				console.log(weather.getDescription() + ',' + weather.getClouds() + ',' + weather.getHumidity() + ','
				+ weather.getPressure() + ',' + weather.getRain() + ',' + weather.getTemperature() + ',' + weather.getWindDirection() + ',' + weather.getWindSpeed());
			}
		}, 300)
	};

	updateData();
}

new PogaDANE();