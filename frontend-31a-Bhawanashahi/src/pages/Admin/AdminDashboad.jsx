import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import AdminNavbar from '../../components/AdminNavBar';

const AdminDashboard = () => {
  return (
    <>
     <AdminNavbar/>
    <Container>
      <h1 className="mt-5">Admin Dashboard</h1>
      <Row className="mt-4">
        <Col md={4}>
          <Card>
            <Card.Body>
              <Card.Title>Card 1</Card.Title>
              <Card.Text>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card>
            <Card.Body>
              <Card.Title>Card 2</Card.Title>
              <Card.Text>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card>
            <Card.Body>
              <Card.Title>Card 3</Card.Title>
              <Card.Text>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row className="mt-4">
        <Col md={4}>
          <Card>
            <Card.Body>
              <Card.Title>Card 4</Card.Title>
              <Card.Text>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card>
            <Card.Body>
              <Card.Title>Card 5</Card.Title>
              <Card.Text>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card>
            <Card.Body>
              <Card.Title>Card 6</Card.Title>
              <Card.Text>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
    </>
   
  );
};

export default AdminDashboard;
