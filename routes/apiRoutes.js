// routes/apiRoutes.js
const express = require('express');
const { createApiKey } = require('../controllers/apiKeyController.js');
const { authenticateJWT } = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/generate-key', createApiKey); // Generate new API key

module.exports = router;
