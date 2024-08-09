import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { getAllVenueApi } from "../apis/Api";
import '../style/venue.css'; // Make sure to create and import this CSS file
import { Button } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

const Venue = () => {
  const [vendors, setVendors] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch vendors when the component mounts
    getAllVenueApi().then((res) => {
      setVendors(res.data);
    });
  }, []);

  const handleDetailsClick = (vendorId) => {
    // Navigate to the details page with the vendorId
    navigate(`/vdetail/${vendorId}`);
  };
  const handleBookNowClick = (vendorId) => {
    navigate(`/book/${vendorId}`);
  };


  return (
    <>
      <Navbar />
      <div className="venue-container mt-5"> {/* Changed to 'venue-container' */}
        <div className="row">
          <div className="col-md-3">
            <div className="venue-filter"> {/* Changed to 'venue-filter' */}
              <h5>Filter</h5>
              <div className="mb-3">
                <label htmlFor="location">Location</label>
                <input type="text" className="form-control" id="location" placeholder="Enter location" />
              </div>
              <div className="mb-3">
                <label htmlFor="rating">Rating</label>
                <div id="rating">
                  <span>⭐</span>
                  <span>⭐</span>
                  <span>⭐</span>
                  <span>⭐</span>
                  <span>⭐</span>
                </div>
              </div>
              <div className="mb-3">
                <label htmlFor="price">By Price</label>
                <select className="form-control" id="price">
                  <option value="highToLow">High to Low</option>
                  <option value="lowToHigh">Low to High</option>
                </select>
              </div>
            </div>
          </div>
          <div className="col-md-9">
            <div className="venue-search-bar mb-4"> {/* Changed to 'venue-search-bar' */}
              <input type="text" className="form-control venue-search-input" placeholder="Search vendors" /> {/* Added 'venue-search-input' */}
              <Button className="venue-search-button" variant="primary"> {/* Changed to 'venue-search-button' */}
                <FontAwesomeIcon icon={faSearch} />
              </Button>
            </div>
            {vendors.map((vendor) => (
              <div key={vendor.vendorId} className="venue-vendor-card mb-4"> {/* Changed to 'venue-vendor-card' */}
                <div className="row align-items-center"> {/* Ensure content aligns vertically centered */}
                  <div className="col-md-8">
                    <div className="venue-vendor-info"> {/* Changed to 'venue-vendor-info' */}
                      <div className="d-flex justify-content-between align-items-center mb-2">
                        <h3 className="venue-vendor-title">{vendor.title}</h3> {/* Changed to 'venue-vendor-title' */}
                        <div className="venue-rating">⭐⭐⭐⭐⭐</div> {/* Changed to 'venue-rating' */}
                      </div>
                      <p><strong>Experience:</strong> {vendor.experience}</p>
                      <p><strong>Type:</strong> {vendor.type}</p>
                      <p><strong>Service Location:</strong> {vendor.location}</p>
                      <div className="venue-buttons text-center"> {/* Changed to 'venue-buttons' */}
                        <Button 
                          className="venue-btn-details me-2"  style={{marginLeft:'10px'}}
                          onClick={() => handleDetailsClick(vendor.venueid)}
                        >
                          Details
                        </Button>
                        <Button variant="primary" className="venue-btn-book" 
                        onClick={() => handleBookNowClick(vendor._id)}> {/* Changed to 'venue-btn-book' */}
                          Book Now
                        </Button>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <img
                      src={vendor.imageUrl}
                      className="img-fluid rounded venue-vendor-image"
                      alt={`Vendor ${vendor.venueId}`}
                    />
                  </div>
                </div>
              </div>
            ))}
            <div className="venue-pagination"> {/* Changed to 'venue-pagination' */}
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

export default Venue;
