import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import '../../style/adminHome.css';
import AdminNavbar from '../../components/AdminNavBar';

const AdminHome = () => {
  const vendors = [
    { id: 2, name: 'Photolaya' },
  ];

  return (
    <>
    <AdminNavbar/>
   
      <Container className="admin-home-container mt-5">
        <h3 className="text-center mb-4">Registered Vendors</h3>
        <Row>
          {vendors.map((vendor) => (
            <Col md={6} key={vendor.id} className="mb-4">
              <Card className="vendor-card">
                <Card.Img variant="top" src="/assets/images/Wevent.png" className="vendor-image" />
                <Card.Body>
                  <Card.Title>{vendor.name}</Card.Title>
                  <Button variant="primary">View Details</Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    
    </>
  );
};

export default AdminHome;
