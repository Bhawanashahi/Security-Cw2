import axios from "axios";
import login_mock from "../mock/login_mock";
import products_mock from "../mock/products_mock";
import contact_mock from "../mock/contact_mock";
import blog_mock from "../mock/blog_mock";
import order_mock from "../mock/order_mock";
import cart_mock from "../mock/cart_mock";
const baseURL="http://localhost:3000";

describe("API Testing", ()=>{
    
    it("Test should work", async()=>{
        const response=await axios.get(`${baseURL}/test`)
        expect(response.status).toEqual(200);
    })
    

    //login
    it("Login Should Work", async()=>{
        const response=await axios.post(`${baseURL}/api/user/login`, login_mock);
        expect(response.status).toEqual(200);
        expect(response.data.success).toEqual(true);
    })
    

    //fectch all products and match each product name with  the mock data

    it("Fetch  all products", async() => {
        //fetch all products, send request
        const response=await axios.get(`${baseURL}/api/product/get_products`);
        expect(response.status).toEqual(200);
        expect(response.data.products).toBeDefined();
        //matching each product name with mock data
        // response.data.products.forEach((individualProduct,index) => {
        //     expect(individualProduct.productName).toEqual(products_mock[index].pr)

        // })
   

       
    })
   
   
     
    
    it("Fetch  all contacts", async() => {
        //fetch all products, send request
        const response=await axios.get(`${baseURL}/api/contact/get_contact`);
        expect(response.status).toEqual(200);
        expect(response.data.contacts).toBeDefined();
        //matching each product name with mock data
       
    })
    
    
    it("Fetch all orders should work", async () =>{
        //fetch all products, send request
        const response = await axios.get(`${baseURL}/api/user/get_order`);
        expect(response.status).toEqual(200);
        expect(response.data.success);
       
    })

    it("Fetch  all carts", async() => {
        //fetch all products, send request
        const response=await axios.get(`${baseURL}/api/cart/get_cart`);
        expect(response.status).toEqual(404);
        expect(response.data.carts).toBeDefined();
        //matching each product name with mock data
        response.data.contacts.forEach((individualCart,index) => {
            expect(individualCart.Quantity).toEqual(cart_mock[index].pr)

        })
       
    })
    
    it("Fetch  all blogs", async() => {
        //fetch all products, send request
        const response=await axios.get(`${baseURL}/api/blog/get_blog`);
        expect(response.status).toEqual(200);
        expect(response.data.blogs).toBeUndefined();
        //matching each product name with mock data
        // response.data.blogs.forEach((individualBlog,index) => {
        //     expect(individualBlog.blogTitle).toEqual(blog_mock[index].pr)

        // })
       
    })
    
    
    
    
})






