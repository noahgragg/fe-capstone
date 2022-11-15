import React, { useState } from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Row, Col, Form } from 'react-bootstrap';
import { FaEyeSlash, FaEye } from 'react-icons/fa';


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
      <Button variant='outline-light' onClick={handleShow}>Login</Button>

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
                    placeholder='Username...'
                    type='text'
                    onChange={e => props.setUsername(e.target.value)}
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


