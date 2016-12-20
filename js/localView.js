PogoDANE.LocalView = function () {
	var $city = $("#js-local-city");
	var $country = $("#js-local-country");
	var $district = $("#js-local-district");
	var $coords = $("#js-local-coords");
	var $time = $("#js-local-time");
	var $date = $("#js-local-date");

	this.setLocalization = function (data) {
		$city.text(data.getCity());
		$country.text(data.getCountry());
		$district.text(data.getDistrict());
		$coords.text("[" + (Math.round(data.getLatitude() * 100) / 100) + "," + (Math.round(data.getLongitude() * 100) / 100) + "]");
	};
	this.setTimeStamp = function (date) {
		$time.text(date.toLocaleTimeString().substring(0,5));
		$date.text(date.toLocaleDateString());
	};
};
