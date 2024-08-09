const mongoose = require('mongoose');
const Places = require("../model/placeOrderModel");

const placeOrder = async (req, res) => {
    try {
        const { userId, address, cartItems } = req.body;

        if (!userId || !address || !cartItems || cartItems.length === 0) {
            return res.status(400).json({
                success: false,
                message: "Invalid request data. Ensure userId, address, and cartItems are provided.",
            });
        }

        let total = 0;
        cartItems.forEach(item => {
            total += item.product.productPrice * item.quantity;
        });

        const placeOrder = new Places({
            userId: userId,
            address: address,
            cartItems: cartItems.map(item => ({
                productId: item.product._id,
                quantity: item.quantity
            })),
            total: total,
            totalPrice: total,
            status: 'Pending',
            orderId: 'ORDER-NO' + Date.now()
        });

        await placeOrder.save();

        return res.status(200).json({
            success: true,
            message: "Order placed successfully",
            placeOrder: placeOrder
        });
    } catch (error) {
        console.error("Error placing order:", error);
        return res.status(500).json({
            success: false,
            message: "Failed to place order"
        });
    }
};

module.exports = {
    placeOrder
};
