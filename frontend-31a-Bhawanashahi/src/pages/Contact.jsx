import React, { useState } from "react";
import { toast } from 'react-toastify';
import { createContactApi } from "../apis/Api";
import 'bootstrap/dist/css/bootstrap.min.css';
import NavBar from "../components/Navbar";
import 'react-toastify/dist/ReactToastify.css';
import '../style/contact.css';
import Footer from "../components/Footer";


const Contact = () => {
  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactPhone, setContactPhone] = useState('');
  const [contactMessage, setContactMessage] = useState('');

  const [contactNameError, setContactNameError] = useState('');
  const [contactEmailError, setContactEmailError] = useState('');
  const [contactPhoneError, setContactPhoneError] = useState('');
  const [contactMessageError, setContactMessageError] = useState('');

  const validate = () => {
    let isValid = true;

    setContactNameError('');
    setContactEmailError('');
    setContactPhoneError('');
    setContactMessageError('');

    if (contactEmail.trim() === '') {
      setContactEmailError("Email is required");
      isValid = false;
    }
    if (contactPhone.trim() === '') {
      setContactPhoneError("Phone no is required");
      isValid = false;
    }
    if (contactMessage.trim() === '') {
      setContactMessageError("Message is required");
      isValid = false;
    }
    if (contactName.trim() === '') {
      setContactNameError("Name is required");
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
      contactEmail: contactEmail,
      contactName: contactName,
      contactPhone:contactPhone,
      contactMessage: contactMessage
    };

    createContactApi(data)
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

  return (
    <>
      <NavBar />

      <div className="container mt-5">
        <div className="mb-3 text-center">
          <h2 className="header-title">GET IN <span>TOUCH,</span> WITH US</h2>
        </div>
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="border p-4 rounded custom-form-container border-black">
              <form>
                <div className="form-group mb-3">
                  <input
                    onChange={(e) => setContactName(e.target.value)}
                    type="text"
                    className="form-control custom-input"
                    id="name"
                    placeholder="Fullname"
                  />
                  {contactNameError && <p className="text-danger">{contactNameError}</p>}
                </div>
                <div className="form-group mb-3">
                  <input
                    onChange={(e) => setContactEmail(e.target.value)}
                    type="email"
                    className="form-control custom-input"
                    id="email"
                    placeholder="Email"
                  />
                  {contactEmailError && <p className="text-danger">{contactEmailError}</p>}
                </div>
                <div className="form-group mb-3">
                  <input
                    onChange={(e) => setContactPhone(e.target.value)}
                    type="phone"
                    className="form-control custom-input"
                    id="phone"
                    placeholder="Phone No"
                  />
                  {contactPhoneError && <p className="text-danger">{contactPhoneError}</p>}
                </div>
                <div className="form-group mb-3">
                  <textarea
                    onChange={(e) => setContactMessage(e.target.value)}
                    className="form-control custom-textarea"
                    id="message"
                    rows="6"
                    placeholder="Message"
                  ></textarea>
                  {contactMessageError && <p className="text-danger">{contactMessageError}</p>}
                </div>
                <div className="form-group mb-3 text-center">
                  <button
                    onClick={handleSubmit}
                    className="btn btn-submit"
                  >
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
          <div className="col-md-6 mt-3 mt-md-0">
            <div className="map-container mt-4">
              <iframe
                title="Google Maps"
                width="100%"
                height="600"
                loading="lazy"
                allowFullScreen
                frameBorder="0"
                className="custom-map"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3531.3344400403693!2d85.31808691451583!3d27.708955882789484!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb18573d796fcb%3A0x16520dd5f924cd25!2sDillibazar%2C%20Kathmandu%2044600!5e0!3m2!1sen!2snp!4v1641710014990!5m2!1sen!2snp"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Contact;
