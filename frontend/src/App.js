import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './Header';
import Home from './Home';
import CreateUser from './CreateUser';
import LogIn from './LogIn';

const url = 'http://localhost:8000';
const App = () => {
  const [profileCardInfo, setProfileCardInfo] = useState([{
    user_id: 0,
    username: '',
    first_name: '',
    last_name: '',
    summary: '',
    resume_link: '',
    github_link: ''
  }]);
  useEffect(() => {
      fetch(`${url}/`)
      .then(res => res.json())
      .then((data) => setProfileCardInfo(data)) 
      console.log(profileCardInfo); 
  }, [])

  return (
    <div className="App">
      <Header />
      <div className='below-header'></div>
      <div>
        <Routes>
          <Route path='/home' element={<Home profileCardInfo={profileCardInfo}/>} />
          <Route path='/create-user' element={<CreateUser />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
