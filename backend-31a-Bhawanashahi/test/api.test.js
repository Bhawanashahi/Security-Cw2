
const request = require('supertest');
const app = require('../index');

describe('API Testings', () => {
    //tesing the test route '/test'
    it('GET /test | Response with valid text Hello' , async () => {
        const response = await request(app).get('/test');
        expect(response.statusCode).toBe(200);
        expect(response.text).toEqual("Hello from express server")
    })

    

  

    // testing all get products route '/api/product/get_products'
    it ('GET /api/product/get_products | Response with valid json data', async () => {
        const response = await request(app).get('/api/product/get_products');
        expect(response.statusCode).toBe(200)
        expect(response.body).toBeDefined()
        expect(response.body.success).toBe(true)
        expect(response.body.message).toEqual("Product fetched successfully");
    })

    // testing user registration route '/api/user/create'
    it ('POST /api/user/create | Response with valid json data', async () => {
        const response = await request(app).post('/api/user/create').send({
            firstName: 'Aakriti',
            lastName: 'Shahi',
            email: 'a@gmail.com',
            password: 'aakku12'
        })
        console.log(response.body)
        // expect(response.body).toBeDefined()
        if(response.body.success){
            expect(response.body.success).toBe(true);
            expect(response.body.message).toEqual("User created successfully.");}
        else{
            expect(response.body.success).toBe(false);
            expect(response.body.message).toEqual("User already exists.");
        }
    })

    // testing user login route '/api/user/login'
    it ('POST /api/user/login | Response with valid json data', async () => {
        const response = await request(app).post('/api/user/login').send({
            email: 'a@gmail.com',
            password: 'aakku12'
        })
        console.log(response.body)
        // expect(response.body).toBeDefined()
        if(response.body.success){
            expect(response.body.success).toBe(true);
            expect(response.body.message).toEqual("User logged in successfully.");}
        else{
            expect(response.body.success).toBe(false);
            expect(response.body.message).toEqual("User does not exists.");
        }
    })

     


    it ('GET Product | Fetch Contact', async () => {
        const response = await request(app).get('/api/contact/get_contact');
        expect(response.statusCode).toBe(200)
        expect(response.body).toBeDefined();
        expect(response.body.message).toEqual('Contact fetched successfully')
    })
  

    it ('GET Product| Fetch single produc', async () => {
        const response = await request(app).get('/api/product/get_product/65df096742283c830d3662ea');
        expect(response.statusCode).toBe(200)
        expect(response.body).toHaveProperty('product');
    })
    it ('GET Cart| Fetch all cart', async () => {
        const response = await request(app).get('/api/cart/get_cart/65e361e4a2b14dc311e7bc4c');
        expect(response.statusCode).toBe(200)
        expect(response.body).toHaveProperty('cart');
    })
    it ('GET Order| Fetch all order', async () => {
        const response = await request(app).get('/api/user/get_order/65e34d26c76693d287b3d178');
        expect(response.statusCode).toBe(200)
        expect(response.body).toHaveProperty('orders');
    })
 
    it('GET Contact | Fetch single contact', async () => {
        const contactId = '659ca4fe5f51032127b08bcf'; 
        const response = await request(app).get(`/api/contact/get_single_contact/${contactId}`);
        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty('contact');
    });

 
    
    it('GET Order | Fetch all orders for a user', async () => {
        const userId = '659c202a9e2d8171dff095c0'; // Replace with the user ID for testing
        const response = await request(app).get(`/api/user/get_order/${userId}`);
        expect(response.statusCode).toBe(200);
        expect(response.body).toBeDefined();
        expect(response.body).toHaveProperty('orders'); // Assuming the response contains an 'orders' property
    });

    
  
  
   
   
   
});
  

