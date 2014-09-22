'use strict'

var express = require('express');
var router = express.Router();
var distanceController = require('../controllers/controller.distance')
/* GET users listing. */
// middleware to use for all requests
router.use(function(req, res, next) {
    console.log(req.body);
	res.setHeader('Last-Modified', (new Date()).toUTCString());
    next(); // make sure we go to the next routes and don't stop here
});

// for routes like /users
router.route('/')
    .post(distanceController.insert)
router.route('/:user')
	.get(distanceController.read)
router.route('/:user/:fuelConsumed')
	.post(distanceController.update)

module.exports = router;

