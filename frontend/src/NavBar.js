import React from 'react';
import { Link } from 'react-router-dom';
import { FaHome } from 'react-icons/fa';
import LogIn from './LogIn.js'
import { HiInformationCircle } from 'react-icons/hi'


const NavBar = () => {
  return (
        <div className='nav-bar'>
            <div className='nav-bar-home'>
                <Link id='nav-link' to='./home'><FaHome /></Link>
                <Link id='nav-link' to='./about'><HiInformationCircle /></Link>
            </div>
            <div className='nav-bar-login'>
                <Link id='nav-link' to='./create-user'>Create User</Link>
                <div className='spacer'>|</div>
                <LogIn/>
            </div>
        </div>   
  )
}

export default NavBar
