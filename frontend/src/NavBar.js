import React from 'react';
import { Link } from 'react-router-dom';
import { FaHome } from 'react-icons/fa';
import LogIn from './LogIn.js'
import { HiInformationCircle } from 'react-icons/hi'


const NavBar = ({loggedInUsername, setLoggedInUsername}) => {
  return (
        <div className='nav-bar'>
            <div className='nav-bar-home'>
                <Link id='nav-link' to='./home'><FaHome /></Link>&nbsp;&nbsp; 
                <Link id='nav-link' to='./about'><HiInformationCircle /></Link>
                <Link id='nav-manage-profile' to='./manage-profile'>Manage Profile</Link>
            </div>
            <div className='nav-bar-login'>
                {/* <Link id='nav-link' to='./create-user'>Create User</Link>
                <div className='spacer'>|</div> */}
                <LogIn loggedInUsername={loggedInUsername} setLoggedInUsername={setLoggedInUsername}/>
            </div>
        </div>   
  )
}

export default NavBar
