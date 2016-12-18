function Local(localizationData) {
	var data = localizationData.results[0];
	
	this.getCity = function () {
		return data.address_components[3].long_name
	};
	this.getCountry = function () {
		return data.address_components[6].long_name
	};
	this.getRegion = function () {
		return data.address_components[5].long_name
	};
	this.getDistrict = function () {
		return data.address_components[2].long_name
	};
	this.getLatitude = function () {
		return data.geometry.location.lat;
	};
	this.getLongitude = function () {
		return data.geometry.location.lng;
	};
}
