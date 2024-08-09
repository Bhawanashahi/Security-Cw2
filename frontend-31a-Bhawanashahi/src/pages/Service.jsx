import React from 'react';
import NavBar from '../components/Navbar';
import Footer from '../components/Footer';
import { Container, Row, Col, Carousel } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const Service = () => {
  const imageStyle1 = {
    height: '250px',
    width: '1468px',
    objectFit: 'cover', // Ensures the image covers the div without stretching
    display: 'block', // Ensures the image is displayed as a block element
    margin: '0 auto', // Centers the image horizontally
  };
  
  const cardStyle = {
    height: '180px',
    width: '590px',
    margin: '10px auto', // Center the cards horizontally and add some margin
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f9fa', // Background color
    color: 'white',
    padding: '10px',
  };

  const imageStyle = {
    width: '282px',
    height: '180px',
    objectFit: 'cover', // Ensure image covers the card without stretching
  };

  const gradientStyles = [
    {
      background: 'linear-gradient(to bottom, #FF0000, #620000)',
    },
    {
      background: 'linear-gradient(to bottom, #705100, #FFBC0F)',
    },
    {
      background: 'linear-gradient(to bottom, #FF6C2D, #A5390B)',
    },
  ];

  const h3Style = {
    fontFamily: 'Poppins, sans-serif',
    fontWeight: 'bold',
    fontSize: '25px',
  };

  const pStyle = {
    fontFamily: 'Poppins, sans-serif',
    fontWeight: '300',
    fontSize: '15px',
    color:'white'
  };
  const textUnderOneStop = {
    fontFamily: 'Poppins, sans-serif',
    fontSize: '13px',
    color: '#383838',
  };
  const navigate = useNavigate();
  const handleNavigate = (path) => {
    navigate(path);
  };


  return (
    <>
      <NavBar />
      <div>
        <img src="/assets/images/Serviceb.png" alt="Service" style={imageStyle1} />
      </div>
      {/* Services Section */}
      <Container className="mt-4 text-center">
        <Row>
          <Col md={6}>
            <div className="service-card" style={{ ...cardStyle, ...gradientStyles[0] }} onClick={() => handleNavigate('/photo')}>
              <div className="service-image" style={{ width: '50%', height: '100%', overflow: 'hidden' }}>
                <img src="/assets/images/sv.png" alt="Photography & Videography" style={imageStyle} />
              </div>
              <div className="service-content" style={{ paddingLeft: '10px' }}>
                <h3 style={h3Style}>Photography & Videography>></h3>
                <p style={pStyle}>Photography and videography</p>
              </div>
            </div>
        
            <div className="service-card" style={{ ...cardStyle, ...gradientStyles[2] }} onClick={() => handleNavigate('/venue')}>
              <div className="service-image" style={{ width: '50%', height: '100%', overflow: 'hidden' }}>
                <img src="/assets/images/sp.png" alt="Venue" style={imageStyle} />
              </div>
              <div className="service-content" style={{ paddingLeft: '10px' }}>
                <h3 style={h3Style}>Venue>></h3>
                <p style={pStyle}>Banquet, Party palace, Hotel, Restaurants</p>
              </div>
            </div>
          </Col>
          <Col md={6}>
            <div className="service-card" style={{ ...cardStyle, ...gradientStyles[1] }} onClick={() => handleNavigate('/makeup')}>
              <div className="service-image" style={{ width: '50%', height: '100%', overflow: 'hidden' }}>
                <img src="/assets/images/sm.png" alt="Makeup" style={imageStyle} />
              </div>
              <div className="service-content" style={{ paddingLeft: '10px' }}>
                <h3 style={h3Style}>Makeup>></h3>
                <p style={pStyle}>Bridal makeup, simple makeup, Party makeup</p>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
   
      <Footer />
    </>
  );
};

export default Service;
