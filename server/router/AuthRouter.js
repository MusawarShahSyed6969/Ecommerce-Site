// src/routes/authRoutes.js
const express = require('express');
const router = express.Router();
const { register, login, getProfile } = require('../controllers/AuthController');
const { protect } = require('../middleware/Auth.js');


router.post('/register', register);
router.post('/login', login);
router.get('/me', protect, getProfile);

module.exports = router;
