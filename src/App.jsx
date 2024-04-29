import React, { useState, useRef } from 'react';
import './App.css';
import UserPage from './UserPage';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLog from './components/login/MainLog';
import Contact from './components/contact/Contact';
import UserNav from './components/navbar/UserNav';
function App() {
  
  return (
    <BrowserRouter>
      <Routes>
          <Route path="/" element={<MainLog/>}/>
          <Route path="/login" element={<MainLog />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/user" element={<UserPage />} />
          <Route path="*" element={<h1 className='text-white'>Page NOt Found</h1>} />
        
      </Routes>
    </BrowserRouter>
  );
}

export default App;
