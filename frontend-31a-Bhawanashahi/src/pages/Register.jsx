import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { createUserApi } from '../apis/Api';
import { Container, Row, Col, Form, Button, Image } from 'react-bootstrap';
import '../style/register.css';

// List of common passwords and keywords to check against
const commonPasswords = [
  'password', '123456', '123456789', 'qwerty', 'abc123', 'password1@', '12345678', '12345'
];

const keywords = [
  'admin', 'user', 'password', 'name', 'email', 'phone'
];

const validatePassword = (password) => {
  // Basic password validation
  if (password.length < 8 || password.length > 12) {
    return 'Password must be between 8 and 12 characters';
  }
  if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@*#])[A-Za-z\d@*#]{8,12}/.test(password)) {
    return 'Password must contain at least one uppercase letter, one lowercase letter, one digit, and one special character (@, *, #)';
  }
  if (commonPasswords.includes(password.toLowerCase())) {
    return 'Password is too common';
  }
  if (keywords.some(keyword => password.toLowerCase().includes(keyword))) {
    return 'Password contains personal information';
  }
  return '';
};

const Register = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [fnameError, setFnameError] = useState('');
  const [lnameError, setLnameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [cpasswordError, setCpasswordError] = useState('');

  const validate = () => {
    let isValid = true;

    setFnameError('');
    setLnameError('');
    setEmailError('');
    setPhoneError('');
    setPasswordError('');
    setCpasswordError('');

    // Basic field validation
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
    if (phone.trim() === '') {
      setPhoneError('Phone no is required');
      isValid = false;
    }

    // Password validation
    const passwordValidationError = validatePassword(password);
    if (password.trim() === '') {
      setPasswordError('Password is required');
      isValid = false;
    } else if (passwordValidationError) {
      setPasswordError(passwordValidationError);
      isValid = false;
    }

    // Confirm password validation
    if (confirmPassword.trim() === '') {
      setCpasswordError('Confirm Password is required');
      isValid = false;
    } else if (password.trim() !== confirmPassword.trim()) {
      setCpasswordError('Password and Confirm Password must be the same');
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
      phone: phone,
      password: password,
    };

    createUserApi(data)
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
                Create Your <span>EventEase</span> Account
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
              <Form.Group controlId="formSignupPassword" className="mb-3">
                <Form.Control
                  type="password" // Ensure the password is invisible
                  placeholder="Enter your Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  style={{ fontFamily: 'Poppins', fontSize: '15px', height: '50px', width: '450px', boxShadow: '0 0 5px rgba(186, 186, 186, 0.5)', borderColor: 'black', borderRadius: '10px', marginBottom: '30px', marginLeft: '60px' }}
                />
                {passwordError && <p className="text-danger">{passwordError}</p>}
              </Form.Group>
              <Form.Group controlId="formConfirmPassword" className="mb-3">
                <Form.Control
                  type="password" // Ensure the confirm password is invisible
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
                <Link to="/login" style={{ color: '#920808', fontFamily: 'Poppins', marginLeft: '0px' }}>
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

export default Register;
