// import React from 'react'
// import { Navbar, Nav, Container } from 'react-bootstrap';
// import { FaSearch, FaUser, FaHeart, FaShoppingCart } from 'react-icons/fa';
// import { useNavigate, Link} from 'react-router-dom';

// const HomeBar = () => {
//   return (
//     <>
 
//     {/* First Navbar Row */}
//     <Navbar bg="light" expand="lg" variant="light">
//     <Container>
//     <img
//           src='/assets/images/logo.png'  // Replace with the actual path to your logo image
//           alt="Logo"
//           style={{ maxHeight: '80px', width: 'auto'}}
//         />
//       <Navbar.Toggle aria-controls="first-navbar-nav" />
//       <Navbar.Collapse id="first-navbar-nav" className="justify-content-end">
//         <Nav>

          
//         <div className="search-bar-container" style={{ position: 'relative' }}>
//           <input
//             type="text"
//             placeholder=" Search Pet and products"
//             style={{
//               marginTop:'10px',
//               marginRight: '40px',
//               height: '50px',
//               width: '500px', // Adjust the width to your preference
//               boxShadow: 'grey',
//               borderColor:'black',
//               borderRadius: '20px',
//               paddingRight: '20px',
//               color: 'black',
//             }}
//             // value={searchQuery}
//             // onChange={(e) => handleSearch(e.target.value)}
//           />
//         </div>
         
      
       

               

//           <Nav.Link href="/login"><FaUser /></Nav.Link>

//           <Nav.Link href="#wishlist"><FaHeart className='text-black fs-5  me-1' /></Nav.Link>
//           <Nav.Link href="#cart"><FaShoppingCart className='text-black fs-5  me-5'/></Nav.Link>
//         </Nav>
//       </Navbar.Collapse>
//     </Container>
//   </Navbar>

//     {/* Second Navbar Row */}
//    {/* Second Navbar Row */}
//    <Navbar style={{ backgroundColor: '#D8812F' }} variant="dark" expand="lg">
//         <Container>
//           <Navbar.Toggle aria-controls="second-navbar-nav" />
//           <Navbar.Collapse id="second-navbar-nav" className="justify-content-center">
//             <Nav className="mr-auto">
//               <Nav.Link href="/dash" style={{ color: 'black', fontWeight: 'bold', marginRight: '100px' }}>Home</Nav.Link>
//               <Nav.Link href="/orders" style={{ color: 'black', fontWeight: 'bold', marginRight: '100px' }}>Orders</Nav.Link>
//               <Nav.Link href="/products" style={{ color: 'black', fontWeight: 'bold', marginRight: '100px' }}>Pet Products</Nav.Link>
//               <Nav.Link href="/about-us" style={{ color: 'black', fontWeight: 'bold', marginRight: '100px' }}>About Us</Nav.Link>
//               <Nav.Link href="/blog" style={{ color: 'black', fontWeight: 'bold', marginRight: '100px' }}>Blog</Nav.Link>
//               <Nav.Link href="/contact" style={{ color: 'black', fontWeight: 'bold' }}>Contact</Nav.Link>
//             </Nav>
//           </Navbar.Collapse>
//         </Container>
//       </Navbar>
    
        
//   </>    
    
//   )
// }

// export default HomeBar
import React, { useEffect, useState } from 'react';
import { Navbar, Nav, Container, Form, FormControl, Button, Dropdown } from 'react-bootstrap';
import { FaSearch,  FaUser } from 'react-icons/fa';
import { useNavigate, Link } from 'react-router-dom';
import { getAllProductApi, searchProductByNameApi } from '../apis/Api';
import '../style/Navbar.css'; // Adjust the path if needed
import '../App.css'; 

const HomeBar = () => {
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
                <Nav.Link href="/login"><FaUser /></Nav.Link>
                </div>
              </div>
            ) : (
              <Nav.Link as={Link} to="/login" className="text-black">Login</Nav.Link>
            )}
          </Nav>

        </Container>
      </Navbar>

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

export default HomeBar;

