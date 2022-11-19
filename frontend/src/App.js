import React, { useState, useEffect } from 'react';
// import 'bootstrap/dist/css/bootstrap.min.css';
import { Routes, Route } from 'react-router-dom';
import Header from './Header';
import NavBar from './NavBar';
import Home from './Home';
import CreateUser from './CreateUser';
import UserProfile from './UserProfile';
import { ManageProfile } from './ManageProfile';
import AboutSite from './AboutSite';
const App = () => {
  const [loggedInUsername, setLoggedInUsername] = useState('');
  console.log('logged in User: ', loggedInUsername);
  const [loggedInUserId, setLoggedInUserId] = useState('');
  console.log('logged in UserId:',loggedInUserId );
  const [currentUserId, setCurrentUserId] = useState(null);
  const [profileCardInfo, setProfileCardInfo] = useState([{
    user_id: 0,
    username: '',
    first_name: '',
    last_name: '',
    summary: '',
    linkedIn_link: '',
    github_link: '',
    profile_image: ''
  }]);
  useEffect(() => {
      fetch('https://dataserverapi.onrender.com/api/data')
      .then(res => res.json())
      .then((data) => setProfileCardInfo(data))
      .then(console.log(process.env.DATA_URL))
  }, [])

  // useEffect(() => {
  //   fetch
  // })

  return (
    <div className="App">
      <NavBar loggedInUsername={loggedInUsername} setLoggedInUsername={setLoggedInUsername} loggedInUserId={loggedInUserId} setLoggedInUserId={setLoggedInUserId}/>
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
          <Route path='/about' element={<AboutSite />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
