// createApiKey.js
const mongoose = require('mongoose');
const APIKey = require('./models/APIKey'); // Adjust path as needed
const crypto = require('crypto');
require('dotenv').config();

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log('Database connection error:', err));

async function createApiKey(userId) {
    const key = crypto.randomBytes(24).toString('hex');
    const apiKey = new APIKey({ userId: userId, key: key });

    await apiKey.save();
    console.log("API Key generated:", key);
    mongoose.connection.close();
}

// Replace with actual user ID
createApiKey('67224b5797e844fae0de2b56');
