// controllers/apiKeyController.js
const APIKey = require('../models/APIKey');
const crypto = require('crypto');

exports.createApiKey = async (req, res) => {
    const userId = req.user.userId; // Assuming req.user contains the authenticated merchant's info
    console.log(userId);
    try {
        const newApiKey = new APIKey({
            key: crypto.randomBytes(20).toString('hex'), // Generate a random API key
            userId,
            expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // Expire in 30 days
        });

        await newApiKey.save();
        res.status(201).json({ apiKey: newApiKey.key });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};
