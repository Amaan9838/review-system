const { uploadFileToS3 } = require('../services/s3Service');

exports.handleFileUpload = async (req, res, next) => {
    try {
        if (!req.files) {
            return res.status(400).json({ message: 'No files uploaded' });
        }

        const uploadedFiles = [];
        const fileUploadPromises = [];

        if (req.files.images) {
            req.files.images.forEach(file => {
                fileUploadPromises.push(uploadFileToS3(file).then(url => {
                    uploadedFiles.push({ url, key: file.key });
                }));
            });
        }

        if (req.files.videos) {
            req.files.videos.forEach(file => {
                fileUploadPromises.push(uploadFileToS3(file).then(url => {
                    uploadedFiles.push({ url, key: file.key });
                }));
            });
        }

        await Promise.all(fileUploadPromises);

        // Attach uploaded files to the request object for further processing
        req.uploadedFiles = uploadedFiles;
        next(); // Call the next middleware or controller
    } catch (error) {
        console.error('Error uploading files:', error);
        res.status(500).json({ message: 'File upload failed', error: error.message });
    }
};
