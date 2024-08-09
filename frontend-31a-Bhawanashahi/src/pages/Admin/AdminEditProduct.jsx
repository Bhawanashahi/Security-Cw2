import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getSingleProductApi, updateProductApi } from "../../apis/Api";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import AdminNavbar from "../../components/AdminNavBar";

const AdminEditProduct = () => {
  //receive product id from url
  const { id } = useParams();

 
  // const navigate = useNavigate()

  //useEffect to fetch product details
  useEffect(() => {
    getSingleProductApi(id).then((res) => {
      console.log(res.data);
      setProductName(res.data.product.productName);
      setProductPrice(res.data.product.productPrice);
      setProductCategory(res.data.product.productCategory);
      // setProductDescription(res.data.product.productDescription);
      setOldImage(res.data.product.productImageUrl);
    });
  }, [id]);

  //make useState
  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productCategory, setProductCategory] = useState("");
  // const [productDescription, setProductDescription] = useState("");

  //make useState for image
  const [oldImage, setOldImage] = useState("");
  const [productImage, setProductImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);

  //handle image upload
  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    setProductImage(file);
    setPreviewImage(URL.createObjectURL(file));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(productName, productPrice, productCategory, );
    console.log(productImage);

    // make a form data
    const formData = new FormData();
    formData.append("productName", productName);
    formData.append("productPrice", productPrice);
    formData.append("productCategory", productCategory);
    // formData.append("productDescription", productDescription);
    formData.append("productImage", productImage);
    // make api call
    updateProductApi(id, formData)
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
                Update Product
                <span className="text-success"></span>
              </h2>
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="productName" className="form-label">
                    Pett Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="productName"
                    value={productName}
                    onChange={(e) => setProductName(e.target.value)}
                    placeholder="Enter Product Name"
                  />
                </div>
                <div className="mb-3">
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
                </div>

                <div className="mb-3">
                  <label htmlFor="productDescription" className="form_label">
                    Pet Description
                  </label>
                  {/* <input
                    onChange={(e) => setProductDescription(e.target.value)}
                    value={productDescription}
                    type="text"
                    className="form-control mb-3"
                    placeholder="Enter Product Description"
                  /> */}
                </div>

                <div className="mb-3">
                  <label htmlFor="productImage" className="form-label">
                    Pet Image
                  </label>
                  <input
                    type="file"
                    className="form-control"
                    id="productImage"
                    onChange={handleImageUpload}
                  />
                </div>

                <Link
                  onClick={handleSubmit}
                  className="btn btn-outline-dark rounded-pill me-2"
                  style={{ transition: "0.3s" }}
                  onMouseEnter={(e) =>
                    (e.target.style.backgroundColor = "orange")
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
                    (e.target.style.backgroundColor = "orange")
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
              {previewImage && (
                <>
                  <h6 className="mt-2">New Image</h6>
                  <img
                    src={previewImage}
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

export default AdminEditProduct;