// pages/Upload.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaCloudUploadAlt, FaSpinner, FaMagic, FaUndo } from 'react-icons/fa';
import "../components/css/upload.css"

const Upload = () => {
  const navigate = useNavigate();
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [transformedImage, setTransformedImage] = useState(null);
  const [error, setError] = useState('');

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    
    if (selectedFile) {
      setFile(selectedFile);
      
      // Create a preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(selectedFile);
      
      // Reset any previous transformation
      setTransformedImage(null);
      setError('');
    }
  };

  const handleTransform = async () => {
    if (!file) {
      setError('Please select an image first');
      return;
    }
  
    setLoading(true);
  
    try {
      const formData = new FormData();
      formData.append('image', file);
  
      const response = await fetch('http://localhost:5000/api/transform', {
        method: 'POST',
        body: formData,
      });
  
      const data = await response.json();
  
      if (!response.ok || !data.transformedImageUrl) {
        throw new Error('Failed to transform image');
      }
  
      // ✅ Use full path to load from backend
      setTransformedImage(`http://localhost:5000${data.transformedImageUrl}`);
    } catch (error) {
      console.error('Error transforming image:', error);
      setError('Failed to transform image. Please try again.');
    } finally {
      setLoading(false);
    }
  };  

  const handleSave = async () => {
    if (!transformedImage) {
      setError('Please transform an image first');
      return;
    }
    
    setLoading(true);
    
    try {
      const formData = new FormData();
      formData.append('originalImage', file);
      formData.append('title', title);
      formData.append('description', description);
      formData.append('transformedImageUrl', transformedImage);
      
      const response = await fetch('/api/images/save', {
        method: 'POST',
        body: formData,
        credentials: 'include',
      });
      
      if (!response.ok) {
        throw new Error('Failed to save image');
      }
      
      // Redirect to gallery
      navigate('/gallery');
    } catch (error) {
      console.error('Error saving image:', error);
      setError('Failed to save image. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setFile(null);
    setPreview(null);
    setTransformedImage(null);
    setTitle('');
    setDescription('');
    setError('');
  };

  return (
    <div className="upload-container">
      <h1>Create Ghibli Art</h1>
      
      <div className="upload-workflow">
        <div className="upload-area">
          {!preview ? (
            <div 
              className="dropzone"
              onClick={() => document.getElementById('file-input').click()}
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => {
                e.preventDefault();
                handleFileChange({ target: { files: e.dataTransfer.files } });
              }}
            >
              <FaCloudUploadAlt className="upload-icon" />
              <p>Drag & drop an image here, or click to select</p>
              <input
                id="file-input"
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden-input"
              />
            </div>
          ) : (
            <div className="image-preview-container">
              <div className="image-preview">
                <img src={preview} alt="Original" />
              </div>
              <button className="reset-btn" onClick={handleReset}>
                <FaUndo /> Choose Another Image
              </button>
            </div>
          )}
        </div>
        
        {preview && !transformedImage && (
          <div className="transform-section">
            <h2>Ready to Transform</h2>
            <p>Click the button below to transform your image into Ghibli art style</p>
            <button 
              className="transform-btn" 
              onClick={handleTransform}
              disabled={loading}
            >
              {loading ? (
                <>
                  <FaSpinner className="spinner" /> Transforming...
                </>
              ) : (
                <>
                  <FaMagic /> Transform to Ghibli Style
                </>
              )}
            </button>
          </div>
        )}
        
        {transformedImage && (
          <div className="result-section">
            <h2>Transformation Complete!</h2>
            <div className="result-comparison">
              <div className="original-side">
                <h3>Original</h3>
                <img src={preview} alt="Original" />
              </div>
              <div className="transformed-side">
                <h3>Ghibli Style</h3>
                <img src={transformedImage} alt="Ghibli Style" />
              </div>
            </div>
            
            <div className="save-form">
              <h3>Save Your Creation</h3>
              <div className="form-group">
                <label htmlFor="title">Title</label>
                <input
                  type="text"
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Give your artwork a name"
                />
              </div>
              <div className="form-group">
                <label htmlFor="description">Description (optional)</label>
                <textarea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Add a description"
                  rows={3}
                />
              </div>
              <div className="save-actions">
                <button 
                  className="save-btn"
                  onClick={handleSave}
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <FaSpinner className="spinner" /> Saving...
                    </>
                  ) : (
                    'Save to Gallery'
                  )}
                </button>
                <a 
                  href={transformedImage} 
                  download="ghibli-art.jpg"
                  className="download-btn"
                >
                  Download Image
                </a>
              </div>
            </div>
          </div>
        )}
        
        {error && <div className="error-message">{error}</div>}
      </div>
    </div>
  );
};

export default Upload;