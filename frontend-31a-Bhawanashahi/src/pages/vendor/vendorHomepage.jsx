import React from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
// import '../style/vendorHome.css';

const VendorHomePage = () => {
  return (
    <div className="vendor-home-container">
      <header className="vendor-header">
        <h1>Welcome to Vendor's Home Page</h1>
      </header>
      <nav className="vendor-nav">
        <ul>
          <li><Link to="/overview">Overview</Link></li>
          <li><Link to="/services">Services</Link></li>
          <li><Link to="/reviews">Reviews</Link></li>
          <li><Link to="/contact">Contact</Link></li>
          <li><Link to="/dashboard">Dashboard</Link></li>
        </ul>
      </nav>
      <main className="vendor-main">
        <section className="vendor-overview">
          <h2>Overview</h2>
          <p>Welcome to our vendor page. Here you can find all the information about our services and how we can help you.</p>
        </section>
        <section className="vendor-services">
          <h2>Services</h2>
          <ul>
            <li>Service 1</li>
            <li>Service 2</li>
            <li>Service 3</li>
            <li>Service 4</li>
          </ul>
        </section>
        <section className="vendor-contact">
          <h2>Contact Us</h2>
          <p>Email: vendor@example.com</p>
          <p>Phone: (123) 456-7890</p>
        </section>
      </main>
      <footer className="vendor-footer">
        <p>&copy; 2024 Vendor. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default VendorHomePage;
