import React,{ useState } from 'react';


const AddProject = ({loggedInUserId, openAddProj, setOpenAddProj, keys}) => {
    const [projData, setProjData] = useState({
        project_name: '',
        project_desc: '',
        project_link: '',
    })
    
    const recordProject = (e) => {
        setProjData({...projData, [e.target.name]: e.target.value})
        console.log('project name:', projData.project_name)
    }
    const addProject = () => {
        fetch(`${keys.dataURL}/api/project`, {
            method: 'POST', 
            headers: {
                'Content-Type': 'application/json',
                'authorization': `Bearer ${localStorage.getItem("userAccessToken")}`
            },
            body: JSON.stringify({
                project_name: projData.project_name,
                project_desc: projData.project_desc,
                project_link: projData.project_link,
                user_id: Number(loggedInUserId)
            })
        })
        .then(res => res.json())
        .then(data => {
            alert(`Congratulations! ${data.message}`);
        })
    }

    
    const closeModal = (e) => {
        e.preventDefault();
        setOpenAddProj(!openAddProj)
    }

    return (
    <div className='modal-background'>
        <div className='proj-modal-container'>
            <form className='modal-form-container'>
                <div className='modal-title'>
                    <h2>Add Project</h2>
                </div>
                <div className='modal-body'>
                    <input id='proj-edit-input' type='text' placeholder='Project name...' name='project_name' 
                    onChange={recordProject} value={projData.project_name} required /><br />
                    <input id='proj-edit-input' type='text' placeholder='Project link...' name='project_link' 
                    onChange={recordProject} value={projData.project_link} required /><br />
                    <textarea id='proj-edit-text' type='text' placeholder='Project description...' name='project_desc' 
                    onChange={recordProject} value={projData.project_desc} required />
                    
                </div>
                <div className='modal-footer'>
                    <button id='manage-profile-cancel' onClick={closeModal} type='cancel'>Cancel</button>                   
                    <button id='manage-profile-button'  onClick={addProject} type='submit'>Save</button> 
                </div>
            </form>
            
        </div>
    </div>
    )
}

export default AddProject


