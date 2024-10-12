import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Button, Col, FormGroup, Input, Row } from 'reactstrap';

const initialUser = { email: "", password: "", firstName:"" }
const Registration = () => {
  const [user, setUser] = useState(initialUser);
  const navigate = useNavigate();

  const signUp = async ()  => {
    try {
      const url = 'http://localhost:3001/users';
      if (user.firstName && user.email && user.password){
        const res = await axios.post(url, user);
        if (res) {
          setUser(initialUser);
          navigate("/login")
        }
        console.log(res);
      }
    } catch(error) {
      toast.error(error.message, {
        hideProgressBar: true,
      });
    }

  };
  const handleUserChange = ({ target }) => {
      // const [name, value] = target;
      setUser((currentUser) => ({
        ...currentUser,
        [target.name]: target.value,
      }));
    };



  return (
  <Row className='register'>
        <Col sm="12" md={{size:4, offset:4}}>
        <div>
        <h2>Sign up:</h2>
            <FormGroup >
            <Input 
            type="text"
            name="firstName" 
            value={user.firstName} 
            onChange={handleUserChange} 
            placeholder="Enter your name" 
            />
        </FormGroup>
        <FormGroup >
            <Input 
            type="email"
            name="email" 
            value={user.email} 
            onChange={handleUserChange} 
            placeholder="Enter Email" 
            />
        </FormGroup>
        <FormGroup >
            <Input 
            type="password"
            name="password" 
            value={user.password} 
            onChange={handleUserChange} 
            placeholder="Enter Password" 
            />
        </FormGroup>
        <Button color="primary" onClick={signUp}>LogIn</Button>
        </div>
          
        </Col>
  </Row>

  )
}

export default Registration;