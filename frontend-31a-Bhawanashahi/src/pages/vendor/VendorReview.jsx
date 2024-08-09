import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { deleteReviewApi, getAllReviewApi } from "../../apis/Api"; // Import your API functions
import VendorNavbar from '../../components/VendorHomebar';


const VendorReview = () => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    // Fetch all contacts when the component mounts
    getAllReviewApi()
      .then((res) => {
        setReviews(res.data.reviews); // Assuming the contacts are returned in the 'products' field of the response
      })
      .catch((error) => {
        toast.error('Failed to fetch contacts.');
        console.error(error);
      });
  }, []);

  //delete product Function
  const handleDelete = (id) => {
    const confirmDialog = window.confirm('Are you sure you want to delete the Review?')
    if(!confirmDialog){
      return;
    }else {
      //make api
      deleteReviewApi(id).then((res) =>{
        if(res.data.success === true){
          toast.success(res.data.message)
          window.location.reload ()
        }else{
          toast.error(res.data.message)
        }
      })
    }

  }
  return (
    <><div>
      <VendorNavbar />
    </div>
    <div className="m-4">
     
        <table className="table mt-2 table-bordered " >
          <thead className="table-light">
            <tr>
              <th>Name</th>
              <th>Rating</th>
              <th>Message</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {reviews.map((reviews) => (
              <tr key={reviews._id}>
                <td >{reviews.name}</td>
                <td>{reviews.rating}</td>
                <td>{reviews.review}</td>

                <td>
                  <button
                    onClick={() => handleDelete(reviews._id)}
                    className="btn btn-danger"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div></>
  );
};

export default VendorReview;