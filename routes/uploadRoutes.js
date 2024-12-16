const express = require('express');
const multer = require('multer');
const { handleFileUpload } = require('../controllers/uploadController');

const upload = multer({ storage: multer.memoryStorage() });

const router = express.Router();

router.post('/upload', upload.fields([{ name: 'images', maxCount: 4 }, { name: 'videos', maxCount: 2 }]), handleFileUpload);

module.exports = router;
