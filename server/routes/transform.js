const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const axios = require('axios');
const FormData = require('form-data');
require('dotenv').config();
const Replicate = require("replicate");

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
    cb(null, 'original-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit
  fileFilter: (req, file, cb) => {
    // Accept only image files
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed!'), false);
    }
  }
});

// Transform endpoint
router.post('/transform', upload.single('image'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No image file uploaded' });
    }

    // Get the uploaded file path
    const imagePath = req.file.path;
    const outputFileName = 'ghibli-' + path.basename(req.file.filename);
    const outputPath = path.join(__dirname, '../uploads', outputFileName);

    // Create a form data for the API request
    const formData = new FormData();
    formData.append('image', fs.createReadStream(imagePath));
    const response = await callGhibliStyleTransferAPI(imagePath, outputPath);

    // Construct the URL to access the transformed image
    const transformedImageUrl = `/uploads/${outputFileName}`;

    res.json({
      success: true,
      transformedImageUrl: transformedImageUrl
    });
  } catch (error) {
    console.error('Error in transform endpoint:', error);
    res.status(500).json({ error: 'Failed to transform image' });
  }
});

const replicate = new Replicate({
  auth: "r8_BDx5NG2ucCMkYfdnmBRtuPQDMt0QqKS2mRGtt"
});

async function callGhibliStyleTransferAPI(inputPath, outputPath) {
  try {
    const base64 = fs.readFileSync(inputPath, { encoding: 'base64' });
    const dataUrl = `data:image/jpeg;base64,${base64}`;

    const output = await replicate.run(
      "fofr/ghibli-diffusion:3c22c108b7cd3a6fcce289f1b2ed8dbb7c9210257d20c2bdf59e206292cd2d80", // Ghibli-style model
      {
        input: {
          image: dataUrl,
          prompt: "Studio Ghibli style"
        }
      }
    );

    const imageUrl = output; // It should be a direct URL
    const response = await axios.get(imageUrl, { responseType: "arraybuffer" });
    fs.writeFileSync(outputPath, response.data);

    return { success: true };
  } catch (err) {
    console.error("Error using Replicate:", err.response?.data || err.message);
    throw new Error("Failed to transform image.");
  }
}


module.exports = router;