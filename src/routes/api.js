const express = require('express');
const ProfileController = require('../controllers/Profilecontroller');
const LoginController = require('../controllers/LoginController');
const router = express.Router();


router.post('/CreateProfile', ProfileController.CreateProfile);
router.post('/UserLogin', LoginController.UserLogin);

module.exports = router