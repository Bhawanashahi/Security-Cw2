import React, { useState, useEffect } from "react";
import { createPetProductApi, deletePetProductApi, getAllPetProductApi } from "../../apis/Api";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import AdminNavbar from "../../components/AdminNavBar";

const AdminPetProduct = () => {
  const [petProductName, setPetProductName] = useState("");
  const [petProductPrice, setPetProductPrice] = useState("");
  const [petProductImage, setPetProductImage] = useState(null);
  const [petPreviewImage, setPetPreviewImage] = useState(null);
  const [petproducts, setPetProducts] = useState([]);

  useEffect(() => {
    getAllPetProductApi().then((res) => {
      setPetProducts(res.data.petproducts || []); // Ensure that petproducts is initialized as an empty array
    });
  }, []);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    setPetProductImage(file);
    setPetPreviewImage(URL.createObjectURL(file));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("petProductName", petProductName);
    formData.append("petProductPrice", petProductPrice);
    formData.append("petProductImage", petProductImage);

    createPetProductApi(formData)
      .then((res) => {
        if (res.data.success === false) {
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

  const handleDelete = (id) => {
    const confirmDialog = window.confirm('Are you sure you want to delete the Product?')
    if (!confirmDialog) {
      return;
    } else {
      deletePetProductApi(id).then((res) => {
        if (res.data.success === true) {
          toast.success(res.data.message)
          window.location.reload()
        } else {
          toast.error(res.data.message)
        }
      })
    }
  }

  return (
    <>
      <div>
        <AdminNavbar />
      </div>
      <div className="m-4">
        <div className="d-flex justify-content-center align-items-center">
          <Link
            type="button"
            className="btn btn-success"
            style={{ backgroundColor: '#D8812F', width: '150px', height: '50px', fontWeight: 'bold', fontSize: '20px', color: 'black' }}
            to="/admin/addPetProduct"
          >
            Add Pets
          </Link>
        </div>
        <table className="table mt-2 table-bordered">
          <thead style={{ backgroundColor: '#D8812F' }}>
            <tr>
              <th>Pet Image</th>
              <th>Pet Name</th>
              <th>Pet Price</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {petproducts.map((item) => (
              <tr key={item._id}>
                <td>
                  <img
                    src={item.petProductImageUrl}
                    width={"40"}
                    height={"40"}
                    alt=""
                  />
                </td>
                <td>{item.petProductName}</td>
                <td>{item.petProductPrice}</td>
                <td>
                  <div className="btn-group" role="group">
                    <Link to={`/admin/edi/${item._id}`} className="btn btn-success"  >
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

export default AdminPetProduct;
