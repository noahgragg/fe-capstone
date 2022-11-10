import React from 'react';
import profile_img from './css/profile_img.jpg';

const ProfileCard = ({infoFName, infoLName, infoSummary}) => {
  return (
    <div className='profile-container'>
      <div className='profile-img'>
        <img src={profile_img} width='200px'/>
      </div>
      <div className='profile-name'>
        <h3>{infoFName} {infoLName}</h3>
      </div><br />
      <div className='profile-summary'>
        <p><h4 className='profile-summary-h4'>Summary:</h4>{infoSummary}</p>
      </div>
    </div>
  )
}

export default ProfileCard;

{/* <ProfileCard infoId={info.id} infoFName={info.first_name}
            infoLName={info.last_name} infoSummary={info.summary} infoResume={info.resume_link}
            infoGithub={info.github_link} /> */}