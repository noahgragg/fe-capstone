import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './Header';
import Home from './Home';
import CreateUser from './CreateUser';
import LogIn from './LogIn';

const App = () => {
  return (
    <div className="App">
      <Header />
      <div>
        <Routes>
          <Route path='/home' element={<Home />} />
          <Route path='/create-user' element={<CreateUser />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
