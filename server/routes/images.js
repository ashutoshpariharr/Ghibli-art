// server/routes/images.js
const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Configure multer for image upload
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadDir = path.join(__dirname, '../uploads');
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({ 
  storage: storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed!'), false);
    }
  }
});

// Save transformed image endpoint
router.post('/save', upload.single('originalImage'), async (req, res) => {
  try {
    // Get the data from the request
    const { title, description, transformedImageUrl } = req.body;
    
    if (!title || !transformedImageUrl) {
      return res.status(400).json({ error: 'Title and transformed image URL are required' });
    }
    
    // Extract the file name from the URL
    const transformedFileName = path.basename(transformedImageUrl);
    const transformedFilePath = path.join(__dirname, '../uploads', transformedFileName);
    
    // Check if transformed file exists
    if (!fs.existsSync(transformedFilePath)) {
      return res.status(404).json({ error: 'Transformed image not found' });
    }
    
    // Get user ID from authenticated session (implement based on your auth system)
    const userId = req.user ? req.user.id : 'anonymous';
    
    const newImageData = {
      userId,
      title,
      description,
      originalImagePath: req.file ? req.file.path : null,
      transformedImagePath: transformedFilePath,
      transformedImageUrl,
      createdAt: new Date()
    };
    
    console.log('Saving image data:', newImageData);
    
    res.status(201).json({
      success: true,
      message: 'Image saved successfully',
      imageData: {
        id: 'generated-id',
        title,
        description,
        transformedImageUrl
      }
    });
  } catch (error) {
    console.error('Error saving image:', error);
    res.status(500).json({ error: 'Failed to save image' });
  }
});

// Get all images (for gallery)
router.get('/', async (req, res) => {
  try {
    res.json({
      success: true,
      images: [
        {
          id: 'sample-1',
          title: 'Sample Ghibli Art 1',
          description: 'A beautiful landscape transformed into Ghibli style',
          transformedImageUrl: '/uploads/ghibli-sample-1.jpg',
          createdAt: new Date()
        }
      ]
    });
  } catch (error) {
    console.error('Error fetching images:', error);
    res.status(500).json({ error: 'Failed to fetch images' });
  }
});

module.exports = router;
