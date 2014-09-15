var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var DistanceSchema = new Schema({
    user: String,
	distances: String,
	startTime: String,
	endTime: String,
	fuelConsumed:{
		default : 0,
		type : Number
	}
});

module.exports = mongoose.model('Distance', DistanceSchema);
