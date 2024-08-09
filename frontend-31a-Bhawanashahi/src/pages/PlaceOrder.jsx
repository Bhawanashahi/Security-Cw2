import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import NavBar from '../components/Navbar';
import { Container, Row, Col, Image, Form, Button } from 'react-bootstrap';
import { getOrderApi, createPlaceOrderApi } from '../apis/Api';

const PlaceorderPage = () => {
    const [orders, setOrders] = useState([]);
    const [address, setAddress] = useState("");
    const [carts, setCart] = useState([]);
    const [subtotal, setSubtotal] = useState(0);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const storedUserData = localStorage.getItem("user");
                const parsedUserData = JSON.parse(storedUserData);
                const userId = parsedUserData._id;

                const response = await getOrderApi(userId);
                setOrders(response.data.orders);
            } catch (error) {
                console.error("Error fetching user orders:", error);
                toast.error("Failed to fetch user orders");
            }
        };

        fetchOrders();
    }, []);

   
    const handleAddressChange = (e) => {
        setAddress(e.target.value);
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!address) {
            toast.error("Please provide the address.");
            return;
        }
        try {
            // Fetch cart items from API
            const response = await getOrderApi();
            const cartItems = response.data.cartItems;
    
            // Calculate subtotal
            const subtotal = calculateSubtotal(cartItems);
    
            // Send order request to API
            const orderResponse = await createPlaceOrderApi({
                userId: JSON.parse(localStorage.getItem("user"))._id,
                address: address, // Pass the address obtained from the form
                cartItems: cartItems,
                subtotal: subtotal
            });
    
            if (orderResponse.success) {
                toast.success(orderResponse.message);
                // Optionally, clear the cart
            } else {
                toast.error(orderResponse.message);
            }
        } catch (error) {
            console.error("Error placing order:", error);
            toast.error("Failed to place order. Please try again later.");
        }
    };
    
    return (
        <>
            <NavBar />
            <Container className="mt-5">
                <Row>
                    <Col>
                        <h2>Enter Address</h2>
                        <Form onSubmit={handleSubmit}>
                            <Form.Group className="mb-3">
                                <Form.Label>Address</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter your Address"
                                    value={address}
                                    onChange={handleAddressChange}
                                />
                          
                            </Form.Group>
                            <Button
                                variant="primary"
                                type="submit"
                                style={{ backgroundColor: "#D8812F", color: "black" }}
                            >
                                Submit
                            </Button>
                        </Form>
                    </Col>

                    <Col>
                        <h2>Order Summary</h2>
                        {orders.map((order) => (
                            <div key={order._id} className="order-item mb-5">
                                <Row>
                                    <Col md={3}>
                                        {order.cartItems.map((item) => (
                                            <Image key={item.productId._id} src={item.productId.productImageUrl} alt={item.productId.productName} fluid />
                                        ))}
                                    </Col>
                                    <Col md={9}>
                                        {order.cartItems.map((item) => (
                                            <div key={item.productId._id} className="mb-4">
                                                <p><strong>Product Name:</strong> {item.productId.productName}</p>
                                                <p><strong>Quantity:</strong> {item.quantity}</p>
                                                <p><strong>Total:</strong> ${item.productId.productPrice * item.quantity}</p>
                                            </div>
                                        ))}
                                        {order.cartItems.length > 0 && (
                                            <>
                                                <hr />
                                                <p><strong>Subtotal:</strong> ${calculateSubtotal(order.cartItems)}</p>
                                                <p><strong>Shipping: Free</strong></p>
                                                <p><strong>Total Price:</strong> ${calculateTotal(order.cartItems)}</p>
                                            </>
                                        )}
                                    </Col>
                                </Row>
                            </div>
                        ))}
                    </Col>
                </Row>
            </Container>
        </>
    );
}

export default PlaceorderPage;

// Function to calculate the subtotal for an order
const calculateSubtotal = (cartItems) => {
    let subtotal = 0;
    cartItems.forEach((item) => {
        subtotal += item.productId.productPrice * item.quantity;
    });
    return subtotal;
};

// Function to calculate the total for an order
const calculateTotal = (cartItems) => {
    const subtotal = calculateSubtotal(cartItems);
    return subtotal; // You can add additional charges if needed
};
