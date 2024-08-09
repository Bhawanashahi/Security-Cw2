import React, { useEffect, useState } from 'react';
import Footer from '../components/Footer';
import { Container, Row, Col, Carousel } from 'react-bootstrap';
import { getAllProductApi } from '../apis/Api';
import { toast } from 'react-toastify';
import '../style/login.css';
import HomeBar from '../components/HomeBar';

const Home= () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Fetch all products when component mounts
    getAllProductApi().then((res) => {
      setProducts(res.data.products);
    }).catch(err => {
      console.error('Error fetching products:', err);
    });
  }, []);

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
  };

  const textUnderOneStop = {
    fontFamily: 'Poppins, sans-serif',
    fontSize: '13px',
    color: '#383838',
  };

  const whySectionStyle = {
    display: 'flex',
    alignItems: 'center',
    height: '343px',
    width: 'auto',
    background: 'linear-gradient(to right, #920808, #FF6F07)', // Gradient background
    padding: '20px',
  };

  const imageStyle1 = {
    height: '343px',
    width: '582px',
    objectFit: 'cover',
    marginLeft: 'auto',
  };

  const whyTextStyle = {
    flex: 1,
    fontFamily: 'Poppins, sans-serif',
    fontSize: '16px',
    lineHeight: '1.5',
    color: '#FFFFFF',
  };

  const underlineStyle = {
    textDecoration: 'underline',
    fontFamily: 'Poppins, sans-serif',
    fontStyle: 'italic',
  };

  return (
    <>
      <div>
        <HomeBar />
      </div>

      {/* Banner Section */}
      <div className="banner-section">
        <Carousel>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src="/assets/images/Banner.png"
              alt="First slide"
              style={{ maxHeight: '550px', objectFit: 'cover' }}
            />
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src="/assets/images/banner1.png"
              alt="Second slide"
              style={{ maxHeight: '550px', objectFit: 'cover' }}
            />
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src="/assets/images/banner2.png"
              alt="Third slide"
              style={{ maxHeight: '550px', objectFit: 'cover' }}
            />
          </Carousel.Item>
        </Carousel>
      </div>

      {/* Services Section */}
      <Container className="mt-4 text-center">
        <h2 className="mb-1" style={{ color: '#C80101', fontSize: '1.5em', fontWeight: 'bold' }}>
          Our Services
        </h2>
        <h1 className="mb-4" style={{ color: '#000000', fontSize: '2em', fontWeight: 'bold' }}>
          One Stop Solution:
        </h1>
        {/* Text under One Stop Solution */}
        <p style={textUnderOneStop}>
          An event is such a special and intimate celebration; a sweetly constructed dream brought to life. All couples, we firmly believe, deserve to have an event that they can not only cherish and remember fondly. Eventease is a Nepali event website where you find the best event vendors under your budget. Check prices, get verified reviews, and check work done by the vendors to save your time from unnecessary hassles.
        </p>
        <Row>
          <Col md={6}>
            <div className="service-card" style={{ ...cardStyle, ...gradientStyles[0] }}>
              <div className="service-image" style={{ width: '50%', height: '100%', overflow: 'hidden' }}>
                <img src="/assets/images/sv.png" alt="Photography & Videography" style={imageStyle} />
              </div>
              <div className="service-content" style={{ paddingLeft: '10px' }}>
                <h3 style={h3Style}>Photography & Videography>></h3>
                <p style={pStyle}>Photography and videography</p>
              </div>
            </div>
            <div className="service-card" style={{ ...cardStyle, ...gradientStyles[2] }}>
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
            <div className="service-card" style={{ ...cardStyle, ...gradientStyles[1] }}>
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
   

      <div style={whySectionStyle}>
        <Container style={{ display: 'flex', alignItems: 'flex-start' }}>
          <div style={{ ...whyTextStyle, textAlign: 'left' }}>
            <h2 className="mb-4" style={{ color: '#FFFFFF', fontSize: '30px', fontWeight: 'bold', lineHeight: '1.2', fontFamily: 'Poppins, sans-serif' }}>
              Why do<br />
              you need<br />
              <span style={underlineStyle}>EventEase?</span>
            </h2>
            <p>EventEase helps customers by connecting them with top-rated event vendors within their budget. It provides price comparisons, verified reviews, and showcases previous work from vendors, ensuring a hassle-free planning experience. This platform streamlines the search and selection process, making event planning more efficient and stress-free.</p>
          </div>
          <img src="/assets/images/wevent.png" alt="EventEase Image" style={imageStyle1} />
        </Container>
      </div>
    
      {/* Gallery Section */}
      <Container className="mt-4">
        <h2 className="mb-4" style={{ fontSize: '30px', fontWeight: 'bold', fontStyle:'italic', fontFamily: 'Poppins, sans-serif', }}>
          <span style={{ color: '#000000' }}>Memories you create,</span> <span style={{ color: '#C80101' }}>memories we capture</span>
        </h2>
        <Row className="gallery">
          {['m1.png', 'm2.jpg', 'm3.png'].map((image, index) => (
            <Col md={4} key={index} className="gallery-item">
              <img
                src={`/assets/images/${image}`}
                alt={`Memory ${index + 1}`}
                className="img-fluid"
                style={{ objectFit: 'cover', height: '500px', width: '505px' }}
              />
            </Col>
          ))}
        </Row>
        <Row className="gallery mt-4">
          {['m4.png', 'm5.png', 'm6.png'].map((image, index) => (
            <Col md={4} key={index} className="gallery-item">
              <img
                src={`/assets/images/${image}`}
                alt={`Memory ${index + 4}`}
                className="img-fluid"
                style={{ objectFit: 'cover', height: '500px', width: '505px' }}
              />
            </Col>
          ))}
        </Row>
      </Container>
      <div style={{
  width: 'auto',
  height: '130px',
  background: 'linear-gradient(to bottom, #570404, #AF4B12)',
  margin: '20px auto',
  marginBottom: '0px',
  position: 'relative', // Ensure positioning context for pseudo-element
}}>
  {/* Vertical Line */}
  <div style={{
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: '500px', // Position the vertical line 500px from the left
    width: '2px', // Width of the vertical line
    backgroundColor: '#FFFFFF', // Color of the vertical line
    margin: '0 auto', // Center the vertical line vertically
  }}></div>

  {/* Text on the left side */}
  <div style={{
    position: 'absolute',
    left: '100px', // Position text 100px from the left edge
    top: '50%', // Center vertically
    transform: 'translateY(-50%)', // Adjust for vertical centering
    textAlign: 'left', // Align text to the left
    paddingRight: '20px', // Add padding for spacing
  }}>
    <div style={{
      color: '#EBFF01', // Text color
      fontSize: '20px', // Font size
      fontWeight: '600', // Font weight
    }}>One stop solutions</div>
    <div style={{
      fontFamily: 'Poppins, sans-serif', // Font family
      fontStyle: 'italic', // Italic style
      fontSize: '30px', // Font size
      fontWeight: '700', // Font weight
      color: 'white', // Text color
    }}>EventEase</div>
  </div>

  {/* Text on the right side */}
  <div style={{
    position: 'absolute',
    left: '520px', // Adjusted position to place text right after the line
    top: '50%', // Center vertically
    transform: 'translateY(-50%)', // Adjust for vertical centering
    textAlign: 'left', // Align text to the left
    paddingLeft: '20px', // Add padding for spacing
    display: 'flex', // Use flexbox for aligning buttons in a row
    alignItems: 'center', // Center items vertically
  }}>
    <div style={{
      color: '#FFE604', // Text color for "ARE YOU A VENDOR?"
      fontSize: '30px', // Font size
      fontFamily: 'Poppins, sans-serif', // Font family
      fontWeight: '700', // Font weight
      marginRight: '20px', // Add space between text and buttons
    }}>ARE YOU A VENDOR?
     <div style={{
    color: '#FFFFFF', // Text color for "ARE YOU A VENDOR?"
    fontSize: '20px', // Font size adjusted to medium
    fontFamily: 'Poppins, sans-serif', // Font family
    fontWeight: '300', // Font weight
    marginRight: '20px', // Add space between text and buttons
  }}>Boost your business with EventEase</div></div>
   

    
    <button style={{
      padding: '10px 20px',
      height:'50px',
      width:'230px',
      borderRadius:'10px', // Padding for button
      fontSize: '25px',
      fontStyle:'initial', // Font size
      fontFamily: 'Poppins, sans-serif', // Font family
      fontWeight: '700',  // Font weight
      backgroundColor: '#000000', // Background color
      color: '#FFE604', // Text color
      border: 'none', // No border
      cursor: 'pointer',
      marginLeft: '60px'
     // Pointer cursor
    }}>Contact Us>></button>
    <button style={{
      height:'50px',
      width:'230px',
      borderRadius:'10px',
      padding: '10px 20px', // Padding for button
      fontSize: '25px',
      fontStyle:'initial', // Font size
      fontFamily: 'Poppins, sans-serif', // Font family
      fontWeight: '700', // Font weight
      backgroundColor: '#000000', // Background color
      color: '#FFE604', // Text color
      border: 'none', // No border
      cursor: 'pointer', // Pointer cursor
      marginLeft: '40px', // Add space between buttons
    }}>Join Now>></button>
  </div>

  {/* Content inside the div */}
  {/* You can add any content or leave it empty based on your needs */}
</div>



      {/* Footer Section */}
      <Footer />

    </>
  );
};

export default Home;
