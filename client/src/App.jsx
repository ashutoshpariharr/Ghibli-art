// App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Gallery from './pages/Gallery';
import Upload from './pages/Upload';
import Login from './pages/Login';
import Register from './pages/Register';
import './App.css';

const App = () => {

  return (
    <Router>
      <div className="app">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route 
            path="/gallery" 
            element={<Gallery />} 
          />
          <Route 
            path="/upload" 
            element={<Upload />} 
          />
          <Route 
            path="/login" 
            element={<Login />} 
          />
          <Route path="/register" element={<Register />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;