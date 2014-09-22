'use strict'

var distanceModel = require('../models/model.distance')
// create a user (accessed at POST http://localhost:3001/distance
exports.insert = function(req, res) {
	var distanceModel = new distanceModel(); // create a new instance of the Product model
	geolocation.name = req.body; // set the products name (comes from the request)
	geolocation.save(function(err, data) {
		if(err) res.send(err);
		res.json(data);
	});
}
// get specific user
//http://mambo-action-3001.codio.io/distance/pratap
exports.read = function(req, res) {
	distanceModel.find({user : req.params.user}).exec(function(err, data) {
        if(err) res.send(err);
        res.json(data);
    });
}

//http://mambo-action-3001.codio.io/distance/pratap/20
exports.update = function(req, res) {
	distanceModel.update({user : req.params.user}, {$inc: {fuelConsumed: req.params.fuelConsumed }},{upsert : true} , function (err, numberAffected, raw) {
       if(err) res.send(err);
       res.json({
           message: 'Fuel updated!'
       });
	});
}

