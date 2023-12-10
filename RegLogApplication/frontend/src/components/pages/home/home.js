// src/components/Home.js
import React from 'react';
import Header from './header/header';
import Navbar from './navbar/navbar';
import Footer from './footer/footer';
import Register from '../register/register';
import Login from '../login/login';
import './home.css';

const Home = ({ currentPage, onPageChange }) => {
  return (
    <div className="home">
      <Header />
      <Navbar onPageChange={onPageChange} />
      {currentPage === 'home' && <h2>Welcome to Your App</h2>}
      {currentPage === 'register' && <Register/>}
      {currentPage === 'login' && <Login/>}
      <Footer />
    </div>
  );
};

export default Home;
