var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var GeolocationSchema = new Schema({
    name: {},
	processed:{
		type: Number,
		default: 0
	}
});

module.exports = mongoose.model('Geolocation', GeolocationSchema);
