// src/App.js
import React, { useState } from 'react';
import Home from './components/pages/home/home';
import './App.css';

const App = () => {
  const [currentPage, setCurrentPage] = useState('home');

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="app">
      <Home currentPage={currentPage} onPageChange={handlePageChange} />
    </div>
  );
};

export default App;
