const express = require('express');
//const { post } = require('request');
const router = express.Router();
const { expressjwt : jwt} = require('express-jwt');
//const jwt = require('jsonwebtoken');
const auth = jwt({
    algorithms : ["HS256"],
    secret: process.env.JWT_SECRET,
    requestProperty: 'payload'
});



const authController = require('../controllers/authentication');
const tripsController = require('../controllers/trips');

router
    .route('/login')
    .post(authController.login);

router
    .route('/register')
    .post(authController.register);

router
    .route('/trips')
    .get(tripsController.tripsList)
    .post(auth, tripsController.tripsAddTrip);

router
    .route('/trips/:tripCode')
    .get(tripsController.tripsFindCode)
    .put(auth, tripsController.tripsUpdateTrip);

module.exports = router; 