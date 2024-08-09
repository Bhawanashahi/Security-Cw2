import React, { useState } from "react";
import { toast } from 'react-toastify';
import { createReviewApi } from "../apis/Api";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import '../style/review.css';

const Review = () => {
  const [name, setName] = useState('');
  const [rating, setRating] = useState('');
  const [review, setReview] = useState('');
  const [nameError, setNameError] = useState('');
  const [ratingError, setRatingError] = useState('');
  const [reviewError, setReviewError] = useState('');

  const validate = () => {
    let isValid = true;

    setNameError('');
    setReviewError('');
    setRatingError('');

    if (rating.trim() === '') {
      setRatingError("Rating is required");
      isValid = false;
    }
    if (review.trim() === '') {
      setReviewError("Review is required");
      isValid = false;
    }
    if (name.trim() === '') {
      setNameError("Name is required");
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
      name: name,
      rating: rating,
      review: review
    };

    createReviewApi(data)
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
    <div className="booking-form-container"  style={{ backgroundImage: `url(${'../assets/images/bg.png'})`, height: '1024px', width: '1440px' }}>
      <div className="close-icon" >
        <FontAwesomeIcon icon={faTimes} />
      </div>
      <form onSubmit={handleSubmit} className="booking-form">
        <h2 style={{
          textAlign: 'center',
          color: '#000000',
          fontSize: '30px',
          fontWeight: 'bold',
          marginBottom: '10px'
        }}>Review</h2>
        <p style={{
          textAlign: 'center',
          color: '#625F5F',
          fontSize: '15px',
          fontWeight: 'normal'
        }}>Write review about the service</p>
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              style={{
                border: '1px solid #920808',
                borderRadius: '10px',
                backgroundColor: '#D9D9D9'
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
            <label htmlFor="type">Rating</label>
            <select
              style={{
                border: '1px solid #920808',
                borderRadius: '10px',
                backgroundColor: '#D9D9D9'
              }}
              onChange={(e) => setRating(e.target.value)}
              className="form-control"
              id="type"
            >
              <option value="">Select Rating</option>
              <option value="one">&#9733;</option>
              <option value="two">&#9733;&#9733;</option>
              <option value="three">&#9733;&#9733;&#9733;</option>
              <option value="four">&#9733;&#9733;&#9733;&#9733;</option>
              <option value="five">&#9733;&#9733;&#9733;&#9733;&#9733;</option>
            </select>
            {ratingError && <p className="text-danger">{ratingError}</p>}
          </div>
        </div>

        <div className="form-row">
          <div className="form-group" style={{ marginBottom: '10px' }}>
            <label htmlFor="review">Your Review</label>
            <textarea
              style={{
                width: '1030px',
                height: '200px',
                border: '1px solid #920808',
                borderRadius: '10px',
                backgroundColor: '#D9D9D9',
                padding: '10px'
              }}
              id="review"
              value={review}
              onChange={(e) => setReview(e.target.value)}
              className="form-control"
            />
            {reviewError && <p className="text-danger">{reviewError}</p>}
          </div>
        </div>

        <button type="submit" className="btn btn-primary">
          Send Review
        </button>
      </form>
    </div>
  );
};

export default Review;
