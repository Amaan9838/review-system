const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        // Replace the following URI with your actual MongoDB connection string
        const dbURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/review-system';

        await mongoose.connect(dbURI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        console.log('MongoDB connected successfully');
    } catch (error) {
        console.error('MongoDB connection failed:', error.message);
        process.exit(1); // Exit the process with failure
    }
};

module.exports = connectDB;
