// models/Review.js
const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
    customerId: { type: String, required: true },
    customerName: { type: String, required: true },
    orderId: { type: String, required: true },
    productId: { type: String, required: true },
    rating: { type: Number, required: true },
    comment: { type: String, required: true },
    media: {
        images: [{ 
            url: String,
            key: String
        }],
        videos: [{
            url: String,
            key: String
        }]
    },
    reply: {
      text: String,
      date: Date,
      merchantName: String,
    },
    date: { type: Date, default: Date.now }
});

// Add validation for media count
reviewSchema.path('media.images').validate(function(images) {
    return images.length <= 4;
}, 'Maximum 4 images allowed per review');

reviewSchema.path('media.videos').validate(function(videos) {
    return videos.length <= 2;
}, 'Maximum 2 videos allowed per review');

module.exports = mongoose.model('Review', reviewSchema);
