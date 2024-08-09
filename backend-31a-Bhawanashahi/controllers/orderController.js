const mongoose = require('mongoose');
const Orders = require("../model/orderModel");
const User = require("../model/userModel");
const Cart = require("../model/cartModel");


const createOrder = async (req, res) => {
    try {
        const { userId, address } = req.body;

        // Fetch user cart
        const cart = await Cart.findOne({ user: userId }).populate('cartItems.product');

        // Validation
        if (!cart || cart.cartItems.length === 0) {
            return res.status(400).json({
                success: false,
                message: "Cart is empty. Add items to the cart before placing an order.",
            });
        }

        // Calculate total price
        let total = 0;
        cart.cartItems.forEach(item => {
            total += item.product.productPrice * item.quantity;
        });

        // Create order
        const order = new Orders({
            userId: userId,
            cartItems: cart.cartItems.map(item => ({
                productId: item.product._id,
                quantity: item.quantity
            })),
            total: total,
            address: address // Store the address in the order
        });

        await order.save();

        // Clear cart after placing the order
        await Cart.findOneAndUpdate({ user: userId }, { $set: { cartItems: [] } });

        return res.status(200).json({
            success: true,
            message: "Order placed successfully",
            order: order
        });
    } catch (error) {
        console.error("Error creating order:", error);
        return res.status(500).json({
            success: false,
            message: "Failed to place order"
        });
    }
};

const getOrders = async(req, res) =>{
    try {
         // Fetch all orders with populated product details
         const orders = await Orders.find().populate({
             path: 'cartItems.productId',
             model: 'products', // Assuming the model name for products is 'products'
         });
 
         res.json({
             success: true,
             orders: orders
         });
     } catch (error) {
         res.status(500).json({
             success: false,
             message: error.message || "Internal Server Error"
         });
     }
 };
 const getOrder = async (req, res) => {
    try {
        const userId = req.params.userId; // Extract user ID from request parameters

        // Fetch orders by user ID
        const orders = await Orders.find({ userId }).populate({
            path: 'cartItems.productId',
            model: 'Product', // Assuming the model name for products is 'Product'
        });

        res.json({
            success: true,
            orders: orders
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message || "Internal Server Error"
        });
    }
};

 
module.exports = {
    createOrder,
    getOrders, 
    getOrder
  }
