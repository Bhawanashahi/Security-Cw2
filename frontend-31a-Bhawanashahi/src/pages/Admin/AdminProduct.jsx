import React, { useState, useEffect } from "react";
import { createProductApi, deleteProductApi,getAllProductApi } from "../../apis/Api";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import AdminNavbar from "../../components/AdminNavBar";




const AdminProduct = () => {
  // make useState
  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productCategory, setProductCategory] = useState("");
//   const [productDescription, setProductDescription] = useState("");

  // Make useState for image
  const [productImage, setProductImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);

  //useEffect for fetching all product and show in table
  const [products, setProducts] = useState([]);
  useEffect(() => {
    getAllProductApi().then((res) => {
      setProducts(res.data.products);
    });
  }, []);

  // Function for image upload and preview\
  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    setProductImage(file);
    setPreviewImage(URL.createObjectURL(file));
  };
  


  // handle submit
  const handleSubmit = (e) => {
    e.preventDefault();

    // Making logical form data
    const formData = new FormData();
    formData.append("productName", productName);
    formData.append("productPrice", productPrice);
    formData.append("productCategory", productCategory);
    // formData.append("productDescription", productDescription);
    formData.append("productImage", productImage);

    // Making API Call
    createProductApi(formData)
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

  //delete product Function
  const handleDelete = (id) => {
    const confirmDialog = window.confirm('Are you sure you want to delete the Product?')
    if(!confirmDialog){
      return;
    }else {
      //make api
      deleteProductApi(id).then((res) =>{
        if(res.data.success == true){
          toast.success(res.data.message)
          window.location.reload ()
        }else{
          toast.error(res.data.message)
        }
      })
    }

  }

  return (
    <>
    <div>
        <AdminNavbar/>
    </div>
      <div className="m-4">
      <div className="d-flex justify-content-center align-items-center">
  <Link
    type="button"
    className="btn btn-success"
    style={{ backgroundColor: '#D8812F', width:'150px', height:'50px', fontWeight:'bold', fontSize:'20px',color: 'black' }}
    to="/admin/addProduct"
  >
    Add Product
  </Link>
</div>


          <table className="table mt-2 table-bordered">
  <thead style={{ backgroundColor: '#D8812F' }}>
    <tr>
      <th>Product Image</th>
      <th>Product Name</th>
      <th>Product Price</th>
      <th>Product Category</th>
      {/* <th>Product Description</th> */}
      <th>Action</th>
    </tr>
  </thead>
  <tbody>
    {products.map((item) => (
      <tr key={item._id}>
        <td>
          <img
            src={item.productImageUrl}
            width={"40"}
            height={"40"}
            alt=""
          />
        </td>
        <td>{item.productName}</td>
        <td>{item.productPrice}</td>
        <td>{item.productCategory}</td>
        {/* <td>{item.productDescription.slice(0, 10)}</td> */}
        <td>
          <div className="btn-group" role="group">
        
            <Link to={`/admin/edit/${item._id}`} className="btn btn-success"  >
              Edit
            </Link>
            <button
           
              onClick={() => handleDelete(item._id)}
              className="btn btn-danger"
            >
              Delete
            </button>
          </div>
        </td>
      </tr>
    ))}
  </tbody>
</table>

      </div>
    </>
  );
};

export default AdminProduct;