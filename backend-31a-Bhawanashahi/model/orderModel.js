
const mongoose = require('mongoose');
const orderSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    cartItems: [
        {
            productId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Product',
                required: true
            },
            quantity: {
                type: Number,
                required: true
            }
        }
    ],
    total: {
        type: Number,
        required: true,
        default: 0
    },
    status: {
        type: String,
        required: true,
        default: 'Pending'
    },
    orderId: {
        type: String,
        required: true,
        default: 'ORDER-NO' + Date.now()
    },
    address: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Order', orderSchema);
