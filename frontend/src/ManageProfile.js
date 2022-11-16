import React,{ useState, useEffect } from 'react';
// import profile_img from './css/profile_img.jpg';
import { FaEdit } from 'react-icons/fa';
import UploadPhoto from './UploadPhoto';


export const ManageProfile = ({loggedInUserId}) => {
  const [manageUserInfo, setManageUserInfo] = useState([{}]);
  useEffect(()=>{
    fetch(`http://localhost:8000/api/data/${loggedInUserId}`)
    .then(res => res.json())
    .then(data => {
      setManageUserInfo(data[0])
      console.log('userInfo', data)
    })
  }, [])

  const [manageUserProjects, setManageUserProjects] = useState([{}]);
  useEffect(()=>{
    fetch(`http://localhost:8000/api/data/${loggedInUserId}/project`)
    .then(res => res.json())
    .then(projects => {
      setManageUserProjects(projects)
      console.log('projects', projects)
    })
  }, [])

  return (
    <div className='user-profile-container'>
      <div className='user-profile-body'>
        <div className='user-profile-info'>
          <div className='user-profile-name'>
            <h2>{manageUserInfo.first_name} {manageUserInfo.last_name}</h2>
          </div>
          <div className='user-profile-photo'>
            <UploadPhoto props={manageUserInfo}/>
            {/* <img src={profile_img} width='200px'/> */}
          </div>
          <div className='user-profile-summary'>
            <p>{manageUserInfo.summary}
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
          {manageUserProjects.map(proj => {
            return <ManageProject key={proj.project_id} projName={proj.project_name} projDesc={proj.project_desc}
              projLink={proj.project_link} />
          })}
        </div>
      </div>
    </div>
  )
}

const ManageProject = ({projName, projDesc, projLink}) => {
    const [openModal, setOpenModal] = useState(false);
  return (
  <div className='project-container'>
    <div className='project-name'>
      <h2 className='project-name-h2'>{projName} <FaEdit onClick={()=>{setOpenModal(!openModal)}} /></h2>
    </div><br />
    {openModal && <ProjNameModal openModal={openModal} setOpenModal={setOpenModal} />}
    <div className='project-descript'>

      <p>{projDesc}. Please check out my project <a className='project-link' href={projLink}>Here</a> for more details.</p>
    </div>
  </div>
  )
};

const ProjNameModal = ({setOpenModal, openModal}) => {
    const closeModal = (e) => {
        e.preventDefault();
        setOpenModal(!openModal)
    }

    return (
    <div className='modal-background'>
        <div className='modal-container'>
            <form>
                <div className='modal-title'>
                    <h2>Edit Project Name</h2>
                </div>
                <div className='modal-body'>
                    <input type='text' placeholder='edit project name' />
                </div>
                <div className='modal-footer'>
                    <button onClick={closeModal} type='cancel'>Cancel</button>
                    <button type='submit'>Save</button>
                </div>
            </form>
            
        </div>
    </div>
    )
}
