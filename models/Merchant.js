// models/Merchant.js
const mongoose = require('mongoose');

const merchantSchema = new mongoose.Schema({
    name: { type: String, required: true },
    // location: { type: String },
    // category: { type: String },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
}, { timestamps: true });

module.exports = mongoose.model('Merchant', merchantSchema);
