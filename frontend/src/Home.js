import React from 'react';
import ProfileCard from './ProfileCard';

const Home = ({profileCardInfo, setCurrentUserId}) => {
  
  return (
    <div className='home-container'>
        <div className='home-body'>
            <div className='h1-div'>
              <h1 className='home-body-h1-1'>Meet your next&nbsp;</h1><h1 className='home-body-h1-2'>Software Engineer</h1>
            </div>

            {/* <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Tempora itaque 
                cupiditate velit. Non neque quibusdam nihil totam corrupti porro nam eveniet
                nemo mollitia autem. Dicta ab vel veritatis pariatur numquam blanditiis 
                minus, est hic necessitatibus fugiat quam saepe enim molestias repellat 
                omnis unde debitis quia ea, rem cupiditate sapiente. Deserunt.
            </p><br /> */}
       
            <div className='profile-card-container'>
              {profileCardInfo.map(info => {
                 return <ProfileCard infoId={info.user_id} infoFName={info.first_name}
                    infoLName={info.last_name} infoSummary={info.summary} infolinkedin={info.linkedin_link}
                    infoGithub={info.github_link} setCurrentUserId={setCurrentUserId}
                    infoImage={info.profile_image} />
              })}
            </div>
        </div>

        
    </div>
  )
}

export default Home
