const express = require('express');

const router = express.Router();

const userController = require('../controllers/signup');
const loginController = require('../controllers/login');
const detailsController = require('../controllers/userdetails');
const userAuthentication = require('../middleware/auth');

router.post('/user/signup', userController.postSignupUser);

//copy the token from the response after login
router.post('/user/login', loginController.postUserLogin);

//userAuthentication.authenticate can be used for any route by passing the token in header 
router.get('/user/details', userAuthentication.authenticate, detailsController.getUserDetails);

module.exports=router;