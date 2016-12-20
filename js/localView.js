PogoDANE.LocalView = function () {
	var $city = $("#js-local-city");
	var $country = $("#js-local-country");
	var $district = $("#js-local-district");
	var $coords = $("#js-local-coords");
	var $time = $("#js-local-time");
	var $date = $("#js-local-date");

	this.setLocalization = function (country, city, district, latitude, longitude) {
		$city.text(city);
		$country.text(country);
		$district.text(district);
		$coords.text("[" + (Math.round(latitude * 100) / 100) + "," + (Math.round(longitude * 100) / 100) + "]");
	};
	this.setTimeStamp = function (date, time) {
		$time.text(time.substring(0,5));
		$date.text(date);
	}
};
