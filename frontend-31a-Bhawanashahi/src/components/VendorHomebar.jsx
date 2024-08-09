

// export default VendorNavbar;
import React, { useEffect, useState } from 'react';
import { Navbar, Nav, Container, Form, FormControl, Button, Dropdown } from 'react-bootstrap';
import { FaSearch } from 'react-icons/fa';
import { useNavigate, Link } from 'react-router-dom';
import { getAllProductApi, searchProductByNameApi } from '../apis/Api';
import '../style/Navbar.css'; // Adjust the path if needed
import '../App.css'; 

const VendorNavbar = () => {
  const [products, setProducts] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  
  const user = JSON.parse(localStorage.getItem('user'));
  const navigate = useNavigate();

  const handleLogout = (e) => {
    e.preventDefault();
    localStorage.clear();
    navigate('/vendor/login');
  };

  const handleSearch = async (query) => {
    try {
      if (query.trim() === '') {
        setSearchResults([]);
        return;
      }
      const response = await searchProductByNameApi(query);
      if (response && response.success && Array.isArray(response.products)) {
        setSearchResults(response.products);
      } else {
        console.error('Invalid response data structure:', response);
      }
    } catch (error) {
      console.error('Error searching products by title:', error);
    }
  };

  useEffect(() => {
    getAllProductApi()
      .then((res) => {
        setProducts(res.data.products);
      })
      .catch(error => console.error('Error fetching products:', error));
  }, []);

  return (
    <>
      {/* Navbar */}
      <Navbar bg="light" expand="lg" variant="light" className="py-2">
        <Container fluid style={{ maxWidth: '1440px' }} className="align-items-center">
          <Navbar.Brand href="/">
            <img
              src='/assets/images/logo.png'  // Replace with the actual path to your logo image
              alt="Logo"
              className="navbar-logo"
              style={{ height: '450px', width: 'auto' }} // Adjust the size as needed
            />
          </Navbar.Brand>
          <Navbar variant="dark" expand="lg" className="py-2">
            <Container style={{ maxWidth: '1440px' }}>
              <Nav className="mx-auto" style={{ width: '100%', justifyContent: 'space-between' }}>
                <Nav.Link href="/home" className="fw-bold mx-3 second-navbar-link" style={{ fontSize: '18px', color: '#920808' }}>Home</Nav.Link>
                <Nav.Link href="/vendor/bookings" className="fw-bold mx-3 second-navbar-link" style={{ fontSize: '18px', color: '#920808' }}>Bookings</Nav.Link>
                <Nav.Link href="/vendor/review" className="fw-bold mx-3 second-navbar-link" style={{ fontSize: '18px', color: '#920808' }}>Review</Nav.Link>
                <Nav.Link href="/vendor/addphoto" className="fw-bold mx-3 second-navbar-link" style={{ fontSize: '18px', color: '#920808' }}>AddPhotoVendorPage</Nav.Link>
                <Nav.Link href="/vendor/addmakeup" className="fw-bold mx-3 second-navbar-link" style={{ fontSize: '18px', color: '#920808' }}>AddMakeupVendorPage</Nav.Link>
                <Nav.Link href="/vendor/addvenue" className="fw-bold mx-3 second-navbar-link" style={{ fontSize: '18px', color: '#920808' }}>AddVenueVendorPage</Nav.Link>
                <Nav.Link href="/logout" className="fw-bold mx-3 second-navbar-link" style={{ fontSize: '18px', color: '#920808' }}>Logout</Nav.Link>
              </Nav>
            </Container>
          </Navbar>
          <Nav className="ml-auto d-flex align-items-center">
            {user ? (
              <div className="d-flex align-items-center">
                <div className="d-flex flex-column align-items-center">
                  <img src='/assets/images/profile.png' alt="User Icon" style={{ width: '40px', borderRadius: '50%' }} />
                  <span className="mt-1">Welcome, {user.firstName}</span>
                </div>
              </div>
            ) : (
              <Nav.Link as={Link} to="/vendor/login" className="text-black">Login</Nav.Link>
            )}
          </Nav>
        </Container>
      </Navbar>
    </>
  );
};

export default VendorNavbar;
