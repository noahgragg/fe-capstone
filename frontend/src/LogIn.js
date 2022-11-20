import React, { useState } from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Row, Col, Form } from 'react-bootstrap';
import { FaEyeSlash, FaEye } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';


function LogIn({loggedInUsername, setLoggedInUsername, loggedInUserId, setLoggedInUserId, keys}) {
  const [userName, setUserName]= useState('');
  const [loggedIn, setLoggedIn] = useState(loggedInUserId);
  const [show, setShow] = useState(false);
  const navigate = useNavigate();
  //LOGIN CODE
  const currentUsername = (username) => {
    setLoggedInUsername(username);
  }
  const handleClose = () => {
    setShow(false);
    setPasswordInput('');
  }
  const handleShow = () => {
    if(!loggedIn){
      setShow(true);
    } else {
      setLoggedIn(false);
      setLoggedInUsername('')
      setLoggedInUserId('')
      localStorage.clear()
      console.log("you have logged out")
      navigate("/home");
    }
  }

    const [usernameInput, setUsernameInput] = useState('');
    const [passwordType, setPasswordType] = useState("password");
    const [passwordInput, setPasswordInput] = useState("");

    const handleUsernameChange = (e) => {
      setUsernameInput(e.target.value)
    }
    const handlePasswordChange = (evnt) =>{
      setPasswordInput(evnt.target.value)
    }
    const togglePassword = ()=> {
      if(passwordType=== "password"){
        setPasswordType("text")
        return;
      }
      setPasswordType("password")
    }
    let loginInfo = {
      username: usernameInput,
      password: passwordInput
    }
    // function to fetch user_id from data API
    function requestUserId(userName){
      fetch(`${keys.dataURL}/api/data/userId/${userName}`)
      .then(res=> res.json())
      .then((data)=>{
        localStorage.setItem("loggedInUserId", data[0].user_id)
        setLoggedInUserId(data[0].user_id)
      })
    }
    //function to fetch to authentication API to retrieve userToken
   async function requestAccessToken(){
      fetch(`${keys.authURL}/user/login/token`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({'username':loginInfo.username})
      })
      .then(res => res.json())
      .then((data) => {
        //store user access token in local storage. 
        localStorage.setItem("userAccessToken", data.accessToken) 
        localStorage.setItem("loggedInUserName", loginInfo.username)
        requestUserId(loginInfo.username)
      });
    }

    //POST ROUTE for USERNAME/PASSWORD//
    const loginPost = () => {
      if(!loggedIn){
        fetch(`${keys.dataURL}/user/login`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(loginInfo)
        })
        .then(res => res.json())
        .then(async(data) => {
          setUserName(data.username);
          if(loginInfo.username === data.username){
            await requestAccessToken();
          }

        })
        .then(()=>{
            handleClose();
            setLoggedIn(true);
        });
        
        setLoggedInUsername(userName);
        
      } else {
        console.log('something went wrong')
        //LOG OUT STUFF WOULD GO HERE for clicking 'LOG OUT'
       
      }
    }
    


  return (
    <>
      <Button variant='outline-light' 
        onClick={handleShow}>{!loggedIn ? 'Log in' : 'Log out'}</Button>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Login</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col sm={6}>
              <Form>
                <Form.Group controlId='login'>
                  <Form.Label>Username</Form.Label>
                  <Form.Control
                    className='username'
                    placeholder='Email...'
                    type='text'
                    onChange={handleUsernameChange}
                  />
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    className='password'
                    placeholder='Password...'
                    type={passwordType}
                    onChange={handlePasswordChange}
                    value={passwordInput}
                  /> 
                </Form.Group>
                </Form>
                  <button
                    className='btn btn-outline-primary'
                    onClick={togglePassword}>
                     {passwordType === "password" ? <FaEye />: <FaEyeSlash />  }
                   </button>
            </Col>
          </Row>

          {/* i className="fas fa-eye-slash"></i> : <i className='fas fa-eye'></i> */}
        </Modal.Body>
        <Modal.Footer>
          Not a user?
          <Link onClick={handleClose} to='./create-user'>Create account</Link>
          <Button variant="outline-dark" onClick={loginPost}>Log in</Button>
          <Button variant="outline-secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}


export default LogIn


