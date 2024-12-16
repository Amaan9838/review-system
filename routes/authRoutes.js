// routes/authRoutes.js

const express = require('express');
const { register, login, createUser } = require('../controllers/authController');

const router = express.Router();

// POST: Register a new user
router.post('/register', register);

// POST: Create a new user
router.post('/create-user', createUser);

// POST: Log in a user
router.post('/login', login);

module.exports = router;