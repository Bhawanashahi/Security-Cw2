import React, { useState } from 'react'
import { createPetProductApi } from '../../apis/Api';
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import AdminNavbar from '../../components/AdminNavBar';
const AddPetProduct = () => {

    // make useState
  const [petProductName, setPetProductName] = useState("");
  const [petProductPrice, setPetProductPrice] = useState("");
//   const [productCategory, setProductCategory] = useState("");
  // const [productDescription, setProductDescription] = useState("");

  // Make useState for image
  const [petProductImage, setPetProductImage] = useState(null);
  const [petPreviewImage, setPetPreviewImage] = useState(null);

  // Function for image upload and preview\
  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    setPetProductImage(file);
    setPetPreviewImage(URL.createObjectURL(file));
  };
  const navigate = useNavigate();

const handleCancel = () => {

  // Navigate to the admin page
  navigate("/admin/petproduct"); 
};
  


  // handle submit
  const handleSubmit = (e) => {
    e.preventDefault();

    // Making logical form data
    const formData = new FormData();
    formData.append("petProductName", petProductName);
    formData.append("petProductPrice", petProductPrice);
    // formData.append("productCategory", productCategory);
    // formData.append("productDescription", productDescription);
    formData.append("petProductImage", petProductImage);

    // Making API Call
    createPetProductApi(formData)
      .then((res) => {
        if (res.data.success == false) {
          toast.error(res.data.message);
        } else {
          toast.success(res.data.message);
        }
      })
      .catch((err) => {
        toast.error("Server Error");
        console.log(err.message);
      });
  };

  return (
    <><div>
    <AdminNavbar />
  </div>
  <div className="container mt-4">
    <div className="row justify-content-center">
      <div className="col-md-6">
        <div className="border border-dark p-4">
          <h2 className="text-center mb-4" style={{ color: '#D8812F', fontWeight: 'bold' }}>Add Pet Products</h2>
          <form>
            <div className="mb-2">
              <label>Pet Name</label>
              <input
                onChange={(e) => setPetProductName(e.target.value)}
                type="text"
                className="form-control mb-2"
                placeholder="Enter pet name"
              />
              <label>Pet Price</label>
              <input
                onChange={(e) => setPetProductPrice(e.target.value)}
                type="number"
                className="form-control mb-2"
                placeholder="Enter product price"
              />
               {/* <label>Pet Category</label>
              <select
                onChange={(e) => setProductCategory(e.target.value)}
                className="form-control mb-2"
              >
                <option value="Dog">Dog</option>
                <option value="Cat">Cat</option>
                <option value="Bird">Bird</option>
              </select> */}
  
               {/* <label>Pet Description</label>
              <textarea
                onChange={(e) => setProductDescription(e.target.value)}
                name=""
                id=""
                cols="3"
                rows="3"
                className="form-control"
                placeholder="Enter description"
              ></textarea>  */}
   
              <label>Pet Image</label>
              <input
                onChange={handleImageUpload}
                type="file"
                className="form-control mb-2"
              />
            </div>
            <div>
              <button
                onClick={handleSubmit}
                type="button"
                className="btn btn-success me-3"
                style={{ backgroundColor: '#D8812F' }}
              >
                Add Pet Product
              </button>
              <button
                type="button"
                className="btn btn-danger"
                onClick={() => handleCancel()}
                style={{ backgroundColor: '#D8812F' }}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
      <div className="col-md-6">
        {petPreviewImage && (
          <img
            src={petPreviewImage}
            className="img-fluid rounded object-fit-cover mt-2"
            alt="blog Image"
          />
        )}
      </div>
    </div>
  </div>
  
    </>
  );
};
 


export default AddPetProduct