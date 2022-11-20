import React from 'react';
import { Link } from 'react-router-dom';
import profile_img from './css/profile_img.jpg';
import { FaLinkedIn, FaGithub, FaLink } from 'react-icons/fa';


const ProfileCard = ({infoFName, infoLName, infoSummary, infoGithub, infoImage, infoId, setCurrentUserId}) => {

  return (
      
        <div className='profile-container'>
          <div className='profile-img'>
            <img src={infoImage != 'No Image' ? infoImage : profile_img} width='200px'/>
          </div>
          <div className='profile-name'>
            <h4>{infoFName} {infoLName}</h4>&nbsp;&nbsp;
            <a className='github' href={infoGithub}><FaGithub /></a>&nbsp;
            <a className='linkedin' href='#'><FaLinkedIn /></a>
          </div><br />
          <div className='profile-summary'>
            <div>
              <p><h4 className='profile-summary-h4'>Summary:</h4>{infoSummary}</p>
            </div>
            <div className='profile-links'>
              <Link onClick={(e)=>{setCurrentUserId(e.target.id)}} id={infoId} 
                className='profile-link' to='./user-profile'>View Profile</Link>
            </div>
          </div>
        </div>
  )
}

export default ProfileCard;

{/* <ProfileCard infoId={info.id} infoFName={info.first_name}
            infoLName={info.last_name} infoSummary={info.summary} infoResume={info.resume_link}
            infoGithub={info.github_link} /> */}