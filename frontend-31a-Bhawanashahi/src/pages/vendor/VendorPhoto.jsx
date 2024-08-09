// import React, { useState, useEffect } from "react";
// import { createPhotoApi, deletePhotoApi, getAllPhotosApi } from "../../apis/Api";
// import { toast } from "react-toastify";
// import { Link } from "react-router-dom";
// import AdminNavbar from "../../components/AdminNavBar";


// //usestate
// const VendorBlog = () => {
// const [title, setTitle] = useState("");
//   const [experience, setExperience] = useState("");
//   const [type, setType] = useState("");
//   const [payment, setPayment] = useState("");
//   const [delivery, setDelivery] = useState("");
//   const [travel, setTravel] = useState("");
//   const[location, setLocation]= useState("");

// //usestate for image

//   const [image, setImage] = useState(null);
//   const [previewImage, setPreviewImage] = useState(null);

//   //use state for fetching
//   const [photo, setPhotos] = useState([]);


//   useEffect(() => {
//     getAllPhotosApi().then((res) => {
//       setPhotos(res.data);
//     });
//   }, []);

//   //image upload
//   const handleImageUpload = (event) => {
//     const file = event.target.files[0];
//     setImage(file);
//     setPreviewImage(URL.createObjectURL(file));
//   };

// //   //handle date
// //   const handleDateChange = (e) => {
// //     setBlogDate(e.target.value);
// //   };

//   //handle submit

//   const handleSubmit = (e) => {
//     e.preventDefault();


//     //making logical form data

//     const formData = new FormData();
//     formData.append("title", title);
//     formData.append("experience", experience);
//     formData.append("type",type);
//     formData.append("payment", payment);
//     formData.append("delivery", delivery);
//     formData.append("travel", travel);
//     formData.append("location", location);
//     formData.append("image", image);

//     //api call
//     createPhotoApi(formData)
//       .then((res) => {
//         if (res.data.success === true) {
//           toast.success(res.data.message);
//           window.location.reload();
//         } else {
//           toast.error(res.data.message);
//         }
//       })
//       .catch((err) => {
//         toast.error("Server Error");
//         console.error(err.message);
//       });
//   };
// //delete function
//   const handleDelete = (id) => {
//     const confirmDialog = window.confirm(
//       "Are you sure you want to delete the Photo?"
//     );
//     if (!confirmDialog) {
//       return;
//     } else {
//       deletePhotoApi(id).then((res) => {
//         if (res.data.success === true) {
//           toast.success(res.data.message);
//           window.location.reload();
//         } else {
//           toast.error(res.data.message);
//         }
//       });
//     }
//   };

//   return (
//     <>
//     <div>
     
//     </div>
//       <div className="m-4">
//         <div className="d-flex justify-content-center align-items-center">
         

//         <Link
//            type="button"
//            style={{ backgroundColor: '#D8812F', width:'150px', height:'50px', fontWeight:'bold', fontSize:'20px',color: 'black' }}
//            className="btn btn-success"
//             to={"/vendor/addPhoto"}
//           >
//             Add PhotoGraphy
//           </Link>
//           </div>


//         <table className="table mt-2 table-bordered" >
//           <thead className="table-light">
//             <tr>
//               <th> Image</th>
//               <th>Title</th>
//               <th>Experience</th>
//               <th>Type</th>
//               <th>Payment</th>
//               <th>Delivery</th>
//               <th>Travel</th>
//               <th>Location</th>
//             </tr>
//           </thead>
//           <tbody>
//             {photos.map((photo) => (
//               <tr>
//                 <td>
//                 <img
//                       src={photo.imageUrl}
//                       width={"40"}
//                       height={"40"}
//                       alt =""
//                     />
//                 </td>
//                 <td>{photo.title}</td>
//                 <td>{photo.experience}</td>
//                 <td>{photo.type}</td>
//                 <td>{photo.payment}</td>
//                 <td>{photo.delivery}</td>
//                 <td>{photo.travel}</td>
//                 <td>{photo.location}</td>
                
//                 <td>
//                   <div className="btn-group" role="group">
//                   <Link to = {`/vendor/up/${photo._id}`} className="btn btn-success">Edit</Link>
//                     <button
//                       onClick={() => handleDelete(blog._id)}
//                       className="btn btn-danger"
//                     >
//                       Delete
//                     </button>
//                   </div>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </>
//   );

//             }

// export default VendorBlog;