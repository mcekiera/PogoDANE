var PogoDANE = function(){
	var data = new PogoDANE.Data();
	var view = new PogoDANE.View();

	var updateData = function () {
		data.updateData();
		var check = setInterval(function () {
			if(data.isDone()) {
				clearInterval(check);
				var local = new PogoDANE.Local(data.getLocationData());
				var weather = new PogoDANE.Weather(data.getWeatherData());
				var date = new Date();
				view.setLocalization(local.getCity(), local.getDistrict(), local.getCountry(), local.getLatitude(), local.getLongitude());
				view.setDataTime(date.toLocaleDateString(),date.toLocaleTimeString());
				// console.log(local.getCountry() + "," +  + ',' + local.getDistrict() + ',' + local.getRegion() + '.' + local.getLatitude() + ',' + local.getLongitude());
				console.log(weather.getDescription() + ',' + weather.getClouds() + ',' + weather.getHumidity() + ','
				+ weather.getPressure() + ',' + weather.getRain() + ',' + weather.getTemperature() + ',' + weather.getWindDirection() + ',' + weather.getWindSpeed());
			}
		}, 300)
	};

	updateData();
};

