import React from 'react';
import BookingStats from './bookingStats';
import GanttChart from './ganntchart'; // Assuming you have a GanttChart component
import '../../style/vendorDashboard.css';
import VendorNavbar from "../../components/VendorHomebar";

const VendorDashboard = () => {
  const totalBookings = 150; // Example data
  const successfulBookings = 120; // Example data

  return (
    <>
    <VendorNavbar/>
       
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h1>Vendor Dashboard</h1>
      </header>
      <main className="dashboard-main">
        <BookingStats totalBookings={totalBookings} successfulBookings={successfulBookings} />
        <GanttChart />
      </main>
    </div>
    </>
    
  );
};

export default VendorDashboard;
