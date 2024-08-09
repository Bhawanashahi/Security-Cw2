import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Container, Row, Col, Card, Image } from 'react-bootstrap';
import { getOrderApi } from '../apis/Api'; // Assuming you have a function to fetch orders
import NavBar from "../components/Navbar";

const OrderPage = () => {
    const [orders, setOrders] = useState([]);
   
    useEffect(() => {
        const fetchOrders = async () => {
            try {
                // Call the API function to fetch all orders
                const response = await getOrderApi(); // Assuming this function fetches all orders
                setOrders(response.data.orders);
            } catch (error) {
                console.error("Error fetching orders:", error);
                toast.error("Failed to fetch orders");
            }
        };

        fetchOrders();
    }, []);
    
    return (
        <>
            <NavBar />
            <Container className="mt-5">
                <h2 className="mb-4">My Orders</h2>
                <Row>
                    {orders.map((order) => (
                        <Col key={order._id} xs={12} sm={6} md={4} lg={3} className="mb-4">
                            <Card style={{border: '1px solid orange'}}>
                                <Card.Body>
                                    <Card.Title>Order ID: {order.orderId}</Card.Title>
                                    {order.cartItems.map((item, index) => (
                                        <div key={index} className="d-flex align-items-center mb-2">
                                            <Image src={item.productId.productImageUrl} alt={item.productId.productName} fluid style={{ width: '50px', height: '50px' }} />
                                            <span className="ml-2">{item.productId.productName}</span>
                                        </div>
                                    ))}
                                    <div className="mt-3">Address: {order.address}</div>
                                    <div>Total: ${order.total}</div>
                                    <div>Status: {order.status}</div>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </Container>
        </>
    );
}

export default OrderPage;
