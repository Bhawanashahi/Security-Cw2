import React, { useEffect, useState } from 'react';
import { Navbar, Nav, Container, Form, FormControl, Button } from 'react-bootstrap';
import { FaSearch } from 'react-icons/fa';
import { useNavigate, Link } from 'react-router-dom';
import { getAllProductApi, searchProductByNameApi } from '../apis/Api';
import '../style/Navbar.css'; // Adjust the path if needed
import '../App.css';

const NavBar = () => {
  const [products, setProducts] = useState([]);
  const [searchResults, setSearchResults] = useState([]);

  const user = JSON.parse(localStorage.getItem('user'));
  const navigate = useNavigate();

  const handleLogout = (e) => {
    e.preventDefault();
    localStorage.clear();
    navigate('/login');
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
      {/* First Navbar Row */}
      <Navbar bg="light" expand="lg" variant="light" className="py-2">
        <Container fluid style={{ maxWidth: '1440px' }} className="align-items-center">
          <Navbar.Brand href="/">
            <img
              src='/assets/images/logo.png'  // Replace with the actual path to your logo image
              alt="Logo"
              className="navbar-logo"
              style={{ height: '450px', width: 'auto'}} // Adjust the size as needed
            />
          </Navbar.Brand>
          <Form className="d-flex mx-auto" style={{ flex: 1, maxWidth: '1000px' }}>
            <div style={{ display: 'flex', width: '100%' }}>
              <FormControl
                type="search"
                placeholder="Select Services"
                aria-label="Search"
                className="search-service"
                style={{ borderRadius: '10px 0 0 10px', borderRight: 'none', height: '84px', width: '250px', backgroundColor: '#D9D9D9' }}
              />
              <FormControl
                type="search"
                placeholder="Select Location"
                aria-label="Search"
                className="search-location"
                style={{ borderRadius: '0', borderRight: 'none', height: '60px', width: '730px', backgroundColor: '#D9D9D9' }}
              />
              <Button variant="outline-danger" style={{borderRadius: '0 10px 10px 0', 
                height: '60px', 
                width: '120px',
                backgroundColor: '#920808', 
                borderColor: '#920808', 
                color: 'white' }}>
                <FaSearch style={{ color: 'white', fontSize: '34px' }} />
              </Button>
            </div>
          </Form>
          <Nav className="ml-auto d-flex align-items-center">
            {user ? (
              <div className="d-flex align-items-center">
                <div className="d-flex flex-column align-items-center">
                  <img src='/assets/images/profile.png' alt="User Icon" style={{ width: '40px', borderRadius: '50%' }} />
                  <Link to="/profile" className="text-decoration-none text-dark">
                    <span className="mt-1">Welcome, {user.firstName}</span>
                  </Link>
                </div>
              </div>
            ) : (
              <Nav.Link as={Link} to="/login" className="text-black">Login</Nav.Link>
            )}
          </Nav>

        </Container>
      </Navbar>

      {/* Second Navbar Row */}
      <Navbar variant="dark" expand="lg" className="py-2" style={{ backgroundColor: '#920808' }}>
        <Container style={{ maxWidth: '1440px' }}>
          <Nav className="mx-auto" style={{ width: '100%', justifyContent: 'space-between' }}>
            <Nav.Link href="/dash" className="text-white fw-bold mx-3 second-navbar-link" style={{ fontSize: '18px' }}>Home</Nav.Link>
            <Nav.Link href="/service" className="text-white fw-bold mx-3 second-navbar-link" style={{ fontSize: '18px' }}>Services</Nav.Link>
            <Nav.Link href="/about-us" className="text-white fw-bold mx-3 second-navbar-link" style={{ fontSize: '18px' }}>About us</Nav.Link>
            <Nav.Link href="/blog" className="text-white fw-bold mx-3 second-navbar-link" style={{ fontSize: '18px' }}>Blog</Nav.Link>
            <Nav.Link href="/gallery" className="text-white fw-bold mx-3 second-navbar-link" style={{ fontSize: '18px' }}>Gallery</Nav.Link>
            <Nav.Link href="/contact" className="text-white fw-bold mx-3 second-navbar-link" style={{ fontSize: '18px' }}>Contact us</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
};

export default NavBar;
