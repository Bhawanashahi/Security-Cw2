import React from 'react';

const BookingStats = ({ totalBookings, successfulBookings }) => {
  return (
    <div className="booking-stats-container">
      <div className="stat-card">
        <h2>Total Bookings</h2>
        <p>{totalBookings}</p>
      </div>
      <div className="stat-card">
        <h2>Successful Bookings</h2>
        <p>{successfulBookings}</p>
      </div>
    </div>
  );
};

export default BookingStats;
