import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './Header';
import NavBar from './NavBar';
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
      fetch(`${url}/api/data`)
      .then(res => res.json())
      .then((data) => setProfileCardInfo(data)) 
      .then(console.log(profileCardInfo)); 

  
  }, [])

  return (
    <div className="App">
      <NavBar />
      <Header />
      <div className='below-header'></div>
      <div>
        <Routes>
        <Route path='/' element={<Home profileCardInfo={profileCardInfo}/>} />
          <Route path='/home' element={<Home profileCardInfo={profileCardInfo}/>} />
          <Route path='/create-user' element={<CreateUser />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
