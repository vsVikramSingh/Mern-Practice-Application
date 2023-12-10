import React, { useState } from 'react';
import axios from 'axios';
import Alert from '../alert/alert'; // Import the Alert component
import './login.css';

const Login = () => {
  const initialFormData = {
    username: '',
    password: '',
  };

  const [formData, setFormData] = useState(initialFormData);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [showAlert, setShowAlert] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/api/login', formData);
      const { token } = response.data;
      console.log('Login successful. Token:', token);
      setSuccessMessage('User login successfully');
      setErrorMessage('');
      setFormData(initialFormData); // Reset the form data
      setShowAlert(true);
    } catch (error) {
      console.error('Login failed:', error.response?.data?.error || 'Unknown error');
      setErrorMessage(error.response?.data?.error || 'Unknown error');
      setShowAlert(true);
    }
  };

  const closeAlert = () => {
    setShowAlert(false);
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

        {showAlert && (
          <Alert message={successMessage || errorMessage} onClose={closeAlert} />
        )}

        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
