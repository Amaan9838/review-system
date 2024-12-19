// routes/reviewRoutes.js
const express = require('express');
const multer = require('multer');
const { createReview, getReviewsByProduct, updateReview, deleteReview, replyToReview, getReviewsByMerchant } = require('../controllers/reviewController');
const { handleFileUpload } = require('../controllers/uploadController');
const { checkApiKey, authenticateJWT } = require('../middlewares/authMiddleware');

const upload = multer({ storage: multer.memoryStorage() });

const router = express.Router();

router.post('/', upload.fields([{ name: 'images', maxCount: 4 }, { name: 'videos', maxCount: 2 }]), checkApiKey, handleFileUpload, createReview); // Create review
router.get('/product/:productId', checkApiKey, getReviewsByProduct);

router.put('/:reviewId', checkApiKey, updateReview); // Update review
router.delete('/:reviewId', checkApiKey, deleteReview); // Delete review
router.post('/:reviewId/reply', checkApiKey, replyToReview); // Reply to review

router.get('/merchant', authenticateJWT, checkApiKey, getReviewsByMerchant);

module.exports = router;
