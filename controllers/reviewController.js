// controllers/reviewController.js

const Review = require('../models/Review');
const Merchant = require('../models/Merchant'); // Assuming you have a Merchant model
const User = require('../models/User');
const { uploadFileToS3 } = require('../services/s3Service');

exports.createReview = async (req, res) => {
    try {
        const { customerId, customerName, orderId, productId, rating, comment, merchantId } = req.body;
        const uploadedFiles = req.uploadedFiles || [];

        const IMAGE_EXTENSIONS = ['.jpg', '.jpeg', '.png', '.gif', '.webp'];
        const VIDEO_EXTENSIONS = ['.mp4', '.avi', '.mov', '.wmv'];
        
        // Helper function to check if a URL ends with any of the given extensions
        const hasExtension = (url, extensions) => {
            return extensions.some(extension => url.toLowerCase().endsWith(extension));
        };
        
        // Filter uploaded files into images and videos based on URL
        const media = {
            images: uploadedFiles.filter(file => hasExtension(file.url, IMAGE_EXTENSIONS)),
            videos: uploadedFiles.filter(file => hasExtension(file.url, VIDEO_EXTENSIONS))
        };

        const newReview = new Review({
            customerId,
            customerName,
            orderId,
            productId,
            rating,
            comment,
            media,
            merchantId
        });

        const savedReview = await newReview.save();
        res.status(201).json(savedReview);
    } catch (error) {
        console.error('Error creating review:', error);
        res.status(500).json({ message: error.message });
    }
};

exports.getReviewsByProduct = async (req, res) => {
    try {
        const reviews = await Review.find({ productId: req.params.productId });
        res.json(reviews);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};
    // Reply to a review
    exports.replyToReview = async (req, res) => {
      const { replyText } = req.body;

      try {
        const review = await Review.findById(req.params.reviewId);

        if (!review) {
          return res.status(404).json({ message: 'Review not found' });
        }

        review.reply = {
          text: replyText,
          date: new Date(),
          merchantName: req.user.name, // Assuming req.user has user info
        };

        await review.save();
        res.json(review); // Return updated review with reply
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
      }
    };

    // Update a review
    exports.updateReview = async (req, res) => {
      const { rating, comment } = req.body;

      try {
        const review = await Review.findById(req.params.reviewId);

        if (!review) {
          return res.status(404).json({ message: 'Review not found' });
        }

        if (rating) review.rating = rating;
        if (comment) review.comment = comment;

        await review.save();
        res.json(review); // Return updated review
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
      }
    };

    // Delete a review
  // controllers/reviewController.js

exports.deleteReview = async (req, res) => {
    try {
        const review = await Review.findById(req.params.reviewId);

        if (!review) {
            return res.status(404).json({ message: 'Review not found' });
        }

        // Use deleteOne instead of remove
        await Review.deleteOne({ _id: req.params.reviewId });
        res.json({ message: 'Review deleted' }); // Return success message
    } catch (error) {
        console.error('Error deleting review:', error);
        res.status(500).json({ message: 'Server error' });
    }
};


exports.getReviewsByMerchant = async (req, res) => {
  try {
      const userId = req.user.userId; // Assuming req.user contains the authenticated merchant's info
console.log(userId);
// Find the merchant associated with this user
const merchant = await Merchant.findOne({ userId: userId });

if (!merchant) {
    return res.status(404).json({ message: 'Merchant not found' });
}

// Use the merchant's ID to find reviews
const reviews = await Review.find({ merchantId: merchant._id });
res.json(reviews);
} catch (error) {
console.error('Error fetching reviews by merchant:', error);
res.status(500).json({ message: 'Server error' });
}
};
