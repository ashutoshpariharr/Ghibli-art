import React, { useState } from 'react';
import { Camera, Heart, Share2, Award, ArrowRight, Upload, Image } from 'lucide-react';
import { Link } from 'react-router-dom';
import Footer from './Footer';
import Img from "../assets/pf.png";
import Img2 from "../assets/real.png"

const Home = () => {
  // State for hover effects and interactions
  const [activeFeature, setActiveFeature] = useState(null);
  const [activePreview, setActivePreview] = useState(null);

  // Sample images for the before/after previews with Unsplash dummy images
  const previews = [
    {
      id: 1,
      title: "Countryside to Ghibli Landscape",
      before: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      after: `${Img}`
    },
    {
      id: 2,
      title: "Portrait to Ghibli Character",
      before: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80",
      after: "https://images.unsplash.com/photo-1536250853075-e8504ee040b9?ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80"
    },
    {
      id: 3,
      title: "City to Ghibli Townscape",
      before: "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      after: "https://images.unsplash.com/photo-1560807707-8cc77767d783?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
    },
    {
      id: 4,
      title: "City to Ghibli Townscape",
      before: "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      after: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
    }
  ];

  return (
    <div className="home-container">
      {/* Hero Section with Animation */}
      <div className="hero-section"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1475274047050-1d0c0975c63e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80')",
        }}>
        <div className="hero-content">
          <h1 className="hero-title">
            Transform Your Photos Into Ghibli Art
          </h1>
          <p className="hero-description">
            Upload your images and watch them transform into beautiful Ghibli-style artwork
          </p>

          <div className="cta-buttons">
            <Link to="/upload">
              <button
                className="cta-button primary"
                onMouseEnter={() => setActiveFeature('create')}
                onMouseLeave={() => setActiveFeature(null)}
              >
                <Upload className="btn-icon" />
                Start Creating
                {activeFeature === 'create' && (
                  <ArrowRight className="arrow-icon" />
                )}
              </button>
            </Link>
            <Link to="https://ashutosh.icu" target="_blank">
              <button
                className="cta-button secondary"
                onMouseEnter={() => setActiveFeature('gallery')}
                onMouseLeave={() => setActiveFeature(null)}
              >
                <Image className="btn-icon" />
                About Me
                {activeFeature === 'gallery' && (
                  <ArrowRight className="arrow-icon" />
                )}
              </button>
            </Link>
          </div>
        </div>
      </div>

      {/* Featured Transformations */}
      <div className="gallery-section">
        <div className="gallery-content">
          <h2 className="section-title">Featured Transformations</h2>
          <div className="gallery-grid">
            {previews.map((preview) => (
              <div
                key={preview.id}
                className={`gallery-card ${activePreview === preview.id ? 'active' : ''}`}
                onMouseEnter={() => setActivePreview(preview.id)}
                onMouseLeave={() => setActivePreview(null)}
              >
                <div className="image-container">
                  {/* This creates a before/after slider effect when hovering */}
                  <div
                    className="before-image"
                    style={{
                      clipPath: `inset(0 ${activePreview === preview.id ? '50%' : '0'} 0 0)`,
                      backgroundImage: `url(${preview.before})`
                    }}
                  ></div>
                  <div
                    className="after-image"
                    style={{
                      backgroundImage: `url(${preview.after})`
                    }}
                  ></div>

                  {/* Before/After labels */}
                  {activePreview === preview.id && (
                    <>
                      <div className="image-label before-label">
                        Original
                      </div>
                      <div className="image-label after-label">
                        Ghibli Style
                      </div>
                    </>
                  )}
                </div>
                <div className="gallery-card-content">
                  <h3 className="gallery-card-title">{preview.title}</h3>
                  <div className="gallery-card-footer">
                    <div className="like-counter">
                      <Heart className="heart-icon" />
                      <span>{112 + preview.id * 11}</span>
                    </div>
                    <button className="view-button">
                      View Full
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="flex flex-col min-h-screen">
        <Footer />
      </div>

    </div>
  );
};

export default Home;