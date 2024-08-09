import React, { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from 'react-router-dom';
import '../style/profile.css';

const BookingHistory = () => {
    const navigate = useNavigate();

    return (
        <>
            <div className="profile-header text-white">
                <img src="/assets/images/profile.png" className="rounded-circle profile-image" alt="Profile" />
                <div className="profile-header-info">
                    <h4>Bhawana Shahi</h4>
                    <p>shahivawana61@gmail.com</p>
                </div>
            </div>
            <div className="container mt-4 profile-container">
                <div className="row">
                    <div className="col-md-3 profile-sidebar d-flex align-items-center justify-content-center">
                        <div className="profile-sidebar-content">
                            <div className="list-group text-center">
                                <button className="list-group-item list-group-item-action" onClick={() => navigate('/profile')}>PROFILE</button>
                                <button className="list-group-item list-group-item-action active" onClick={() => navigate('/booking')}>BOOKINGS</button>
                                <button className="list-group-item list-group-item-action" onClick={() => navigate('/bookinghistory')}>BOOKING HISTORY</button>
                                <button className="list-group-item list-group-item-action" onClick={() => navigate('/cpw')}>CHANGE PASSWORD</button>
                                <button className="list-group-item list-group-item-action" onClick={() => {
                                    navigate('/login');
                                }}>LOGOUT</button>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-9 profile-form">
                       
                    </div>
                </div>
            </div>
        </>
    );
};

export default BookingHistory;
