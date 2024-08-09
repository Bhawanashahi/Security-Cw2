import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { deleteContactApi, getAllContactApi } from "../../apis/Api"; // Import your API functions
import AdminNavbar from '../../components/AdminNavBar';


const AdminContact = () => {
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    // Fetch all contacts when the component mounts
    getAllContactApi()
      .then((res) => {
        setContacts(res.data.contacts); // Assuming the contacts are returned in the 'products' field of the response
      })
      .catch((error) => {
        toast.error('Failed to fetch contacts.');
        console.error(error);
      });
  }, []);

  //delete product Function
  const handleDelete = (id) => {
    const confirmDialog = window.confirm('Are you sure you want to delete the Product?')
    if(!confirmDialog){
      return;
    }else {
      //make api
      deleteContactApi(id).then((res) =>{
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
      <AdminNavbar />
    </div>
    <div className="m-4">
     
        <table className="table mt-2 table-bordered " >
          <thead className="table-light">
            <tr>
              <th>Contact Name</th>
              <th>Contact Email</th>
              <th>Contact Message</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {contacts.map((contact) => (
              <tr key={contact._id}>
                <td >{contact.contactName}</td>
                <td>{contact.contactEmail}</td>
                <td>{contact.contactMessage}</td>
                <td>
                  <button
                    onClick={() => handleDelete(contact._id)}
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

export default AdminContact;