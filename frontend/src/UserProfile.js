import React,{ useState, useEffect } from 'react';
import profile_img from './css/profile_img.jpg';

export const UserProfile = ({currentUserId}) => {
  const [currentUserInfo, setCurrentUserInfo] = useState([{}]);
  useEffect(()=>{
    fetch(`http://localhost:8000/api/data/${currentUserId}`)
    .then(res => res.json())
    .then(data => {
      setCurrentUserInfo(data[0])
      console.log('userInfo', data)
    })
  }, [])

  const [currentUserProjects, setCurrentUserProjects] = useState([{}]);
  useEffect(()=>{
    fetch(`http://localhost:8000/api/data/${currentUserId}/project`)
    .then(res => res.json())
    .then(projects => {
      setCurrentUserProjects(projects)
      console.log('projects', projects)
    })
  }, [])

  return (
    <div className='user-profile-container'>
      <div className='user-profile-body'>
        <div clasName='user-profile-info'>
          <div className='user-profile-name'>
            <h2>{currentUserInfo.first_name} {currentUserInfo.last_name}</h2>
          </div>
          <div className='user-profile-photo'>
            <img src={currentUserInfo.profile_image} width='200px'/>
          </div>
          <div className='user-profile-summary'>
            <p>{currentUserInfo.summary}
            </p>
          </div><br /><br />
          <div className='user-profile-linked'>
          <a className='linked-link' href='#'>LinkedIn Profile</a>
          </div>
          <div className='user-profile-resume'>
            <a className='resume-link' href='#'>View Resume</a>
          </div>
        </div>
        <div className='user-profile-projects'>
          <h1>My Projects</h1><br />
          {currentUserProjects.map(project => {
            return <Project key={project.project_id} projName={project.project_name} projDesc={project.project_desc}
              projLink={project.project_link} />
          })}
        </div>
      </div>
    </div>
  )
}

const Project = ({projName, projDesc, projLink}) => {
  return (
  <div className='project-container'>
    <div className='project-name'>
      <h2>{projName}</h2>
    </div><br />
    <div className='project-descript'>

      <p>{projDesc}. Please check out my project <a className='project-link' href={projLink}>Here</a> for more details.</p>
    </div>
  </div>
  )
}

export default UserProfile

