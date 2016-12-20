PogoDANE.Local = function(localizationData) {
	var data = localizationData.results[0];
	var base = data.address_components.length;
	
	this.getCity = function () {
		return data.address_components[base - 4].long_name
	};
	this.getCountry = function () {
		return data.address_components[base - 1].short_name
	};
	this.getRegion = function () {
		return data.address_components[base - 2].long_name
	};
	this.getDistrict = function () {
		return data.address_components[base - 5].long_name
	};
	this.getLatitude = function () {
		return data.geometry.location.lat;
	};
	this.getLongitude = function () {
		return data.geometry.location.lng;
	};
}
