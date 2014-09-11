'use strict'

var geolocationModel = require('../models/model.geolocation')
// create a user (accessed at POST http://localhost:3001/geolocation
exports.insert = function(req, res) {
	var geolocation = new geolocationModel(); // create a new instance of the Product model
	geolocation.name = req.body; // set the products name (comes from the request)
	geolocation.save(function(err, data) {
		if(err) res.send(err);
		res.json(data);
	});
}

exports.list = function(req, res) {
    geolocationModel.find(function(err, data) {
        if(err) res.send(err);
        res.json(data);
    });
}
