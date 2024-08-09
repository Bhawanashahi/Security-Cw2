import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import { useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Container } from 'react-bootstrap';
import { faShoppingCart, faHeart } from '@fortawesome/free-solid-svg-icons'; 
import {  createFavourtieApi, addToCartApi, getAllProductApi, createCartApi, getSearchApi } from '../apis/Api';
import { Link } from "react-router-dom";
import { Button } from 'react-bootstrap';
import { toast } from 'react-toastify'; // Import toast for notifications

const Product = () => {
    const [products, setProducts] = useState([]);
    const { id } = useParams();
     // Get the id from params
     

 
    useEffect(() => {
        // Fetch all products when component mounts
        getAllProductApi().then((res) => {
            setProducts(res.data.products);
        }).catch(err => {
            console.error('Error fetching products:', err);
        });
    }, []);
 
        // Prepare data for adding to cart
        
 

    const handleCart = (productId) => {
        const user = JSON.parse(localStorage.getItem("user"));
        // Check if the user is logged in
        if (!user || !user._id ) {
            toast.error("Please log in to add items to the cart.");
            return;
        }
        
    
        // Prepare data for adding to cart
        const data = {
            userId: user._id,
            productId:productId,
            quantity: 1,
            status: "pending"
        };

        

        // Call the API to add item to cart
        createCartApi(data).then((res) => {
            if (res.data.success === false) {
                toast.error(res.data.message);
            } else {
                toast.success(res.data.message);
            }
        }).catch(err => {
            toast.error('Server Error');
            console.error('Error adding to cart:', err);
        });
      
    };
    const handleAdd = (e, productId) => {
        e.preventDefault();
     
        const storedUserData = localStorage.getItem('user');
     
        if (storedUserData) {
          const parsedUserData = JSON.parse(storedUserData);
          const userId = parsedUserData._id;
     
          const data = {
            userId: userId,
            productId: productId,
            
          };
     
          createFavourtieApi(data)
            .then((res) => {
              if (res.data.success === false) {
                toast.error(res.data.message);
              } else {
                toast.success(res.data.message);
              }
            })
            .catch((err) => {
              toast.error("Server error");
              console.log(err.message);
            });
        } else {
          console.log('User data not found in localStorage');
        }
      };
    
    
    
  
    return (
        <>
             <div>
                <Navbar />
            </div>
        

   
      <Container className="mt-4">
        <h2 className="mb-4" style={{ color: '#D8812F', fontSize: '1.5em', fontWeight: 'bold' }}>
          Available Pets and Pet Items
        </h2>
        <div className="row row-cols-1 row-cols-md-4 g-4">
          {products.map(item => (
            <div key={item.productId} className="col">
              <div className="card h-100">
                <img
                  src={item.productImageUrl}
                  className="card-img-top"
                  alt={item.productName}
                  style={{ objectFit: 'cover', height: '200px' }}
                />
                <div className="card-body">
                  <h5 className="card-title" style={{ fontSize: '1em', color: 'black', marginBottom: '5px' }}>{item.productName}</h5>
                  <p className="card-text" style={{ fontSize: '0.9em', color: '#D8812F', marginBottom: '5px' }}>Rs {item.productPrice}</p>
                  <p className="card-text" style={{ fontSize: '0.9em', color: 'black', marginBottom: '5px' }}>{item.productCategory}</p>
                  <div className="d-flex justify-content-between align-items-center">
                    <Button
                      type="button"
                      style={{ backgroundColor: '#D8812F', color: 'black', width: '100%' }}
                      className="btn"
                      onClick={() => handleCart(item._id)} 
                    >
                      Add to Cart
                    </Button>
                    <button
                     onClick={(e) => {
                        handleAdd(e, item._id);
                      }}
                      className="btn"
                      style={{ backgroundColor: 'white', border: 'none', color: '#D8812F' }}
                    >
                      <FontAwesomeIcon icon={faHeart} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Container>
        </>
    );
};

export default Product;
