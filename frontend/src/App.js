import React, { useState, useEffect } from 'react';
// import 'bootstrap/dist/css/bootstrap.min.css';
import { Routes, Route } from 'react-router-dom';
import Header from './Header';
import NavBar from './NavBar';
import Home from './Home';
import CreateUser from './CreateUser';
import LogIn from './LogIn';
import UserProfile from './UserProfile';
import { ManageProfile } from './ManageProfile';

const url = 'http://localhost:8000';
const App = () => {

  const [loggedInUserId, setLoggedInUserId] = useState(1);
  const [currentUserId, setCurrentUserId] = useState(null);
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
          <Route path='/' element={<Home profileCardInfo={profileCardInfo} setCurrentUserId={setCurrentUserId}/>} />
          <Route path='/home' element={<Home profileCardInfo={profileCardInfo} setCurrentUserId={setCurrentUserId}/>} />
          <Route path='/create-user' element={<CreateUser />} />
          <Route path='/home/user-profile' element={<UserProfile currentUserId={currentUserId}/>} />
          <Route path='/user-profile' element={<UserProfile currentUserId={currentUserId}/>} />
          <Route path='/manage-profile' element={<ManageProfile loggedInUserId={loggedInUserId}/>} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
