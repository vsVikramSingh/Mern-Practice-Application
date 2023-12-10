import React, { useState } from 'react';
import axios from 'axios';
import Alert from '../alert/alert'
import './register.css';

const Register = () => {
  const initialFormData = {
    username: '',
    password: '',
    email: '',
    age: '',
    gender: '',
    dateofbirth: '',
    maritalstatus: '',
    fathername: '',
    mothername: '',
    city: '',
    state: '',
    country: '',
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
      await axios.post('http://localhost:5000/api/register', formData);
      setSuccessMessage('User registered successfully');
      setErrorMessage('');
      setFormData(initialFormData); // Reset the form data
      setShowAlert(true);
    } catch (error) {
      console.error('Registration failed:', error.response?.data?.error || 'Unknown error');
      setErrorMessage(error.response?.data?.error || 'Unknown error');
      setSuccessMessage('');
      setShowAlert(true);
    }
  };

  const closeAlert = () => {
    setShowAlert(false);
  };


  return (
    <div className="register-container">
      <h2>Registration Form</h2>
      <form onSubmit={handleSubmit} className="register-form">
        <div className="form-group">
          <label>Username:</label>
          <input type="text" name="username" value={formData.username} onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label>Password:</label>
          <input type="password" name="password" value={formData.password} onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label>Email:</label>
          <input type="email" name="email" value={formData.email} onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label>Age:</label>
          <input type="number" name="age" value={formData.age} onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label>Gender:</label>
          <div>
            <label>
              <input type="radio" name="gender" value="male" checked={formData.gender === 'male'} onChange={handleChange} />Male
            </label>
            <label>
              <input type="radio" name="gender" value="female" checked={formData.gender === 'female'} onChange={handleChange} />Female
            </label>
            <label>
              <input type="radio" name="gender" value="other" checked={formData.gender === 'other'} onChange={handleChange} />Other
            </label>
          </div>
        </div>

        <div className="form-group">
          <label>Date of Birth:</label>
          <input type="date" name="dateofbirth" value={formData.dateofbirth} onChange={handleChange} required />
        </div>

        <div className="form-group">
        <label>Marital Status:</label>
          <div>
            <label>
              <input type="radio" name="maritalstatus" value="single" checked={formData.maritalstatus === 'single'} onChange={handleChange} />Single
            </label>
            <label>
              <input type="radio" name="maritalstatus" value="married" checked={formData.maritalstatus === 'married'} onChange={handleChange} />Married
            </label>
            <label>
              <input type="radio" name="maritalstatus" value="divorced" checked={formData.maritalstatus === 'divorced'} onChange={handleChange} />Divorced
            </label>
            </div>
        </div>

        <div className="form-group">
          <label>Father's Name:</label>
          <input type="text" name="fathername" value={formData.fathername} onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label>Mother's Name:</label>
          <input type="text" name="mothername" value={formData.mothername} onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label>City:</label>
          <input type="text" name="city" value={formData.city} onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label>State:</label>
          <input type="text" name="state" value={formData.state} onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label>Country:</label>
          <input type="text" name="country" value={formData.country} onChange={handleChange} required />
        </div>

        {showAlert && (
          <Alert message={successMessage || errorMessage} onClose={closeAlert} />
        )}

        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;
