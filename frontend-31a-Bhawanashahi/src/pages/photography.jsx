import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { getAllPhotoApi } from "../apis/Api";
import { Button } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import '../style/photography.css';

const Photography = () => {
  const [vendors, setVendors] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getAllPhotoApi().then((res) => {
      setVendors(res.data);
    });
  }, []);

  const handleDetailsClick = (photoId) => {
    navigate(`/pdetail/${photoId}`);
  };
  const handleBookNowClick = () => {
    navigate(`/book`);
  };


  return (
    <>
      <Navbar />
      <div className="photo-container mt-5">
        <div className="row">
          <div className="col-md-3">
            <div className="photo-filter">
              <h5>Filter</h5>
              <div className="mb-3">
                <label htmlFor="photo-location">Location</label>
                <input type="text" className="form-control" id="photo-location" placeholder="Enter location" />
              </div>
              <div className="mb-3">
                <label htmlFor="photo-rating">Rating</label>
                <div id="photo-rating">
                  <span>⭐</span>
                  <span>⭐</span>
                  <span>⭐</span>
                  <span>⭐</span>
                  <span>⭐</span>
                </div>
              </div>
              <div className="mb-3">
                <label htmlFor="photo-price">By Price</label>
                <select className="form-control" id="photo-price">
                  <option value="highToLow">High to Low</option>
                  <option value="lowToHigh">Low to High</option>
                </select>
              </div>
            </div>
          </div>
          <div className="col-md-9">
            <div className="photo-search-bar mb-4">
              <input type="text" className="form-control photo-search-input" placeholder="Search vendors" />
              <Button variant="primary" className="photo-search-button">
                <FontAwesomeIcon icon={faSearch} />
              </Button>
            </div>
            {vendors.map((vendor) => (
              <div key={vendor._photoId} className="photo-vendor-card mb-4">
                <div className="row align-items-center">
                  <div className="col-md-8">
                    <div className="photo-vendor-info">
                      <div className="d-flex justify-content-between align-items-center mb-2">
                        <h3 className="photo-vendor-title">{vendor.title}</h3>
                        <div className="photo-rating">⭐⭐⭐⭐⭐</div>
                      </div>
                      <p><strong>Experience:</strong> {vendor.experience}</p>
                      <p><strong>Type:</strong> {vendor.type}</p>
                      <p><strong>Service Location:</strong> {vendor.location}</p>
                      <div className="photo-buttons text-center">
                        <Button 
                          className="photo-btn-details mb-2" 
                          onClick={() => handleDetailsClick(vendor._id)}
                        >
                          Details
                        </Button>
                        <Button variant="primary" className="photo-btn-book" onClick={handleBookNowClick}>Book Now</Button>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-4" style={{height:'200px', marginBottom:'100px'}}>
                   
                      <img style={{height:'300px', marginButton:'300px'}}
                        src={vendor.imageUrl}
                        className="img-fluid rounded photo-vendor-image"
                        alt={`Vendor ${vendor._id}`}
                      />
                 
                  </div>
                </div>
              </div>
            ))}
            <div className="photo-pagination">
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

export default Photography;
