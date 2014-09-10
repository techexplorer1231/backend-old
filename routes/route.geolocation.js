'use strict'

var express = require('express');
var router = express.Router();
var geolocationController = require('../controllers/controller.geolocation')
/* GET users listing. */
// middleware to use for all requests
router.use(function(req, res, next) {
    console.log(req.body.location);
    next(); // make sure we go to the next routes and don't stop here
});

// for routes like /users
router.route('/')
    .post(geolocationController.insert)


module.exports = router;

