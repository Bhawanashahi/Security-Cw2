import axios from "axios";

const Api = axios.create({
    baseURL : "http://localhost:5000",
    withCredentials : true,
    headers :{
        "Content-Type" : "multipart/form-data",
    }
})

// make separate header for authorization
const config = {
    headers:{ 
        'authorization' : `Bearer ${localStorage.getItem('token')}`
    }
}


export const testApi = () => Api.get("/test")
// http://localhost:3000/test

// create user api
export const createUserApi = (data) => Api.post('/api/user/create', data, config)

// //update user API with ID
// Frontend: API Configuration
export const updateUserApi = (id, formData) => Api.put(`/api/user/update_user/${id}`, formData);


//forget password
export const forgetPassword=(data)=>Api.post("api/user/forget_password", data)

// Login user Api
export const loginUserApi = (data) =>  Api.post('/api/user/login', data)

//contact Api
export const contactApi = (data) =>  Api.post('/api/contact/sendMessage', data)

// Create contact API
export const createContactApi = (data) => Api.post('/api/contact/create_contact', data, config)

//get all contact
export const getAllContactApi = () => Api.get('/api/contact/get_contact')

//get single contact API
export const getSingleContactApi = (id) => Api.get(`/api/contact/get_single_contact/${id}`)

//delete contact API
export const deleteContactApi = (id ) => Api.delete(`/api/contact/delete_contact/${id}`)

// //get all user
// export const getAllUserApi = () => Api.get('/api/user/get_user' )

// //get single contact API
export const getSingleUserApi = (id) => Api.get(`/api/user/get_single_user/${id}`)

// //get single contact API
export const getSearchApi = (searchQuery) => {return Api.get(`/api/products/search?q=${searchQuery}`);
  };

//get all user
export const getAllUserApi = () => Api.get('/api/user/get_user' )



// create blog api
export const createBlogApi = (data) => Api.post('/api/blog/create_blog', data, config)

// //delete product API
// export const deleteUserApi = (id ) => Api.delete(`/api/user/delete_user/${id}`)

// //get single blog API
export const getSingleBlogApi = (id) => Api.get(`/api/blog/get_blog/${id}`)

// // create blog api
export const deleteBlogApi = (id) => Api.delete(`/api/blog/delete_blog/${id}`)
// //update blog API with ID
export const updateBlogApi =(id, formData) => Api.put(`/api/blog/update_product/${id}`, formData, config)


//get all user
export const getAllBlogsApi = () => Api.get('/api/blog/get_blog' )

// Create product API
export const createProductApi = (data) => Api.post('/api/product/create_product', data, config )

//get all products
export const getAllProductApi = () => Api.get('/api/product/get_products')

//get single product API
export const getSingleProductApi = (id) => Api.get(`/api/product/get_product/${id}`)

// update product
export const updateProductApi  = (id, formData) => Api.put(`/api/product/update_product/${id}`, formData, config)

export const deleteProductApi = (id ) => Api.delete(`/api/product/delete_product/${id}`)

// Create product API
export const createPetProductApi = (data) => Api.post('/api/petproduct/create_petproduct', data, config )

//get all products
export const getAllPetProductApi = () => Api.get('/api/petproduct/get_petproducts')

//get single product API
export const getSinglePetProductApi = (id) => Api.get(`/api/petproduct/get_petproduct/${id}`)

//update product API with ID
export const updatePetProductApi =(id, formData) => Api.put(`/api/petproduct/update_petproduct/${id}`, formData, config)

export const deletePetProductApi = (id ) => Api.delete(`/api/petproduct/delete_petproduct/${id}`)



// // Create Order API
// export const createCartApi = (data) => Api.post('/api/user/create_cart', data, config);
export const createCartApi = (data) =>  Api.post("/api/cart/create_cart", data);

// Get all Orders API
export const getCartApi = (id)=> Api.get(`/api/cart/get_cart/${id}`)


export const deleteCartApi = (id)=> Api.delete(`/api/cart/remove_cart/${id}`,config)

