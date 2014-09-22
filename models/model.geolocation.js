var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var GeolocationSchema = new Schema({
    name: {},
	processed:{
		type: String,
		default: '0'
	}
});

module.exports = mongoose.model('Geolocation', GeolocationSchema);