import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <div className='header-container'>
        <div className='nav-bar'>
            <div className='nav-bar-home'>
                <Link id='nav-link' to='./home'>Home</Link> 
            </div>
            <div className='nav-bar-login'>
                <Link id='nav-link' to='./create-user'>Create User</Link>
                <Link id='nav-link' to='./login'>Login</Link>
            </div>
        </div>
        
    </div>
  )
}

export default Header
