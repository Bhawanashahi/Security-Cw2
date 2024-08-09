import React, { useState } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { forgetPassword } from '../apis/Api';
import { toast } from 'react-toastify'

const ResetPassword = () => {
  const [email, setEmail] = useState('');

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    forgetPassword({email}).then(res =>{
      toast.success("Check your email")
    }).catch(err=>{
      console.log(err)
      toast.error('Something went wrong')
    })
  };

  return (
    <>
      <div
        style={{
          border: '2px solid #D8812F',
          padding: '10px',
          width: '500px',
          height: '350px',
          margin: 'auto', // Center the div horizontally
          marginTop: '100px', // Adjust the top margin to center vertically
        }}
      >
        <Container>
          <Row className="justify-content-center mt-5">
            <Col md={6}>
              <h2
                className="text-center mb-4"
                style={{ color: '#D8812F', lineHeight: '1.5', fontWeight:'bold' }}
              >
                Reset Password
              </h2>
              <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formEmail">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={handleEmailChange}
                    required
                  />
                </Form.Group>

                                    <Button
                    variant="primary"
                    type="submit"
                    className="mt-3"
                    style={{ backgroundColor: '#D8812F', width: '100%', color: 'black' }}
                    >
                    Reset Password
                    </Button>

              </Form>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};

export default ResetPassword;
