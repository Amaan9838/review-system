// controllers/adminController.js
const APIKey = require('../models/APIKey');
const User = require('../models/User');

exports.generateApiKey = async (req, res) => {
    try {
        const { merchantId } = req.body; // Expect merchant ID to be provided
        const user = await User.findById(merchantId);

        if (!user || user.role !== 'Merchant') {
            return res.status(400).json({ message: "Invalid merchant ID" });
        }

        const apiKey = APIKey.generate();  // Generate new API key
        const newApiKey = new APIKey({ userId: merchantId, key: apiKey });

        await newApiKey.save();
        res.status(201).json({ message: "API key generated successfully", apiKey });
    } catch (error) {
        res.status(500).json({ message: "Error generating API key", error });
    }
};
