const express = require('express');
const router = express();
const passport = require('passport'); 
require('../passport');

router.use(passport.initialize()); 
router.use(passport.session());

const authController = require('../controllers/auth.controller');

router.get('/', authController.loadAuth);

// Auth 
router.get('/google' , passport.authenticate('google', { scope: 
	[ 'email', 'profile' ] 
})); 

// Auth Callback 
router.get( '/google/callback', 
	passport.authenticate( 'google', { 
		successRedirect: '/success', 
		failureRedirect: '/failure'
}));

// Success 
router.get('/success' , authController.successGoogleLogin); 

// failure 
router.get('/failure' , authController.failureGoogleLogin);

module.exports = router;