export const updateCartApi =(id, formData) => Api.put(`/api/cart/update_cart/${id}`, formData, config)

export const createFavourtieApi = (data) => Api.post('/api/user/create_favourite',data)
export const getFavouriteApi = (id)=> Api.get(`/api/user/get_favourite/${id}`)
export const deleteFavouriteApi = (id)=> Api.delete(`/api/user/delete_favourite/${id}`,config)

export const createOrderApi = (data) =>  Api.post("/api/user/create_order", data);
export const getOrderApi = (id) => Api.get(`/api/user/get_order/${id}`);
export const getOrdersApi = (userId) => Api.get(`/api/user/get_orders/${userId}`);


//vendor
export const createPhotoApi = (data) => Api.post('/api/vendor/create_photo', data, config)
export const getSinglePhotoApi = (id) => Api.get(`/api/vendor/get_singlephoto/${id}`);
export const deletePhotoApi = (id) => Api.delete(`/api/vendor/delete_photo/${id}`)
export const updatePhotoApi =(id, formData) => Api.put(`/api/vendor/update_photo/${id}`, formData, config)
export const getAllPhotoApi = () => Api.get('/api/vendor/get_photo' )

export const createMakeupApi = (data) => Api.post('/api/vendor/create_makeup', data, config)
export const getSingleMakeupApi = (id) => Api.get(`/api/vendor/get_singlemakeup/${id}`)
export const deleteMakeupApi = (id) => Api.delete(`/api/vendor/delete_makeup/${id}`)
export const updateMakeupApi =(id, formData) => Api.put(`/api/vendor/update_makeup/${id}`, formData, config)
export const getAllMakeupApi = () => Api.get('/api/vendor/get_makeup' )

export const createVenueApi = (data) => Api.post('/api/vendor/create_venue', data, config)
export const getSingleVenueApi = (id) => Api.get(`/api/vendor/get_singlevenue/${id}`)
export const deleteVenueApi = (id) => Api.delete(`/api/vendor/delete_venue/${id}`)
export const updateVenueApi =(id, formData) => Api.put(`/api/vendor/update_venue/${id}`, formData, config)
export const getAllVenueApi = () => Api.get('/api/vendor/get_venue' )

//Review
export const reviewApi = (data) =>  Api.post('/api/review/sendReview', data)
export const createReviewApi = (data) => Api.post('/api/review/create_review', data, config)
export const getAllReviewApi = () => Api.get('/api/review/get_review')
export const getSingleReviewApi = (id) => Api.get(`/api/ review/get_single_review/${id}`)
export const deleteReviewApi = (id ) => Api.delete(`/api/ review/delete_review/${id}`)

//Book

export const createBookApi = (data) => Api.post('/api/book/create_book', data, config)
export const getAllBookApi = () => Api.get('/api/book/get_book')
export const getSingleBookApi = (id) => Api.get(`/api/book/get_single_book/${id}`)
export const deleteBookApi = (id ) => Api.delete(`/api/book/delete_book/${id}`)

//Vendor
// create vendoruser api
export const    createVendorUserApi= (data) => Api.post('/api/vendor/create', data, config)

// //update user API with ID
// Frontend: API Configuration
export const updateVendorUserApi = (id, formData) => Api.put(`/api/vendor/update_user/${id}`, formData);


// //get single contact API
export const getSingleVendorUserApi = (id) => Api.get(`/api/vendor_single_user/${id}`)

//get all user
export const getAllVendorUserApi = () => Api.get('/api/vendor/getvendor_user' )
// Login user Api
export const  loginVendorUserApi= (data) =>  Api.post('/api/vendor/login', data)





export const createPlaceOrderApi = (data) =>  Api.post("/api/user/create_placeorder", data);

export const searchProductByNameApi = async (productName) => {
    try {
      const response = await Api.get(`/api/product/search?productName=${productName}`);
      console.log("Response from searchProductByNameApi:", response.data); // Log the response data
      return response.data;
    } catch (error) {
      console.error(
        "Error searching products by name:",
        error.response.data.message
      );
      throw error;
    }
  };





