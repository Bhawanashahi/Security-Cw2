import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Container, Row, Col, Image, Table,Button } from 'react-bootstrap';
import { getOrderApi} from "../../apis/Api"; // Assuming there's an API function to fetch all orders
import AdminNavbar from "../../components/AdminNavBar";

const AdminOrderPage = () => {
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
    // const handleDeleteOrder = async (orderId) => {
    //     try {
    //         const response = await deleteOrderApi(orderId);
    //         if (response.data.success) {
    //             // Remove the deleted order from the state
    //             setOrders(orders.filter(order => order._id !== orderId));
    //             toast.success(response.data.message);
    //         } else {
    //             toast.error(response.data.message);
    //         }
    //     } catch (error) {
    //         console.error("Error deleting order:", error);
    //         toast.error("Failed to delete order");
    //     }
    // };


    return (
        <>
            <AdminNavbar />
            <Container className="mt-5">
                <h2>Order Summary</h2>
                <Table striped bordered hover responsive>
                    <thead>
                        <tr>
                            <th>Order ID</th>
                            <th>Customer</th>
                            <th>Image</th>
                            <th>Name</th>
                            <th>Address</th>
                            <th>Total</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map((order) => (
                            <tr key={order._id}>
                                <td>{order.orderId}</td>
                                <td>{"Aakriti@gmail.com"}</td> 
                                <td>
                                    {order.cartItems.map((item, index) => (
                                        <Image key={index} src={item.productId.productImageUrl} alt={item.productId.productName} fluid style={{ maxHeight: '50px' }} />
                                    ))}
                                </td>
                                <td>
                                    {order.cartItems.map((item, index) => (
                                        <div key={index}>{item.productId.productName}</div>
                                    ))}
                                </td>
                                <td>{order.address}</td>
                                <td>${order.total}</td>
                                <td>{order.status}</td>
                                <td>
                                    <Button variant="danger">Delete</Button>
                                    {/* Add Edit button here with appropriate onClick handler */}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </Container>
        </>
    );
}

export default AdminOrderPage;
