import React, {useState} from 'react';
import {json} from 'react-router-dom';

const url = 'http://localhost:8000';

const CreateUser = (props) => {
  // sets up state to be an empty object with the keys to be filled in by new user
  const[newUserToBeAdded, setNewUserToBeAdded]=useState({
    username: '',
    first_name: '',
    last_name: '',
    summary: '',
    resume_link:'', 
    github_link:'',
  });

  const recordNewUserToBeAdded =(event)=>{
    //implement record newUser to be added
    console.log("Record NewUser to be added:",newUserToBeAdded)
    setNewUserToBeAdded({...newUserToBeAdded, [event.target.name]:event.target.value});
  };
  
  // Fetch Request to post new user to database
  const submitNewUser = () =>{
    fetch (`${url}/api/data`, {
      method: 'POST',
      mode:'cors', 
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(newUserToBeAdded)
    })
  }

  return (
    <div className='newUserContainer'>
      <h1>CREATE USER PAGE</h1>
      <form>
        <input type='text' className='newUserInput'placeholder='username' name='username' onChange={recordNewUserToBeAdded}  required value={newUserToBeAdded.username}></input>
        <input type='text' className='newUserInput'placeholder='first name' name='first_name' onChange={recordNewUserToBeAdded} required value={newUserToBeAdded.first_name}></input>
        <input type='text' className='newUserInput'placeholder='last name' name='last_name' onChange={recordNewUserToBeAdded} required value={newUserToBeAdded.last_name}></input>
        <input type='text' className='newUserInput'placeholder='summary' name='summary' onChange={recordNewUserToBeAdded} required value={newUserToBeAdded.summary}></input>
        <input type='text' className='newUserInput'placeholder='resume link' name='resume_link' onChange={recordNewUserToBeAdded} required value={newUserToBeAdded.resume_link}></input>
        <input type='text' className='newUserInput'placeholder='github link' name='github_link' onChange={recordNewUserToBeAdded} required value={newUserToBeAdded.github_link}></input>
        <button className='addNewUserButton' onClick={()=>{submitNewUser()}}>Create New User</button>
      </form>
    </div>
  );
};

export default CreateUser;
