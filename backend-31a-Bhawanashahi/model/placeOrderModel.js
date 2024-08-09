const mongoose = require('mongoose');

const placeSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users', // Assuming the reference model name is 'users'
        required: true
    },
    cartItems: [
        {
            productId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'products',
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
    totalPrice: {
        type: Number,
        required: true
    },
    address: {
        type: String,
        required: true
    }
});

const Places = mongoose.model('places', placeSchema);
module.exports = Places;
