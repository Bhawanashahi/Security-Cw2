import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { getAllMakeupApi } from "../apis/Api";
import { Button } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import '../style/makeup.css';

const Makeup = () => {
  const [vendors, setVendors] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getAllMakeupApi().then((res) => {
      setVendors(res.data);
    });
  }, []);

  const handleDetailsClick = (makeupId) => {
    navigate(`/mdetail/${makeupId}`);
  };

  const handleBookNowClick = (vendorId) => {
    navigate(`/book/${vendorId}`);
  };

  return (
    <>
      <Navbar />
      <div className="makeup-container mt-5">
        <div className="row">
          <div className="col-md-3">
            <div className="photo-filter">
              <h5>Filter</h5>
              <div className="mb-3">
                <label htmlFor="makeup-location">Location</label>
                <input type="text" className="form-control" id="makeup-location" placeholder="Enter location" />
              </div>
              <div className="mb-3">
                <label htmlFor="makeup-rating">Rating</label>
                <div id="makeup-rating">
                  <span>⭐</span>
                  <span>⭐</span>
                  <span>⭐</span>
                  <span>⭐</span>
                  <span>⭐</span>
                </div>
              </div>
              <div className="mb-3">
                <label htmlFor="makeup-price">By Price</label>
                <select className="form-control" id="makeup-price">
                  <option value="highToLow">High to Low</option>
                  <option value="lowToHigh">Low to High</option>
                </select>
              </div>
            </div>
          </div>
          <div className="col-md-9">
            <div className="makeup-search-bar mb-4">
              <input type="text" className="form-control makeup-search-input" placeholder="Search vendors" />
              <Button variant="primary" className="makeup-search-button">
                <FontAwesomeIcon icon={faSearch} />
              </Button>
            </div>
            {vendors.map((vendor) => (
              <div key={vendor._makeupId} className="makeup-vendor-card mb-4">
                <div className="row align-items-center">
                  <div className="col-md-8">
                    <div className="makeup-vendor-info">
                      <div className="d-flex justify-content-between align-items-center mb-2">
                        <h3 className="makeup-vendor-title">{vendor.title}</h3>
                        <div className="makeup-rating">⭐⭐⭐⭐⭐</div>
                      </div>
                      <p><strong>Experience:</strong> {vendor.experience}</p>
                      <p><strong>Type:</strong> {vendor.type}</p>
                      <p><strong>Service Location:</strong> {vendor.location}</p>
                      <div className="makeup-buttons text-center">
                        <Button 
                          className="makeup-btn-details mb-2" 
                          onClick={() => handleDetailsClick(vendor._id)}
                        >
                          Details
                        </Button>
                        <Button 
                          variant="primary" 
                          className="makeup-btn-book"
                          onClick={() => handleBookNowClick(vendor._id)}
                        >
                          Book Now
                        </Button>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-4 makeup-vendor-image-container">
                    <img 
                      src={vendor.imageUrl}
                      className="img-fluid rounded makeup-vendor-image"
                      alt={`Vendor ${vendor._id}`}
                    />
                  </div>
                </div>
              </div>
            ))}
            <div className="makeup-pagination">
              <Button variant="secondary">❮</Button>
              <Button variant="secondary">1</Button>
              <Button variant="secondary">2</Button>
              <Button variant="secondary">3</Button>
              <Button variant="secondary">4</Button>
              <Button variant="secondary">❯</Button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Makeup;
