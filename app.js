const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const reviewRoutes = require('./routes/reviewRoutes');
const authRoutes = require('./routes/authRoutes');
const merchantRoutes = require('./routes/merchantRoutes.js');
const apiKeyRoutes = require('./routes/apiRoutes'); // Manages API keys
const uploadRoutes = require('./routes/uploadRoutes');

require('dotenv').config();

const app = express();

// Middleware
app.use(express.json());
app.use(cors()); // Enables CORS for cross-origin requests

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch((err) => console.log('Database connection error:', err));

    
// Routes
app.use('/api/reviews', reviewRoutes);       // Review-related routes
app.use('/api/auth', authRoutes);            // Authentication routes
app.use('/api/merchants', merchantRoutes);   // Merchant-related routes
app.use('/api', apiKeyRoutes);               // API key management routes

app.use('/api', uploadRoutes);  // File upload routes
// Starting the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
