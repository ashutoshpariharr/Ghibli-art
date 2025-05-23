import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaHeart, FaDownload, FaShare, FaSpinner } from 'react-icons/fa';
import "../components/css/gallery.css"

const Gallery = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all'); // all, recent, popular

  useEffect(() => {
    const fetchImages = async () => {
      try {
        // Modified endpoints without authentication requirements
        const endpoint = filter === 'popular' 
          ? '/api/images/popular'
          : filter === 'recent'
            ? '/api/images/recent'
            : '/api/images';
            
        const response = await fetch(endpoint);
        if (response.ok) {
          const data = await response.json();
          setImages(data);
        }
      } catch (error) {
        console.error('Error fetching images:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchImages();
  }, [filter]);

  const handleLike = async (imageId) => {
    try {
      const response = await fetch(`/api/images/${imageId}/like`, {
        method: 'POST',
      });
      
      if (response.ok) {
        // Update the image likes in state
        setImages(images.map(img => 
          img._id === imageId 
            ? { ...img, likes: img.likes + 1, isLiked: true } 
            : img
        ));
      }
    } catch (error) {
      console.error('Error liking image:', error);
    }
  };

  return (
    <div className="gallery-container">
      <h1>Ghibli Art Gallery</h1>
        <div className="gallery-filters">
          <button 
            className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
            onClick={() => setFilter('all')}
          >
            All Artwork
          </button>
          <button 
            className={`filter-btn ${filter === 'recent' ? 'active' : ''}`}
            onClick={() => setFilter('recent')}
          >
            Recently Added
          </button>
          <button 
            className={`filter-btn ${filter === 'popular' ? 'active' : ''}`}
            onClick={() => setFilter('popular')}
          >
            Most Popular
          </button>
        </div>
      
      {loading ? (
        <div className="loading-spinner">
          <FaSpinner className="spinner" />
          <p>Loading gallery...</p>
        </div>
      ) : images.length === 0 ? (
        <div className="empty-gallery">
          <p>No images found in this category.</p>
          <Link to="/upload" className="login-prompt">
            Create your own Ghibli art
          </Link>
        </div>
      ) : (
        <div className="gallery-grid">
          {images.map(image => (
            <div key={image._id} className="gallery-item">
              <div className="image-container">
                <img src={image.ghibliImageUrl} alt={image.title || 'Ghibli artwork'} />
              </div>
              <div className="image-overlay">
                <div className="image-info">
                  <h3>{image.title || 'Untitled'}</h3>
                  <p>By {image.user.username}</p>
                </div>
                <div className="image-actions">
                  <button 
                    className={`like-btn ${image.isLiked ? 'liked' : ''}`}
                    onClick={() => handleLike(image._id)}
                  >
                    <FaHeart /> <span>{image.likes}</span>
                  </button>
                  <a 
                    href={image.ghibliImageUrl} 
                    download={`ghibli-art-${image._id}.jpg`}
                    className="download-btn"
                  >
                    <FaDownload />
                  </a>
                  <button className="share-btn">
                    <FaShare />
                  </button>
                </div>
              </div>
              <div className="comparison-toggle">
                <input type="checkbox" id={`comparison-${image._id}`} className="toggle-checkbox" />
                <label htmlFor={`comparison-${image._id}`} className="toggle-label">
                  View Original
                </label>
                <div className="original-image">
                  <img src={image.originalImageUrl} alt="Original" />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Gallery;