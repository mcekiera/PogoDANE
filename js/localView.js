PogoDANE.LocalView = function () {
	var $city = $("#js-local-city");
	var $country = $("#js-local-country");
	var $district = $("#js-local-district");
	var $coords = $("#js-local-coords");
	var $time = $("#js-local-time");
	var $date = $("#js-local-date");

	this.setLocalization = function (data) {
		$city.text(data.city);
		$country.text(data.country);
		$district.text(data.district);
		$coords.text("[" + (Math.round(data.latitude * 100) / 100) + "," + (Math.round(data.longitude * 100) / 100) + "]");
	};
	this.setTimeStamp = function (date, time) {
		$time.text(time.substring(0,5));
		$date.text(date);
	}
};
