import React,{ useState } from 'react';


const AddProject = ({loggedInUserId, openAddProj, setOpenAddProj}) => {
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
        fetch('http://localhost:8000/api/project', {
            method: 'POST', 
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                project_name: projData.project_name,
                project_desc: projData.project_desc,
                project_link: projData.project_link,
                user_id: loggedInUserId
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
                    <input id='proj-edit-input' type='text' placeholder='Project name...' required name='project_name' 
                    onChange={recordProject} value={projData.project_name}/><br />
                    <input id='proj-edit-input' type='text' placeholder='Project link...' required name='project_link' 
                    onChange={recordProject} value={projData.project_link}/><br />
                    <textarea id='proj-edit-text' type='text' placeholder='Project description...' required name='project_desc' 
                    onChange={recordProject} value={projData.project_desc}/>
                    
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


