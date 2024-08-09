import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { getSingleVenueApi, getSingleReviewApi } from "../apis/Api";
import '../style/vdetail.css';
import { Button, Image } from "react-bootstrap";

const VenueDetail = () => {
  const [vendor, setVendor] = useState(null);
  const [review, setReview] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentDate, setCurrentDate] = useState(new Date());
  const { id } = useParams();

  useEffect(() => {
    const fetchVenue = async () => {
      try {
        const response = await getSingleVenueApi(id);
        if (response.data) {
          setVendor(response.data);
          setError(null);
        } else {
          setError("Unexpected API response structure");
        }
      } catch (error) {
        setError("Error fetching photo");
      } finally {
        setLoading(false);
      }
    };

    fetchVenue();
  }, [id]);

  const handlePrevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  const renderCalendar = () => {
    const month = currentDate.toLocaleString('default', { month: 'long' });
    const year = currentDate.getFullYear();
    const daysInMonth = new Date(year, currentDate.getMonth() + 1, 0).getDate();
    const firstDayIndex = new Date(year, currentDate.getMonth(), 1).getDay();
    const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
    const emptyCells = Array.from({ length: firstDayIndex }, () => null);
    const allCells = [...emptyCells, ...days];
    const weeks = [];

    for (let i = 0; i < allCells.length; i += 7) {
      weeks.push(allCells.slice(i, i + 7));
    }

    return (
      <div className="calendar">
        <div className="calendar-header">
          <button onClick={handlePrevMonth}>{"<"}</button>
          <span>{`${month} ${year}`}</span>
          <button onClick={handleNextMonth}>{">"}</button>
        </div>
        <hr className="calendar-divider" />
        <div className="calendar-body">
          <div className="calendar-row">
            <div className="calendar-day">Sun</div>
            <div className="calendar-day">Mon</div>
            <div className="calendar-day">Tue</div>
            <div className="calendar-day">Wed</div>
            <div className="calendar-day">Thu</div>
            <div className="calendar-day">Fri</div>
            <div className="calendar-day">Sat</div>
          </div>
          {weeks.map((week, weekIndex) => (
            <div className="calendar-row" key={weekIndex}>
              {week.map((day, dayIndex) => {
                const date = day ? `${year}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}` : null;
                const isBooked = date && bookedDates.includes(date);
                return (
                  <div
                    className={`calendar-day ${isBooked ? 'booked' : ''}`}
                    key={dayIndex}
                  >
                    {day}
                  </div>
                );
              })}
            </div>
          ))}
        </div>
        <div className="calendar-legend">
          <div className="calendar-legend-item">
            <div className="calendar-legend-symbol booked"></div>
            <span>Booked</span>
          </div>
        </div>
      </div>
    );
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!vendor) {
    return <div>No vendor data available</div>;
  }

  // Sample booked dates data (replace with actual fetched data)
  const bookedDates = ['2024-05-02', '2024-05-17'];

  return (
    <>
      <Navbar />
      <div className="container mt-5">
        <div className="row">
          <div className="col-md-6">
            <div className="vendor-image-container">
              <Image
                src={vendor.imageUrl}
                className="img-fluid rounded vendor-image"
                alt={vendor.title}
                fluid
              />
            </div>
          </div>
          <div className="col-md-6">
        
              <h3 className="vendor-title">{vendor.title}</h3>
              <div className="price-estimate">
                <span>Per day price estimate:</span>
                <span>Price Info</span>
              </div>
             
              <div className="details-container">
                <div className="row">
                  <div className="col-md-6">
                    <div className="detail-item">
                      <p>Experience:</p>
                      <strong>{vendor.experience}</strong>
                    </div>
                    <div className="detail-item">
                      <p>Type:</p>
                      <strong>{vendor.type}</strong>
                    </div>
                    <div className="detail-item">
                      <p>Delivery Time:</p>
                      <strong>{vendor.delivery}</strong>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="detail-item">
                      <p>Travel Cost:</p>
                      <strong>{vendor.travel}</strong>
                    </div>
                    <div className="detail-item">
                      <p>Payment Term:</p>
                      <strong>{vendor.payment}</strong>
                    </div>
                    <div className="detail-item">
                      <p>Services offered location:</p>
                      <strong>{vendor.location}</strong>
                    </div>
                  </div>
                </div>
              </div>
              <Button variant="primary" className="book-now">Book Now</Button>
            </div>
         
        </div>

        <div className="photos-section mt-5">
          <h4>PHOTOS</h4>
          <div className="row">
            {['/assets/images/pm1.png', '/assets/images/pm2.png', '/assets/images/pm3.png', '/assets/images/pm4.png', '/assets/images/pm5.png', '/assets/images/pm6.png'].map((src, index) => (
              <div className="col-md-4 mb-4" key={index}>
                <Image src={src} className="img-fluid rounded" alt={`Photo ${index + 1}`} fluid style={{ height: '450px', width: '400px', objectFit: 'cover' }} />
              </div>
            ))}
          </div>
        </div>

        <div className="bookings-section mt-5">
          <h4>BOOKINGS</h4>
          <div className="row">
            <div className="col-md-12 mb-4">
              {renderCalendar()}
            </div>
          </div>
        </div>

        <div className="reviews-section mt-5">
          <h4>REVIEWS</h4>
          <div className="rating">
            <span>4.0 ratings</span> (50 Reviews)
          </div>
          <div className="reviews">
            {review && review.map((review, index) => (
              <div className="review" key={index}>
                <h5>{review.name}</h5>
                <p>{review.review}</p>
                <div className="review-rating">{review.rating} stars</div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default VenueDetail;
