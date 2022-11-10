import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './Header';
import Home from './Home';
import CreateUser from './CreateUser';
import LogIn from './LogIn';

const App = () => {
  const [profileCardInfo, setProfileCardInfo] = useState([{}]);
  useEffect(() => {
      fetch('/api/data')
      .then(res => res.json())
      .then((data) => console.log("data from fetch:",data))
      // console.log(profileCardInfo);
  }, [])

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
