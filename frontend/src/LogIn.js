import React, { useState } from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap-modal';

function LogIn(props) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true);

    const [passwordType, setPasswordType] = useState("password");
    const [passwordInput, setPasswordInput] = useState("")
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

  return (
   <>
        <Button variant='outline-dark' onClick={handleShow}>Login</Button>

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
            <input
             className='username' 
             placeholder='Username...'
             type='text'
             onChange={e => props.setUsername(e.target.value)}
             />
            <input
             className='password'
             placeholder='Password...'
             type={passwordType}
             onChange={handlePasswordChange}
             value={passwordInput}
             />
             <button 
             className='btn btn-outline-primary'
             onClick={togglePassword}>
              { passwordType ==="password" ? <i className="bi bi-eye-slash"></i> : <i className='bi bi-eye'></i>}
             </button>
          </Modal.Body>
          <Modal.Footer>
          <Button variant="outline-dark">Login</Button>
          <Button variant="outline-secondary" onClick={handleClose}>
            Close
          </Button>
          </Modal.Footer>
        </Modal>
   </>
  )
}

export default LogIn


