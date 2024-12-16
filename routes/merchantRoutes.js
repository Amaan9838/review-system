const express = require('express');
const Merchant = require('../models/Merchant'); // Import the Merchant model
const { authenticateJWT, checkApiKey } = require('../middlewares/authMiddleware');

const router = express.Router();

// POST: Create a new merchant
router.post('/', authenticateJWT, checkApiKey, async (req, res) => {
    const { name, userId } = req.body;

    // Validate request data
    if (!name || !userId) {
        return res.status(400).json({ message: 'Name and userId is required' });
    }

    try {
        const newMerchant = new Merchant({
            name,
            userId,
            createdBy: req.user.id, // assuming the user is stored in JWT payload
        });

        await newMerchant.save();
        res.status(201).json(newMerchant);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

// GET: Retrieve all merchants
router.get('/', async (req, res) => {
    try {
        const merchants = await Merchant.find();
        res.json(merchants);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

// GET: Retrieve a specific merchant by ID
router.get('/:merchantId', async (req, res) => {
    try {
        const merchant = await Merchant.findById(req.params.merchantId);
        if (!merchant) {
            return res.status(404).json({ message: 'Merchant not found' });
        }
        res.json(merchant);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

// PUT: Update a merchant's information
router.put('/:merchantId', authenticateJWT, checkApiKey, async (req, res) => {
    const { name } = req.body;

    try {
        const merchant = await Merchant.findById(req.params.merchantId);
        if (!merchant) {
            return res.status(404).json({ message: 'Merchant not found' });
        }

        // Update fields
        if (name) merchant.name = name;
        
        await merchant.save();
        res.json(merchant);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

// DELETE: Remove a merchant by ID
router.delete('/:merchantId', authenticateJWT, checkApiKey, async (req, res) => {
    try {
        const merchant = await Merchant.findById(req.params.merchantId);
        if (!merchant) {
            return res.status(404).json({ message: 'Merchant not found' });
        }

        await merchant.remove();
        res.json({ message: 'Merchant deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
