import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import {createVendorUserApi } from "../../apis/Api";
import { Container, Row, Col, Form, Button, Image } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';



const VendorRegister = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const[address, setAddress]=useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [fnameError, setFnameError] = useState('');
  const [lnameError, setLnameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [addressError, setAddressError] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [cpasswordError, setCpasswordError] = useState('');

  const validate = () => {
    let isValid = true;

    setFnameError('');
    setLnameError('');
    setEmailError('');
    setAddress('');
    setPhoneError('');
    setPasswordError('');
    setCpasswordError('');

    if (firstName.trim() === '') {
      setFnameError('Firstname is required');
      isValid = false;
    }
    if (lastName.trim() === '') {
      setLnameError('Lastname is required');
      isValid = false;
    }
    if (email.trim() === '') {
      setEmailError('Email is required');
      isValid = false;
    }
    if (address.trim() === '') {
       setAddressError('Address is required');
        isValid = false;
      }
    if (phone.trim() === '') {
      setPhoneError('Phone no is required');
      isValid = false;
    }
    if (password.trim() === '') {
      setPasswordError('Password is required');
      isValid = false;
    }
    if (confirmPassword.trim() === '') {
      setCpasswordError('Confirm Password is required');
      isValid = false;
    }
    if (password.trim() !== confirmPassword.trim()) {
      setCpasswordError('Password and Confirm Password must be same');
      isValid = false;
    }

    return isValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const isValid = validate();
    if (!isValid) {
      return;
    }

    const data = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      address:address,
      phone: phone,
      password: password,
    };

    createVendorUserApi(data)
      .then((res) => {
        if (res.data.success === false) {
          toast.error(res.data.message);
        } else {
          toast.success(res.data.message);
        }
      })
      .catch((err) => {
        toast.error('Server Error');
        console.log(err.message);
      });
  };

  return (
    <>
      <Container
        fluid
        className="bg-light d-flex justify-content-center align-items-center"
        style={{ height: '800px', width: '1440px' }}
      >
        <Row className="w-100">
          <Col md={6} className="d-none d-md-block p-0">
            <Image
              src="/assets/images/login.png"
              alt="Background"
              fluid
              style={{ height: '800px', width: '100%', objectFit: 'cover' }}
            />
          </Col>
          <Col md={6} className="p-5 d-flex flex-column justify-content-center">
            <div className="mb-3 text-center">
              <h2 className="header-title" style={{ fontFamily: 'Poppins', fontSize: '30px' }}>
                Create Your <span>Vendor</span> Account
              </h2>
            </div>
            <Form className="mb-0">
              <Form.Group controlId="formFirstName" className="mb-3">
                <Form.Control
                  type="text"
                  placeholder="Enter your FirstName"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  style={{ fontFamily: 'Poppins', fontSize: '15px', height: '50px', width: '450px', boxShadow: '0 0 5px rgba(186, 186, 186, 0.5)', borderColor: 'black', borderRadius: '10px', marginBottom: '30px', marginLeft: '60px' }}
                />
                {fnameError && <p className="text-danger">{fnameError}</p>}
              </Form.Group>
              <Form.Group controlId="formLastName" className="mb-3">
                <Form.Control
                  type="text"
                  placeholder="Enter your Last Name"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  style={{ fontFamily: 'Poppins', fontSize: '15px', height: '50px', width: '450px', boxShadow: '0 0 5px rgba(186, 186, 186, 0.5)', borderColor: 'black', borderRadius: '10px', marginBottom: '30px', marginLeft: '60px' }}
                />
                {lnameError && <p className="text-danger">{lnameError}</p>}
              </Form.Group>
              <Form.Group controlId="formSignupEmail" className="mb-3">
                <Form.Control
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  style={{ fontFamily: 'Poppins', fontSize: '15px', height: '50px', width: '450px', boxShadow: '0 0 5px rgba(186, 186, 186, 0.5)', borderColor: 'black', borderRadius: '10px', marginBottom: '30px', marginLeft: '60px' }}
                />
                {emailError && <p className="text-danger">{emailError}</p>}
              </Form.Group>
              <Form.Group controlId="formSignupPhone" className="mb-3">
                <Form.Control
                  type="phone"
                  placeholder="Enter your Phone no"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  style={{ fontFamily: 'Poppins', fontSize: '15px', height: '50px', width: '450px', boxShadow: '0 0 5px rgba(186, 186, 186, 0.5)', borderColor: 'black', borderRadius: '10px', marginBottom: '30px', marginLeft: '60px' }}
                />
                {phoneError && <p className="text-danger">{phoneError}</p>}
              </Form.Group>
              <Form.Group controlId="formSignupAddress" className="mb-3">
                <Form.Control
                  type="address"
                  placeholder="Enter your Address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  style={{ fontFamily: 'Poppins', fontSize: '15px', height: '50px', width: '450px', boxShadow: '0 0 5px rgba(186, 186, 186, 0.5)', borderColor: 'black', borderRadius: '10px', marginBottom: '30px', marginLeft: '60px' }}
                />
                {addressError && <p className="text-danger">{addressError}</p>}
              </Form.Group>
              <Form.Group controlId="formSignupPassword" className="mb-3">
                <Form.Control
                  type={password ? 'text' : 'password'}
                  placeholder="Enter your Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  style={{ fontFamily: 'Poppins', fontSize: '15px', height: '50px', width: '450px', boxShadow: '0 0 5px rgba(186, 186, 186, 0.5)', borderColor: 'black', borderRadius: '10px', marginBottom: '30px',  marginLeft: '60px' }}
                />
                {passwordError && <p className="text-danger">{passwordError}</p>}
              </Form.Group>
              <Form.Group controlId="formConfirmPassword" className="mb-3">
                <Form.Control
                  type={confirmPassword ? 'text' : 'password'}
                  placeholder="Enter to Confirm your Password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  style={{ fontFamily: 'Poppins', fontSize: '15px', height: '50px', width: '450px', boxShadow: '0 0 5px rgba(186, 186, 186, 0.5)', borderColor: 'black', borderRadius: '10px', marginBottom: '30px', marginLeft: '60px' }}
                />
                {cpasswordError && <p className="text-danger">{cpasswordError}</p>}
              </Form.Group>
              <Button
                variant="primary"
                type="submit"
                style={{ fontFamily: 'Poppins', fontWeight: 'bold', fontSize: '25px', width: '250px', height: '50px', backgroundColor: '#920808', border: 'none', marginLeft: '143px', display: 'block', margin: '0 auto', borderRadius:'20px' }}
                onClick={handleSubmit}
              >
                Sign Up
              </Button>
              <Form.Text className="text-muted mt-2" style={{ fontSize: '15px', color: 'black', marginLeft: '160px' }}>
                Already have an account?{' '}
                <Link to="/vendor/login" style={{ color: '#920808', fontFamily: 'Poppins', marginLeft: '0px' }}>
                  Login
                </Link>
              </Form.Text>
            </Form>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default VendorRegister;
