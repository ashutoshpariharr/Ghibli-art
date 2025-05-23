import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaPaintBrush, FaImage, FaUpload, FaSignInAlt, FaUserPlus, FaSignOutAlt, FaBars, FaTimes } from 'react-icons/fa';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-row">
          {/* Logo and brand */}
          <div className="navbar-logo">
            <Link to="/" className="logo-link">
              <FaPaintBrush className="logo-icon" />
              <span className="logo-text">Ghibli Art</span>
            </Link>
          </div>

          {/* Desktop menu */}
          <div className="navbar-menu">
            <Link to="/" className="menu-item">
              Home
            </Link>
            <Link to="/gallery" className="menu-item">
              <FaImage className="menu-icon" /> Gallery
            </Link>
            <Link to="/upload" className="menu-item">
              <FaUpload className="menu-icon" /> Upload
            </Link>

            {/* User section */}
            <div className="user-section">
              <span className="user-greeting">Hello Ashutosh</span>
            </div>

            {/* Auth buttons - would normally be conditionally rendered */}
            <div className="auth-buttons" style={{ display: 'none' }}>
              <Link to="/login" className="login-button">
                <FaSignInAlt className="button-icon" /> Login
              </Link>
              <Link to="/register" className="register-button">
                <FaUserPlus className="button-icon" /> Register
              </Link>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="mobile-menu-toggle">
            <button className="toggle-button" onClick={toggleMenu}>
              {menuOpen ? <FaTimes className="toggle-icon" /> : <FaBars className="toggle-icon" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`mobile-menu ${menuOpen ? 'open' : ''}`}>
        <div className="mobile-menu-container">
          <Link to="/" className="mobile-menu-item" onClick={() => setMenuOpen(false)}>
            Home
          </Link>
          <Link to="/gallery" className="mobile-menu-item" onClick={() => setMenuOpen(false)}>
            <FaImage className="mobile-menu-icon" /> Gallery
          </Link>
          <Link to="/upload" className="mobile-menu-item" onClick={() => setMenuOpen(false)}>
            <FaUpload className="mobile-menu-icon" /> Upload
          </Link>

          <div className="mobile-user-section">
            <div className="mobile-user-greeting">Hello Ashutosh</div>
            {/* <button className="mobile-logout-button">
              <FaSignOutAlt className="mobile-button-icon" /> Logout
            </button> */}

            {/* Auth buttons - would normally be conditionally rendered */}
            <div className="mobile-auth-buttons" style={{ display: 'none' }}>
              <Link to="/login" className="mobile-login-button" onClick={() => setMenuOpen(false)}>
                <FaSignInAlt className="mobile-button-icon" /> Login
              </Link>
              <Link to="/register" className="mobile-register-button" onClick={() => setMenuOpen(false)}>
                <FaUserPlus className="mobile-button-icon" /> Register
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
