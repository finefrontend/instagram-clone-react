import React from 'react';

import { Routes, Route } from 'react-router-dom';

import './App.css';
import Home from './pages/Home';
import CreateFeedPage from './pages/CreateFeed';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/create-feed" element={<CreateFeedPage />} />
    </Routes>
  );
};

export default App;
