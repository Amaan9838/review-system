// middlewares/authMiddleware.js
const jwt = require('jsonwebtoken');
const APIKey = require('../models/APIKey');
require('dotenv').config();

const authenticateJWT = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.sendStatus(401);

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) return res.sendStatus(403);
        req.user = user;
        next();
    });
};

const checkApiKey = async (req, res, next) => {
    const apiKey = req.headers['x-api-key'];

    if (!apiKey) {
        return res.status(401).json({ message: 'API key required' });
    }

    try {
        const validKey = await APIKey.findOne({ key: apiKey });
        if (!validKey) {
            return res.status(403).json({ message: 'Invalid API key' });
        }
        next();
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

const authorizeRole = (role) => (req, res, next) => {
    if (req.user.role !== role) return res.sendStatus(403);
    next();
};

module.exports = { authenticateJWT, checkApiKey, authorizeRole };
