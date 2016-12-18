function PogaDANE() {
	var data = new Data();

	var updateData = function () {
		data.updateData();
		var check = setInterval(function () {
			if(data.isDone()) {
				clearInterval(check);
				var local = new Local(data.getLocationData());
				console.log(local.getCountry() + "," + local.getCity() + ',' + local.getDistrict());
				console.log(data.getWeatherData());
			}
		}, 300)
	};

	updateData();
}

new PogaDANE();