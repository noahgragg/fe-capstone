import React,{ useState, useEffect } from 'react';
// import profile_img from './css/profile_img.jpg';
import { FaEdit, FaRegPlusSquare } from 'react-icons/fa';
import UploadPhoto from './UploadPhoto';
import AddProject from './AddProject';


export const ManageProfile = ({loggedInUserId}) => {
    const [openUserInfoModal, setOpenUserInfoModal] = useState(false);
    const [openAddProj, setOpenAddProj] = useState(false);
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
            <h2>{manageUserInfo.first_name} {manageUserInfo.last_name} <FaEdit id='edit-icon' onClick={()=>{setOpenUserInfoModal(!openUserInfoModal)}}/></h2>
          </div>
          <div className='user-profile-photo'>
            <UploadPhoto props={manageUserInfo}/>
            {/* <img src={profile_img} width='200px'/> */}
            <h3>***Click on photo to edit***</h3>
          </div>
          {openUserInfoModal && <UserInfoModal openUserInfoModal={openUserInfoModal} setOpenUserInfoModal={setOpenUserInfoModal} manageUserInfo={manageUserInfo} loggedInUserId={loggedInUserId} />}
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
            return <ManageProject projId={proj.project_id} projName={proj.project_name} projDesc={proj.project_desc}
              projLink={proj.project_link} userId={proj.user_id} />
          })}
            <div className='add-project-icon'>
                {openAddProj && <AddProject loggedInUserId={loggedInUserId} openAddProj={openAddProj} setOpenAddProj={setOpenAddProj} />}
                <FaRegPlusSquare onClick={()=>{setOpenAddProj(!openAddProj)}}/> Add Project
            </div>
        </div>
      </div>
    </div>
  )
}

const ManageProject = ({projName, projDesc, projLink, projId}) => {
    const [openProjModal, setOpenProjModal] = useState(false);
  return (
  <div className='project-container'>
    <div className='project-name'>
      <h2 className='project-name-h2'>{projName} <FaEdit id='edit-icon' onClick={()=>{setOpenProjModal(!openProjModal)}} /></h2>
    </div><br />
    {openProjModal && <ProjModal projId={projId} projName={projName} projDesc={projDesc} projLink={projLink} openProjModal={openProjModal} setOpenProjModal={setOpenProjModal} />}
    <div className='project-descript'>

      <p>{projDesc}. Please check out my project <a className='project-link' href={projLink}>Here</a> for more details.</p>
    </div>
  </div>
  )
};

const ProjModal = ({setOpenProjModal, openProjModal, projName, projDesc, projLink, projId}) => {
    const [manageProjData, setManageProjData] = useState({
        project_name: projName,
        project_desc: projDesc,
        project_link: projLink
    })
    
    const recordProfileData = (e) => {
        setManageProjData({...manageProjData, [e.target.name]: e.target.value})
        console.log('project name:', manageProjData.project_name)
    }
    const editProjectInfo = () => {
        fetch(`http://localhost:8000/api/project/${projId}`, {
            method: 'PATCH',
            mode: 'cors', 
            headers: {
                'Content-Type': 'application/json',
                'authorization': `Bearer ${localStorage.getItem("userAccessToken")}`
            },
            body: JSON.stringify({
                project_name: manageProjData.project_name,
                project_desc: manageProjData.project_desc,
                project_link: manageProjData.project_link
            })
        })
        .then(res => res.json())
        .then(data => {
            alert(`Congratulations! ${data.message}`);
        })
    }

    
    const closeModal = (e) => {
        e.preventDefault();
        setOpenProjModal(!openProjModal)
    }

    return (
    <div className='modal-background'>
        <div className='proj-modal-container'>
            <form className='modal-form-container'>
                <div className='modal-title'>
                    <h2>Edit Project Information</h2>
                </div>
                <div className='modal-body'>
                    <input id='proj-edit-input' type='text' placeholder='edit project name' name='project_name' 
                    onChange={recordProfileData} value={manageProjData.project_name}/><br />
                    <input id='proj-edit-input' type='text' placeholder='edit project link' name='project_link' 
                    onChange={recordProfileData} value={manageProjData.project_link}/><br />
                    <textarea id='proj-edit-text' type='text' placeholder='edit project description' name='project_desc' 
                    onChange={recordProfileData} value={manageProjData.project_desc}/>
                    
                </div>
                <div className='modal-footer'>
                    <button id='manage-profile-cancel' onClick={closeModal} type='cancel'>Cancel</button>                   
                    <button id='manage-profile-button'  onClick={editProjectInfo} type='submit'>Save</button> 
                </div>
            </form>
            
        </div>
    </div>
    )
}

const UserInfoModal = ({setOpenUserInfoModal, openUserInfoModal, manageUserInfo, loggedInUserId}) => {
    const [manageUserInfoData, setManageUserInfoData] = useState({
        first_name: manageUserInfo.first_name,
        last_name: manageUserInfo.last_name,
        summary: manageUserInfo.summary,
        github_link: manageUserInfo.github_link,
        resume_link: manageUserInfo.resume_link
    })
    
    const recordUserInfoData = (e) => {
        setManageUserInfoData({...manageUserInfoData, [e.target.name]: e.target.value})
        console.log('project name:', manageUserInfoData)
    }
    const editUserInfo = () => {
        fetch(`http://localhost:8000/api/data/${loggedInUserId}`, {
            method: 'PATCH',
            mode: 'cors', 
            headers: {
                'Content-Type': 'application/json',
                'authorization': `Bearer ${localStorage.getItem("userAccessToken")}`
            },
            body: JSON.stringify({
                first_name: manageUserInfoData.first_name,
                last_name: manageUserInfoData.last_name,
                summary: manageUserInfoData.summary,
                github_link: manageUserInfoData.github_link,
                resume_link: manageUserInfoData.resume_link
            })
        })
        .then(res => res.json())
        .then(data => {
            alert(`Congratulations! ${data.message}`);
        })
    }

    
    const closeModal = (e) => {
        e.preventDefault();
        setOpenUserInfoModal(!openUserInfoModal)
    }

    return (
    <div className='modal-background'>
        <div className='user-modal-container'>
            <form >
                {/* <div className='modal-form-container'> */}
                    <div className='modal-title'>
                        <h2>Edit User Information</h2>
                    </div>
                    <div className='modal-body'>
                        <input id='user-edit-input' type='text' placeholder='edit project name'name='first_name' 
                        onChange={recordUserInfoData} value={manageUserInfoData.first_name}/><br />
                        <input id='user-edit-input' type='text' placeholder='edit project name'name='last_name' 
                        onChange={recordUserInfoData} value={manageUserInfoData.last_name}/><br />
                        <input id='user-edit-input' type='text' placeholder='edit project name'name='github_link' 
                        onChange={recordUserInfoData} value={manageUserInfoData.github_link}/><br />
                        <input id='user-edit-input' type='text' placeholder='edit project name'name='resume_link' 
                        onChange={recordUserInfoData} value={manageUserInfoData.resume_link}/><br />
                        <textarea id='user-edit-text' type='text' placeholder='edit project name'name='summary' 
                        onChange={recordUserInfoData} value={manageUserInfoData.summary}/>
                        
                    </div>
                    <div className='modal-footer'>
                        <div className='btn-container'>
                            <button id='manage-profile-cancel' onClick={closeModal} type='cancel'>Cancel</button>
                            <button id='manage-profile-button' onClick={editUserInfo} type='submit'>Save</button>
                        </div>
                        
                    </div>
                {/* </div> */}
            </form>
            
        </div>
    </div>
    )
}


