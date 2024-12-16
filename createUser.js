// createUser.js
require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const User = require('./models/User'); // Adjust path as needed

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log('Database connection error:', err));

async function createUser() {
    const name = 'John Doe';
    const email = 'john@example.com';
    const password = 'yourpassword';
    const role = 'Merchant'; // or 'admin'

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ name, email, password: hashedPassword, role });

    await user.save();
    console.log("User registered successfully");
    mongoose.connection.close();
}

createUser();
