import React, { useState } from "react";
import { createPhotoApi } from "../../apis/Api";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import VendorNavbar from "../../components/VendorHomebar";

const AddPhotoVendorPage = () => {
  const [title, setTitle] = useState("");
  const [experience, setExperience] = useState("");
  const [type, setType] = useState("");
  const [payment, setPayment] = useState("");
  const [delivery, setDelivery] = useState("");
  const [travel, setTravel] = useState("");
  const [location, setLocation] = useState("");
  const [coverImage, setCoverImage] = useState(null);
  const [menuImages, setMenuImages] = useState([]);
  const [previewCoverImage, setPreviewCoverImage] = useState(null);
  const [previewMenuImages, setPreviewMenuImages] = useState([]);

  const handleCoverImageUpload = (event) => {
    const file = event.target.files[0];
    setCoverImage(file);
    setPreviewCoverImage(URL.createObjectURL(file));
  };

  const handleMenuImagesUpload = (event) => {
    const files = Array.from(event.target.files);
    setMenuImages(files);
    setPreviewMenuImages(files.map(file => URL.createObjectURL(file)));
  };

  const navigate = useNavigate();

  const handleCancel = () => {
    setTitle("");
    setExperience("");
    setType("");
    setPayment("");
    setDelivery("");
    setTravel("");
    setLocation("");
    setCoverImage(null);
    setMenuImages([]);
    setPreviewCoverImage(null);
    setPreviewMenuImages([]);

    navigate("/vendor/photo");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("experience", experience);
    formData.append("type", type);
    formData.append("payment", payment);
    formData.append("delivery", delivery);
    formData.append("travel", travel);
    formData.append("location", location);
    formData.append("coverImage", coverImage);
    menuImages.forEach((image, index) => {
      formData.append("menuImages", image);
    });

    createPhotoApi(formData)
      .then((res) => {
        if (res.data.success === true) {
          toast.success(res.data.message);
        } else {
          toast.error(res.data.message);
        }
      })
      .catch((err) => {
        toast.error("Server Error");
        console.error(err.message);
      });
  };

  return (
    <>
      <VendorNavbar/>
      <div className="container mt-4" style={{ borderColor: '#920808' }}>
        <div className="row justify-content-center">
          <div className="col-md-8">
            <div className="border border-dark p-4">
              <h3 className="text-center mb-4" style={{ color: '#920808', fontWeight: 'bold' }}>Add Photography Vendor</h3>
              <form>
                <div className="mb-2">
                  <label htmlFor="title">Name</label>
                  <input
                    onChange={(e) => setTitle(e.target.value)}
                    type="text"
                    className="form-control"
                    id="title"
                  />
                </div>

                <div className="mb-2">
                  <label htmlFor="experience">Experience</label>
                  <textarea
                    onChange={(e) => setExperience(e.target.value)}
                    className="form-control"
                    id="experience"
                    rows="3"
                  ></textarea>
                </div>
                <div className="mb-2">
                  <label htmlFor="type">Type</label>
                  <select
                    onChange={(e) => setType(e.target.value)}
                    className="form-control"
                    id="type"
                  >
                    <option value="">Select Type</option>
                    <option value="Individual">Individual</option>
                    <option value="Team">Team</option>
                  </select>
                </div>
                <div className="mb-2">
                  <label htmlFor="payment">Payment</label>
                  <select
                    onChange={(e) => setPayment(e.target.value)}
                    className="form-control"
                    id="payment"
                  >
                    <option value="">Select Payment</option>
                    <option value="25% Advance">25% Advance</option>
                    <option value="50% Advance">50% Advance</option>
                  </select>
                </div>
                <div className="mb-2">
                  <label htmlFor="delivery">Delivery Within</label>
                  <textarea
                    onChange={(e) => setDelivery(e.target.value)}
                    className="form-control"
                    id="delivery"
                    rows="3"
                  ></textarea>
                </div>

                <div className="mb-2">
                  <label htmlFor="travel">Travel Cost</label>
                  <input
                    onChange={(e) => setTravel(e.target.value)}
                    type="text"
                    className="form-control"
                    id="travel"
                  />
                </div>
                <div className="mb-2">
                  <label htmlFor="location">Location</label>
                  <input
                    onChange={(e) => setLocation(e.target.value)}
                    type="text"
                    className="form-control"
                    id="location"
                  />
                </div>

                <div className="mb-2">
                  <label htmlFor="coverImage">Cover Image</label>
                  <input
                    onChange={handleCoverImageUpload}
                    type="file"
                    className="form-control"
                    id="coverImage"
                  />
                </div>

                <div className="mb-2">
                  <label htmlFor="menuImages">Menu Images</label>
                  <input
                    onChange={handleMenuImagesUpload}
                    type="file"
                    className="form-control"
                    id="menuImages"
                    multiple
                  />
                </div>

                <div>
                  <button
                    onClick={handleSubmit}
                    type="button"
                    className="btn btn-success me-3"
                    style={{ color: '#920808', fontWeight: 'bold', backgroundColor: 'white' }}
                  >
                    Add Vendor
                  </button>
                  <button
                    type="button"
                    className="btn btn-danger"
                    onClick={handleCancel}
                    style={{ backgroundColor: '#920808' }}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
          <div className="col-md-4">
            {previewCoverImage && (
              <img
                src={previewCoverImage}
                className="img-fluid rounded object-fit-cover mt-2"
                alt="cover"
              />
            )}
            {previewMenuImages.map((image, index) => (
              <img
                key={index}
                src={image}
                className="img-fluid rounded object-fit-cover mt-2"
                alt={`menu-${index}`}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default AddPhotoVendorPage;
