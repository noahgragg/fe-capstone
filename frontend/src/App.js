import React, { useState, useEffect } from 'react';
// import 'bootstrap/dist/css/bootstrap.min.css';
import { Routes, Route } from 'react-router-dom';
import Header from './Header';
import NavBar from './NavBar';
import Home from './Home';
import CreateUser from './CreateUser';
import UserProfile from './UserProfile';
import LogIn from './LogIn';
import { ManageProfile } from './ManageProfile';
import AboutSite from './AboutSite';
const App = () => {
  const dataURL = 'https://dataserverapi.onrender.com'
  var initialState = localStorage.getItem('loggedInUserId') ? localStorage.getItem('loggedInUserId') : '';
  const [loggedInUsername, setLoggedInUsername] = useState('');
  console.log('logged in User: ', loggedInUsername);
  const [loggedInUserId, setLoggedInUserId] = useState(initialState);
  console.log('logged in UserId:',loggedInUserId );
  const [currentUserId, setCurrentUserId] = useState(null);
  const [profileCardInfo, setProfileCardInfo] = useState([{
    user_id: 0,
    username: '',
    first_name: '',
    last_name: '',
    summary: '',
    linkedin_link: '',
    github_link: '',
    profile_image: ''
  }]);
  const [keys, setKeys] = useState({
    s3AccessKey: '',
    s3SecretKey: '',
    bucketURL: '',
    authURL: '',
    dataURL: dataURL
  })
  useEffect(() => {
      fetch(`${dataURL}/api/data`)
      .then(res => res.json())
      .then((data) => setProfileCardInfo(data))
  }, [])
  useEffect(()=>{
    fetch(`${dataURL}/keys`)
      .then(res => res.json())
      .then((results) => setKeys(results))
  }, [])

  // useEffect(() => {
  //   fetch
  // })

  return (
    <div className="App">
      <NavBar loggedInUsername={loggedInUsername} setLoggedInUsername={setLoggedInUsername} loggedInUserId={loggedInUserId} setLoggedInUserId={setLoggedInUserId} keys={keys}/>
      <Header />
      <div className='below-header'></div>
      <div>
        <Routes>
          <Route path='/' element={<Home profileCardInfo={profileCardInfo} setCurrentUserId={setCurrentUserId}/>} />
          <Route path='/home' element={<Home profileCardInfo={profileCardInfo} setCurrentUserId={setCurrentUserId}/>} />
          <Route path='/create-user' element={<CreateUser keys={keys}/>} />
          <Route path='/home/user-profile' element={<UserProfile currentUserId={currentUserId} keys={keys}/>} />
          <Route path='/user-profile' element={<UserProfile currentUserId={currentUserId} keys={keys}/>} />
          <Route path='/manage-profile' element={<ManageProfile loggedInUserId={loggedInUserId} keys={keys}/>} />
          <Route path='/about' element={<AboutSite />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
