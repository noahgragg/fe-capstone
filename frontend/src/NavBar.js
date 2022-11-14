import React from 'react';
import { Link } from 'react-router-dom';
import { FaHome } from 'react-icons/fa';

const NavBar = () => {
  return (
        <div className='nav-bar'>
            <div className='nav-bar-home'>
                <Link id='nav-link' to='./home'><FaHome /></Link> 
            </div>
            <div className='nav-bar-login'>
                <Link id='nav-link' to='./create-user'>Create User</Link>
                <div className='spacer'>|</div>
                <Link id='nav-link' to='./login'>Login</Link>
            </div>
        </div>   
  )
}

export default NavBar
