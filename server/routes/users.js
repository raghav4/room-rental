const express = require('express');
const userController = require('../controllers/user.controller');

const router = express.Router();

// SignUp a user
router.post('/signup', userController.userSignUp);

// LogIn a user
router.post('/login', userController.logInUser);

module.exports = router;
