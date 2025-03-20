import mongoose from "mongoose";

const orderItemSchema = new mongoose.Schema({
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
    },
},
    {_id: false},
);

const orderSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    items: [orderItemSchema],
    shippingAddress: {
        address: {
            type: String,
            required: true,
        },
        city: {
            type: String,
            required: true,
        },
        postalCode: {
            type: String,
            required: true,
        },
        country: {
            type: String,
            required: true,
        },
    },
    paymentMethod: {
        type: String,
        required: true,
    },
    total: {
        type: Number,
        required: true,
    },
    itemsQuantity: {
        type: Number,
        required: true,
    },
    userPhone: {
        type: String
    },
    isDelivered: {
        type: Boolean,
        required: true,
        default: false,
    },
    isPaid: {
        type: Boolean,
        default: false,
    },
    paymentStatus: {
        type: String,
        default: 'Unpaid',
    },
    paidAt: {
        type: Date,
    },
    status: {
        type: String,
        enum: ['Processing', 'Shipping', 'Delivered', 'Cancelled'],
        default: 'Processing',
    },
    deliveredAt: {
        type: Date,
    }
},
    {timestamps: true},
);

const Order = mongoose.model("Order", orderSchema);

export default Order;