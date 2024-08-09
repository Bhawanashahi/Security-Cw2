import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { getSingleUserApi, updateUserApi } from "../apis/Api";
import { useParams, useNavigate } from 'react-router-dom';
import '../style/profile.css'; 

const Profile = () => {
    const { id } = useParams();
    const navigate = useNavigate(); // Initialize useNavigate hook

    const [user, setUser] = useState({
        fullName: "",
        email: "",
        phoneNo: ""
    });

    // useEffect(() => {
    //     getSingleUserApi(id)
    //         .then((res) => {
    //             const userData = res.data.user;
    //             setUser(userData);
    //         })
    //         .catch((error) => {
    //             console.error("Error fetching user:", error);
    //             toast.error("Failed to fetch user details");
    //         });
    // }, [id]);

    const handleInputChange = (e) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        updateUserApi(id, user)
            .then((res) => {
                if (res.data.success) {
                    toast.success(res.data.message);
                } else {
                    toast.error(res.data.message);
                }
            })
            .catch((error) => {
                console.error("Error updating user:", error);
                toast.error("Server Error");
            });
    };

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
                                <button className="list-group-item list-group-item-action active" onClick={() => navigate('/profile')}>PROFILE</button>
                                <button className="list-group-item list-group-item-action" onClick={() => navigate('/booking')}>BOOKINGS</button>
                                <button className="list-group-item list-group-item-action" onClick={() => navigate('/bookinghistory')}>BOOKING HISTORY</button>
                                <button className="list-group-item list-group-item-action" onClick={() => navigate('/cpw')}>CHANGE PASSWORD</button>
                                <button className="list-group-item list-group-item-action" onClick={() => {
                                    // Add your logout logic here
                                    navigate('/login');
                                }}>LOGOUT</button>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-9 profile-form">
                        <div className="profile-form-content">
                            <div className="text-center mb-3">
                                <img src="/assets/images/profile.png" className="rounded-circle mb-3" alt="Edit" />
                                <p>Edit picture</p>
                            </div>
                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label htmlFor="fullName" className="form-label">FullName</label>
                                    <input type="text" className="form-control" id="fullName" name="fullName" value={user.fullName} onChange={handleInputChange} placeholder="Bhawana Shahi" />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="email" className="form-label">Email</label>
                                    <input type="email" className="form-control" id="email" name="email" value={user.email} onChange={handleInputChange} placeholder="shahivawana61@gmail.com" />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="phoneNo" className="form-label">PhoneNo</label>
                                    <input type="text" className="form-control" id="phoneNo" name="phoneNo" value={user.phoneNo} onChange={handleInputChange} placeholder="9821689597" />
                                </div>
                                <button type="submit" className="btn btn-primary btn-block">Update</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Profile;
