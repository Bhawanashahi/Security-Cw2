import React, { useState } from 'react'
import { loginUserApi } from '../apis/Api'
import { toast } from 'react-toastify'
import { useNavigate, Link } from 'react-router-dom'
import { Container, Row, Col, Form, Button, Image } from 'react-bootstrap';
import '../style/login.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash, faLock } from '@fortawesome/free-solid-svg-icons';

const Login = () => {
    const[email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(email, password)

        const data = {
            email : email,
            password : password
        }

        // making API Call
        // const response  = loginUserApi(data)
        // console.log(response.data)
        // if(response.data.success == false){
        //     toast.error(response.data.message)
        // } else if (response.data.success == true){
        //     toast.success(response.data.message)
        // } else {
        //     toast.error("Server Error")
        // }

        loginUserApi(data).then((res) => {
            if(res.data.success == false){
                toast.error(res.data.message)
            } else {
                toast.success(res.data.message)
                // set token and user data in local storage
                localStorage.setItem('token',res.data.token)
        navigate('/dash')

                // set user data 
                const jsonDecode = JSON.stringify(res.data.userData)
                localStorage.setItem('user',jsonDecode)

            }
        }).catch(err => {
            toast.error("Server Error")
            console.log(err.message)
        })




    }

    

    return (
      <>
     <Container fluid className="bg-light d-flex justify-content-center align-items-center" style={{ height: '800px', width: '1440px' }}>
      <Row className="w-100">
        <Col md={6} className="d-none d-md-block p-0">
          <Image src="/assets/images/login.png" alt="Background" fluid style={{ height: '800px', width: '100%', objectFit: 'cover' }} />
        </Col>
        <Col md={6} className="p-5 d-flex flex-column justify-content-center">
          <div className="mb-3 text-center">
            <h2 className="header-title" style={{ fontFamily: 'Poppins', fontSize: '30px' }}>
              Welcome to <span>EventEase</span>
            </h2>
          </div>
          <Form className="mb-0">
            <Form.Group controlId="formSignupEmail" className="mb-3">
              <Form.Control
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{ fontFamily: 'Poppins', fontSize: '15px', height: '50px', width: '450px', boxShadow: '0 0 5px rgba(186, 186, 186, 0.5)', borderColor: 'black', borderRadius: '10px', marginBottom: '30px', marginLeft: '60px' }}
              />
              {/* {emailError && <p className="text-danger">{emailError}</p>} */}
            </Form.Group>

            <Form.Group controlId="formSignupPassword" className="mb-3">
              <Form.Control
                type={password ? 'text' : 'password'}
                placeholder="Enter your Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{ fontFamily: 'Poppins', fontSize: '15px', height: '50px', width: '450px', boxShadow: '0 0 5px rgba(186, 186, 186, 0.5)', borderColor: 'black', borderRadius: '10px', marginBottom: '30px', marginLeft: '60px', position: 'relative' }}
              />
              {/* {passwordError && <p className="text-danger">{passwordError}</p>} */}
            </Form.Group>

           <Form.Text className="text-muted mt-2" style={{ fontSize: '15px', color: 'black', marginLeft: '400px', fontStyle: 'italic', fontSize: '15px'}}>
              <Link to="/forgot-password" style={{ color: '#920808', fontFamily: 'Poppins' }}>
                Forgot Password?
              </Link>
            </Form.Text>

            <Button
              variant="primary"
              type="submit"
              style={{ fontFamily: 'Poppins', fontWeight: 'bold', fontSize: '25px', width: '250px', height: '50px', backgroundColor: '#920808', border: 'none', marginLeft: '143px', display: 'block', margin: '0 auto', borderRadius: '20px' }}
              onClick={handleSubmit}
            >
              Sign In
            </Button>

            <Form.Text className="text-muted mt-2" style={{ fontSize: '15px', color: 'black', marginLeft: '200px' }}>
              Don't have an account?{' '}
              <Link to="/register" style={{ color: '#920808', fontFamily: 'Poppins' }}>
                Sign Up
              </Link>
            </Form.Text>
          </Form>
        </Col>
      </Row>
    </Container>
    </>
    )
}

export default Login