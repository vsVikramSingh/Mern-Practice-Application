// src/components/Navbar.js
import React from 'react';
import './navbar.css';

const Navbar = ({ onPageChange }) => {
  const handlePageChange = (page) => {
    onPageChange(page);
  };

  return (
    <nav className="navbar">
      <ul>
        <li onClick={() => handlePageChange('home')}>Home</li>
        <li onClick={() => handlePageChange('about')}>About</li>
        <li onClick={() => handlePageChange('contact')}>Contact</li>
      </ul>
      <div className="auth-links">
        <span className="signup-link" onClick={() => handlePageChange('register')}>
          Sign Up
        </span>
        <span className="login-link" onClick={() => handlePageChange('login')}>
          Login
        </span>
      </div>
    </nav>
  );
};

export default Navbar;
