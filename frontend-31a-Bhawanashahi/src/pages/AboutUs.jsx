import React from 'react';
import NavBar from '../components/Navbar';
import Footer from '../components/Footer';

const AboutUs = () => {
  const mainContainerStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    minHeight: '100vh', // Ensures the container takes the full height of the viewport
    textAlign: 'center',
    padding: '20px', // Optional: Adds padding for better readability on smaller screens
  };

  const eventEaseStyle = {
    color: '#920808',
    fontSize: '30px',
    fontWeight: 'bold',
    fontFamily: 'Poppins, sans-serif',
    marginBottom: '10px', // Adds space between the two text sections
  };

  const oneStopSolutionStyle = {
    color: 'black',
    fontSize: '30px',
    fontWeight: 'bold',
    fontFamily: 'Poppins, sans-serif',
    marginBottom: '20px', // Adds space between the title and the paragraph
  };

  const descriptionStyle = {
    color: '#383838',
    fontSize: '20px',
    fontFamily: 'Poppins, sans-serif',
    fontWeight: 'regular',
    maxWidth: '1440px', // Optional: Restricts the width for better readability
    lineHeight: '1.5', // Optional: Improves readability by increasing line spacing
  };

  const imagesContainerStyle = {
    display: 'flex',
    justifyContent: 'center',
    marginTop: '20px', // Adds space between the paragraph and images
  };

  const imageStyle = {
    width: '681px',
    height: '366px',
    objectFit: 'cover', // Ensures the image covers the div without stretching
  };

  const planEventStyle = {
    fontSize: '30px',
    fontWeight: 'bold',
    fontFamily: 'Poppins, sans-serif',
    marginTop: '20px', // Adds space between the images and the text
  };

  const eventEaseTextStyle = {
    color: '#920808',
  };

  const otherTextStyle = {
    color: 'black',
  };

  const additionalTextStyle = {
    color: '#383838',
    fontSize: '20px',
    fontFamily: 'Poppins, sans-serif',
    fontWeight: '300',
    marginTop: '20px', // Adds space between the plan event text and the additional text
    maxWidth: '1200px', // Optional: Restricts the width for better readability
    lineHeight: '1.5', // Optional: Improves readability by increasing line spacing
  };

  const additional1TextStyle = {
    color: '#444141',
    fontSize: '20px',
    fontFamily: 'Poppins, sans-serif',
    fontWeight: '300',
    marginTop: '10px', // Reduces space between the two additional text blocks
    maxWidth: '1200px', // Optional: Restricts the width for better readability
    lineHeight: '1.5', // Optional: Improves readability by increasing line spacing
    textAlign: 'left', // Aligns text to the left
    alignSelf: 'flex-start', // Aligns to the left corner
  };

  const additional2TextStyle = {
    color: '#000000',
    fontSize: '25px',
    fontFamily: 'Poppins, sans-serif',
    fontWeight: '700',
    marginTop: '5px', // Reduces space between the two additional text blocks
    maxWidth: '1200px', // Optional: Restricts the width for better readability
    lineHeight: '1.5', // Optional: Improves readability by increasing line spacing
    textAlign: 'left', // Aligns text to the left
    alignSelf: 'flex-start', // Aligns to the left corner
  };

  const buttonContainerStyle = {
    display: 'flex',
    justifyContent: 'center',
    marginTop: '20px', // Adds space between the text and the buttons
  };

  const buttonStyle = {
    height: '60px',
    width: '250px',
    borderRadius: '10px',
    border: '2px solid black',
    backgroundColor: 'white',
    color: 'black',
    fontSize: '25px',
    fontWeight: 'bold',
    fontFamily: 'Poppins, sans-serif',
    margin: '0 10px', // Adds space between the buttons
    cursor: 'pointer',
    textDecoration: 'none', // Ensures no underline for links
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  };

  const boxesContainerStyle = {
    display: 'flex',
    justifyContent: 'space-around',
    marginTop: '20px',
  };

  const boxStyle = {
    height: '200px',
    width: '300px',
    backgroundColor: '#D9D9D9',
    borderRadius: '10px',
    margin: '0 7px', // Adds 7px gap between boxes
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '10px',
  };

  const iconStyle = {
    fontSize: '50px',
    marginBottom: '10px',
  };

  const boxTextStyle = {
    color: 'black',
    fontSize: '20px',
    fontWeight: '700',
    fontFamily: 'Poppins, sans-serif',
    textAlign: 'center',
  };

  return (
    <>
      <NavBar />
      <div style={mainContainerStyle}>
        <div style={eventEaseStyle}>EventEase</div>
        <div style={oneStopSolutionStyle}>One Stop Solution</div>
        <p style={descriptionStyle}>
          An event is such a special and intimate celebration; a sweetly constructed dream brought to life. All couples, we firmly believe, deserve to have an event that they can not only cherish and remember fondly. Eventease is a Nepali event website where you find the best event vendors according to your budget. Check prices, get verified reviews, and check work done by the vendors to secure your celebration. Save your time from unnecessary hassles. Eventease is a One-Stop-Shop where you get the best photographers, makeup artists, event cards, Baja, event venues, event car rental, and decorations for the best prices. Also, get event ideas and inspiration from our event blog and real events.
        </p>
        <div style={imagesContainerStyle}>
          <img src="/assets/images/about2.png" alt="About Us 1" style={{ ...imageStyle, marginRight: '-5px' }} />
          <img src="/assets/images/about1.png" alt="About Us 2" style={{ ...imageStyle, marginLeft: '-5px' }} />
        </div>
        <div style={planEventStyle}>
          <span style={otherTextStyle}>Plan Your</span>
          <span style={eventEaseTextStyle}> Event </span>
          <span style={otherTextStyle}>At EventEase</span>
        </div>
        <p style={additionalTextStyle}>
          We partner with you to craft exceptional events that meet your business objectives.
          Discover our services, and when you're ready, our events team is eager to assist you in getting started.
        </p>
        <div style={buttonContainerStyle}>
          <a href="/services" style={buttonStyle}>Our Services</a>
          <a href="/contact" style={buttonStyle}>Get In Touch</a>
        </div>
        <p style={additional1TextStyle}>
          Why choose us
        </p>
        <p style={additional2TextStyle}>
          EventEase Advantage's
        </p>
        <div style={boxesContainerStyle}>
          <div style={boxStyle}>
            <i className="fas fa-tools" style={iconStyle}></i>
            <p style={boxTextStyle}>One stop services shop for your event</p>
          </div>
          <div style={boxStyle}>
            <i className="fas fa-clock" style={iconStyle}></i>
            <p style={boxTextStyle}>Save your time from unnecessary hassle</p>
          </div>
          <div style={boxStyle}>
            <i className="fas fa-balance-scale" style={iconStyle}></i>
            <p style={boxTextStyle}>Compare vendor’s price & quality accordingly</p>
          </div>
          <div style={boxStyle}>
            <i className="fas fa-check-circle" style={iconStyle}></i>
            <p style={boxTextStyle}>Get verified reviews & work done by vendors</p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default AboutUs;
