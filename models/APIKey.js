// models/APIKey.js
const mongoose = require('mongoose');

const apiKeySchema = new mongoose.Schema({
    key: { type: String, required: true, unique: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    expiresAt: { type: Date }
}, { timestamps: true });

module.exports = mongoose.model('APIKey', apiKeySchema);
