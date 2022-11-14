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
    fetch ({url})
  }


  return (
    <div>
      <h1>CREATE USER PAGE</h1>
    </div>
  )
}

export default CreateUser
