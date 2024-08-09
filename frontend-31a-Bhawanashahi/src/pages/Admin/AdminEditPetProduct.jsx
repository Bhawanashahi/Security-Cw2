import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getSinglePetProductApi, updatePetProductApi } from "../../apis/Api";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import AdminNavbar from "../../components/AdminNavBar";

const AdminEditPetProduct = () => {
  //receive product id from url
  const { id } = useParams();

  //navigator
  // const navigate = useNavigate()

  //useEffect to fetch product details
  useEffect(() => {
    getSinglePetProductApi(id).then((res) => {
      console.log(res.data);
      setProductName(res.data.product.petProductName);
      setProductPrice(res.data.product.petProductPrice);
    //   setProductCategory(res.data.product.productCategory);
      // setProductDescription(res.data.product.productDescription);
      setOldImage(res.data.product.petProductImageUrl);
    });
  }, [id]);

  //make useState
  const [petProductName, setPetProductName] = useState("");
  const [petProductPrice, setPetProductPrice] = useState("");
//   const [productCategory, setProductCategory] = useState("");
  // const [productDescription, setProductDescription] = useState("");

  //make useState for image
  const [oldImage, setOldImage] = useState("");
  const [petProductImage, setPetProductImage] = useState(null);
  const [petPreviewImage, setPetPreviewImage] = useState(null);

  //handle image upload
  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    setPetProductImage(file);
    setPetPreviewImage(URL.createObjectURL(file));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(petProductName, petProductPrice,  );
    console.log(petProductImage);

    // make a form data
    const formData = new FormData();
    formData.append("petProductName", petProductName);
    formData.append("petProductPrice", petProductPrice);
    // formData.append("productCategory", productCategory);
    // formData.append("productDescription", productDescription);
    formData.append("petProductImage", petProductImage);
    // make api call
    updatePetProductApi(id, formData)
      .then((res) => {
        // res.send
        if (res.data.success == true) {
          toast.success(res.data.message);
          // navigate('/admin/dashboard')
        } else {
          toast.error(res.data.message);
        }
      })
      .catch((err) => {
        toast.error("Server Error");
      });
  };

  return (
    <>
      <div>
        <AdminNavbar />
      </div>
      <div className="comtainer mt-4">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="border border-dark p-4">
              <h2 className="text-center mb-4">
                Update : {petProductName}
                <span className="text-success"></span>
              </h2>
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="petProductName" className="form-label">
                    Pet Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="petProductName"
                    value={petProductName}
                    onChange={(e) => setPetProductName(e.target.value)}
                    placeholder="Enter pet Product Name"
                  />
                </div>
                {/* <div className="mb-3">
                  <label htmlFor="productDescription">Pet Category</label>
                  <select
                    className="form-control mb-3"
                    onChange={(e) => setProductCategory(e.target.value)}
                    value={productCategory}
                  >
                    <option value={null}>Pet Category</option>
                    <option value={"Dog"}>Dog</option>
                    <option value={"Cat"}>Cat</option>
                    <option value={"Bird"}>Bird</option>
                  </select>
                </div> */}

                {/* <div className="mb-3">
                  <label htmlFor="productDescription" className="form_label">
                    Pet Description
                  </label>
                  <input
                    onChange={(e) => setProductDescription(e.target.value)}
                    value={productDescription}
                    type="text"
                    className="form-control mb-3"
                    placeholder="Enter Product Description"
                  />
                </div> */}

                <div className="mb-3">
                  <label htmlFor="petProductImage" className="form-label">
                    Pet Image
                  </label>
                  <input
                    type="file"
                    className="form-control"
                    id="petProductImage"
                    onChange={handleImageUpload}
                  />
                </div>
                {/* {previewImage && (
                              <img
                                  src={previewImage}
                                  alt="Product Preview"
                                  className="img-fluid rounded"
                                  style={{ maxHeight: "180px" }} />
                          )} */}

                <Link
                  onClick={handleSubmit}
                  className="btn btn-outline-dark rounded-pill me-2"
                  style={{ transition: "0.3s" }}
                  onMouseEnter={(e) =>
                    (e.target.style.backgroundColor = "green")
                  }
                  onMouseLeave={(e) => (e.target.style.backgroundColor = "D8812F")}
                  to={"/admin/product"}
                >
                  Update Product
                </Link>
                <Link
                  type="close"
                  className=" btn btn-outline-dark rounded-pill me-2"
                  style={{ transition: "0.3s" }}
                  onMouseEnter={(e) =>
                    (e.target.style.backgroundColor = "green")
                  }
                  onMouseLeave={(e) => (e.target.style.backgroundColor = "")}
                  to={"/admin/product"}
                >
                  Close
                </Link>
              </form>
            </div>
          </div>
          <div className="col-md-3">
            <div className="border border-dark p-4">
              <h6>Old Image</h6>
              <img
                src={oldImage}
                alt=""
                className="object-fit-cover rounded-3"
                height={170}
                width={180}
              />
              <hr />
              {petPreviewImage && (
                <>
                  <h6 className="mt-2">New Image</h6>
                  <img
                    src={petPreviewImage}
                    alt=""
                    className="object-fit-cover rounded-3"
                    height={170}
                    width={180}
                  />
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminEditPetProduct;