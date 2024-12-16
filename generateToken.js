// generateToken.js
const jwt = require('jsonwebtoken');
require('dotenv').config();

function generateToken(userId, role) {
    const token = jwt.sign({ id: userId, role: role }, process.env.JWT_SECRET, { expiresIn: '1h' });
    console.log("Generated Token:", token);
}

// Replace with actual user ID and role
generateToken('67224b5797e844fae0de2b56', 'Merchant');
