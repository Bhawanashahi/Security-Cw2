import React, { useState } from 'react';
import { toast } from 'react-toastify';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { createBookApi } from "../apis/Api";
import '../style/book.css';
import CustomDatePickerInput from './CustomDatePickerInput'; // Import the custom input component
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

const BookingForm = () => {
  const [name, setName] = useState('');
  const [date, setDate] = useState(new Date());
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [location, setLocation] = useState('');
  const [detailLocation, setDetailLocation] = useState('');

  const [nameError, setNameError] = useState('');
  const [dateError, setDateError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const [locationError, setLocationError] = useState('');
  const [detailLocationError, setDetailLocationError] = useState('');

  const navigate = useNavigate(); // Use useNavigate from react-router-dom

  const validate = () => {
    let isValid = true;

    setNameError('');
    setEmailError('');
    setPhoneError('');
    setDateError('');
    setLocationError('');
    setDetailLocationError('');

    if (name.trim() === '') {
      setNameError("Name is required");
      isValid = false;
    }
    if (!date) {
      setDateError("Date is required");
      isValid = false;
    }
    if (email.trim() === '') {
      setEmailError("Email is required");
      isValid = false;
    }
    if (phone.trim() === '') {
      setPhoneError("Phone no is required");
      isValid = false;
    }
    if (location.trim() === '') {
      setLocationError("Location is required");
      isValid = false;
    }
    if (detailLocation.trim() === '') {
      setDetailLocationError("Detail location is required");
      isValid = false;
    }

    return isValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const isValid = validate();
    if (!isValid) {
      return;
    }

    const data = {
      email: email,
      name: name,
      phone: phone,
      date: date,
      location: location,
      detailLocation: detailLocation,
    };

    createBookApi(data)
      .then((res) => {
        if (res.data.success === false) {
          toast.error(res.data.message);
        } else {
          toast.success(res.data.message);
        }
      })
      .catch(err => {
        toast.error('Server Error');
        console.log(err.message);
      });
  };

  const handleClose = () => {
   // Navigate to PDetailPage
  };

  return (
    <div className="booking-form-container" style={{ backgroundImage: `url(${'../assets/images/bg.png'})`, height: '1024px', width: '1440px' }}>
      <div className="close-icon" onClick={handleClose}>
        <FontAwesomeIcon icon={faTimes} />
      </div>
      <form onSubmit={handleSubmit} className="booking-form">
        <h2>Book your services</h2>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              style={{
                border: '1px solid #920808', borderRadius: '10px', backgroundColor: '#D9D9D9'
              }}
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="form-control"
            />
            {nameError && <p className="text-danger">{nameError}</p>}
          </div>
          <div className="form-group">
            <label htmlFor="date">Select date</label>
            <DatePicker
              selected={date}
              onChange={(date) => setDate(date)}
              customInput={<CustomDatePickerInput />} // Use the custom input component
            />
            {dateError && <p className="text-danger">{dateError}</p>}
          </div>
        </div>
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              style={{
                border: '1px solid #920808', borderRadius: '10px', backgroundColor: '#D9D9D9'
              }}
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-control"
            />
            {emailError && <p className="text-danger">{emailError}</p>}
          </div>
          <div className="form-group">
            <label htmlFor="phone">Phone No</label>
            <input
              style={{
                border: '1px solid #920808', borderRadius: '10px', backgroundColor: '#D9D9D9'
              }}
              type="tel"
              id="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="form-control"
            />
            {phoneError && <p className="text-danger">{phoneError}</p>}
          </div>
        </div>
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="location">Location</label>
            <select
              style={{
                border: '1px solid #920808', borderRadius: '10px', backgroundColor: '#D9D9D9'
              }}
              id="location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="form-control"
            >
              <option value="">Select Location</option>
              <option value="location1">Location 1</option>
              <option value="location2">Location 2</option>
              <option value="location3">Location 3</option>
            </select>
            {locationError && <p className="text-danger">{locationError}</p>}
          </div>
          <div className="form-group">
            <label htmlFor="detailLocation">Add detail location</label>
            <input
              style={{
                border: '1px solid #920808', borderRadius: '10px', backgroundColor: '#D9D9D9'
              }}
              type="text"
              id="detailLocation"
              value={detailLocation}
              onChange={(e) => setDetailLocation(e.target.value)}
              className="form-control"
            />
            {detailLocationError && <p className="text-danger">{detailLocationError}</p>}
          </div>
        </div>
        <button type="submit" className="btn btn-primary">
          Book Now
        </button>
      </form>
    </div>
  );
};

export default BookingForm;
