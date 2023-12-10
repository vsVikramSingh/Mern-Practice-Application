// src/Login.js
import React, { useState } from 'react';
import axios from 'axios';
import './login.css';

const Login = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Make a POST request to the login API
      const response = await axios.post('http://localhost:5000/api/login', formData);
      
      // Assuming the API returns a token upon successful login
      const { token } = response.data;
      
      // Do something with the token, such as storing it in local storage or state
      console.log('Login successful. Token:', token);
    } catch (error) {
      console.error('Login failed:', error.response?.data?.error || 'Unknown error');
    }
  };

  return (
    <div className="login-container">
      <h2>Login Form</h2>
      <form onSubmit={handleSubmit} className="login-form">
        <div className="form-group">
          <label>Username:</label>
          <input type="text" name="username" value={formData.username} onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label>Password:</label>
          <input type="password" name="password" value={formData.password} onChange={handleChange} required />
        </div>

        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
