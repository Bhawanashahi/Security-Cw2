import React from 'react';
import styled from 'styled-components';
import '../style/footer.css';

const FooterContainer = styled.footer`
  background-color: #d8812f;
  padding: 10px 0;  /* Adjusted padding to set the height to 100px */
  text-align: center;
  color: black;
`;

const FooterContent = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 10px 0;  /* Adjusted padding to set the height to 100px */

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const ContactSection = styled.div`
  flex: 1;

  h4 {
    margin-bottom: 10px;
  }
`;

const QuickLinksSection = styled.div`
  flex: 1;

  ul {
    list-style: none;
    padding: 0;

    li {
      margin-bottom: 8px;
    }

    a {
      text-decoration: none;
      color: black;
      &:hover {
        color: #007bff;
      }
    }
  }
`;

const SocialSection = styled.div`
  flex: 1;

  ul {
    list-style: none;
    padding: 0;
    display: flex;
    justify-content: space-around;

    li {
      margin-bottom: 8px;
    }

    a {
      text-decoration: none;
      color: black;
      &:hover {
        color: #007bff;
      }
    }
  }
`;

const FooterBottom = styled.div`
  margin-top: 10px;  /* Adjusted margin to set the height to 100px */
  color: black;
`;

const Footer = () => {
  return (
    <footer className="footer">
    <div className="footer-section">
      <h3>Contact Us</h3>
      <p>Email: EventEase@gmail.com</p>
      <p>Phone.No: 980000000</p>
    </div>
    <div className="footer-section">
      <h3>Quick Links</h3>
      <ul>
        <li>Home</li>
        <li>Service</li>
        <li>Gallery</li>
        <li>Blogs</li>
      </ul>
    </div>
    <div className="footer-section">
      <h3>Quick Links</h3>
      <ul>
        <li>Vendor</li>
        <li>Vendor Guidelines</li>
        <li>Terms and Conditions</li>
        <li>Privacy and Policy</li>
      </ul>
    </div>
    <div className="footer-section">
      <h3>Connect with us</h3>
      <div className="social-icons">
        <a href="https://facebook.com" className="facebook">
          <i className="fab fa-facebook-f"></i>
        </a>
        <a href="https://instagram.com" className="instagram">
          <i className="fab fa-instagram"></i>
        </a>
        <a href="https://twitter.com" className="twitter">
          <i className="fab fa-twitter"></i>
        </a>
      </div>
    </div>
  </footer>
  );
};

export default Footer;
