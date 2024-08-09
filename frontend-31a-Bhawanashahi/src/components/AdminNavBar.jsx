import React from 'react';
import { Navbar, Nav , Container} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const AdminNavbar = () => {
  const navbarStyle = {
    backgroundColor: '#D8812F', // Background color
  };

  const navLinkStyle = {
    color: 'black',     // Font color for Nav.Link
    fontWeight: 'bold', // Make the font bold
  };

 
 
  return (
  <>
      <Navbar style={{ backgroundColor: 'darkred' }} variant="light" expand="lg">
    <Container>
    <img
      src='/assets/images/logo.png'  // Replace with the actual path to your logo image
      alt="Logo"
      style={{ maxHeight: '80px', width: 'auto', marginRight:'10px'}}
    />
      <Navbar.Toggle aria-controls="second-navbar-nav" />
      <Navbar.Collapse id="second-navbar-nav">
  <Nav className="mr-auto">
    <Nav.Link href="/admin/home" style={{ color: 'white', fontWeight: 'bold', marginRight: '50px' }}>Home</Nav.Link>
    <Nav.Link href="/admin/booking" style={{ color: 'white', fontWeight: 'bold', marginRight: '50px' }}>Booking</Nav.Link>
    <Nav.Link href="/admin/adminblog" style={{ color: 'white', fontWeight: 'bold', marginRight: '50px' }}>Add Blog</Nav.Link>
    <Nav.Link href="/admin/contact" style={{ color: 'white', fontWeight: 'bold', marginRight: '50px' }}>Contacts</Nav.Link>
  </Nav>
</Navbar.Collapse>

    </Container>
  </Navbar>
  </>
  );
};

export default AdminNavbar;
