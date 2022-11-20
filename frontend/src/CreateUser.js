import React, {useState} from 'react';
import { json, useNavigate }from 'react-router-dom';

const CreateUser = ({keys}) => {
  //const dataURL = 'https://dataserverapi.onrender.com'
  // sets up state to be an empty object with the keys to be filled in by new user
  const navigate = useNavigate();
  const[newUserToBeAdded, setNewUserToBeAdded]=useState({
    username: '',
    first_name: '',
    last_name: '',
    summary: '',
    linkedIn_link:'', 
    github_link:'',
    profile_image:'No Image'
  });
  
  const recordNewUserToBeAdded =(event)=>{
    //implement record newUser to be added
    ("Record NewUser to be added:",newUserToBeAdded)
    setNewUserToBeAdded({...newUserToBeAdded, [event.target.name]:event.target.value});
  };

  const [newUsernamePwd, setNewUsernamePwd] = useState({
    username: newUserToBeAdded.username,
    password: '',
    reenter: ''
  });

  const recordNewUsernamePwd = (e) => {
    setNewUsernamePwd({...newUsernamePwd, [e.target.name]:e.target.value})
  }

  let usernamePwd = {
    username: newUserToBeAdded.username,
    password: newUsernamePwd.password
  }
  
  // Fetch Request to post new user to database
  const submitNewUser = (e) =>{
    e.preventDefault();
    if(newUsernamePwd.password === newUsernamePwd.reenter){
    fetch(`${keys.dataURL}/api/data`, {
          method: 'POST',
          mode: 'cors',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(newUserToBeAdded)
        })
        .then(res => res.json())
        .then((data) => {
        })
    fetch(`${keys.dataURL}/user/create`, {
          method: 'POST',
          mode: 'cors',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(usernamePwd)
        })
        .then(res => res.json())
        .then((data) => {
          navigate('/home');
        })
      } else {
        alert('Your passwords do not match');
        e.preventDefault();
      }
  };


  return (
    <div className='newUserPage'>
      <div className='newUserContainer'>
      <h1 className='newUserContainerTitle'>CREATE USER</h1>
      <form>
        <input type='text' className='newUserInput'placeholder='email' name='username' onChange={recordNewUserToBeAdded}  required value={newUserToBeAdded.username}></input>
        <input type='text' className='newUserInput'placeholder='first name' name='first_name' onChange={recordNewUserToBeAdded} required value={newUserToBeAdded.first_name}></input>
        <input type='text' className='newUserInput'placeholder='last name' name='last_name' onChange={recordNewUserToBeAdded} required value={newUserToBeAdded.last_name}></input>
        <input type='password' className='newUserInput'placeholder='password' name='password' onChange={recordNewUsernamePwd} required value={newUsernamePwd.password}></input>
        <input type='password' className='newUserInput'placeholder='re-enter' name='reenter' onChange={recordNewUsernamePwd} required value={newUsernamePwd.reenter}></input>
        {/* <input type='text' className='newUserInput'placeholder='github link' name='github_link' onChange={recordNewUserToBeAdded} required value={newUserToBeAdded.github_link}></input> */}
        <button type='submit' className='addNewUserButton' onClick={submitNewUser}>Create New User</button>
      </form>
      </div>
    </div>
  );
};

export default CreateUser;
