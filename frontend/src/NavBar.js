import React from 'react';
import { Link } from 'react-router-dom';
import { FaHome } from 'react-icons/fa';
import Login from './LogIn.js'

const NavBar = (props) => {
  return (
        <div className='nav-bar'>
            <div className='nav-bar-home'>
                <Link id='nav-link' to='./home'><FaHome /></Link> 
            </div>
            <div className='nav-bar-login'>
                <Link id='nav-link' to='./create-user'>Create User</Link>
                <div className='spacer'>|</div>
                <Login/>
            </div>
        </div>   
  )
}

export default NavBar
