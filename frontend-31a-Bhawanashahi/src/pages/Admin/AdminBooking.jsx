import React from 'react';
import { Table, Container } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import AdminNavbar from '../../components/AdminNavBar';
// Adjust the path as necessary
// import '../style/adminBooking.css';

const AdminBooking = () => {
    const bookings = [
        {
            name: 'Photolaya',
            price: 10000,
            location: 'Kathmandu',
            detailLocation: 'Gwarko',
            date: '9/9/2024',
        },
    ];

    return (
       <>
       <AdminNavbar/>
         <div className="main-layout">
      
      <Container className="content">
          <h2 className="my-4">Bookings</h2>
          <Table striped bordered hover className="booking-table">
              <thead>
                  <tr>
                      <th>#</th>
                      <th>Name</th>
                      <th>Price</th>
                      <th>Location</th>
                      <th>Detail Location</th>
                      <th>Date</th>
                  </tr>
              </thead>
              <tbody>
                  {bookings.map((booking, index) => (
                      <tr key={index}>
                          <td>{index + 1}</td>
                          <td>{booking.name}</td>
                          <td>{booking.price}</td>
                          <td>{booking.location}</td>
                          <td>{booking.detailLocation}</td>
                          <td>{booking.date}</td>
                      </tr>
                  ))}
              </tbody>
          </Table>
      </Container>
  </div>
       </>
      
    );
};

export default AdminBooking;
