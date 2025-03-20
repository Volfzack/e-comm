import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    title: {
        type: String,
    },
    description: {
        type: String,
    },
    price: {
        type: Number,
    },
    salePrice: {
        type: Number,
    },
    category: {
        type: String,
    },
    quantity: {
        type: Number,
    },
    images: {
        type: Array,
    },
    characteristics: {
        type: Object,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    rating: {
        type: Number,
    }
});

const productModel = mongoose.models.Product || mongoose.model("Product", productSchema);

export default productModel;
