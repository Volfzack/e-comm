import Review from "../../models/review.models.js";
import productModel from "../../models/product.models.js";
import Order from '../../models/order.models.js';

export const createReview = async (req, res) => {
    const { userId, productId, rating, comment, userName } = req.body;
    try {
        const order = await Order.findOne({ userId, "items.productId": productId, status: "Delivered" });
        if (!order) {
            return res.status(403).json({ success: false, message: "You need to buy the product first" });
        }
        const existingReview = await Review.findOne({ userId, productId });
        if (existingReview) {
            return res.status(404).json({ success: false, message: "You have already reviewed this product" });
        }
        const review = new Review({ userId, productId, rating, comment, userName });
        await review.save();

        const productReviews = await Review.find({ productId });
        const totalRating = productReviews.reduce((acc, review) => acc + review.rating, 0);
        const averageRating = totalRating / productReviews.length;
        await productModel.findByIdAndUpdate(productId, { rating: averageRating });
        res.json({ success: true, message: "Review created successfully", data: review });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: `Server Error in createReview - ${error}` });
    }
};

export const getReviews = async (req, res) => {
    const { productId } = req.params;
    try {
        const reviews = await Review.find({ productId });
        if (!reviews) {
            return res.status(404).json({ success: false, message: "Reviews not found!" });
        }
        res.json(reviews);
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: `Server Error in getReview - ${error}` });
    }
};

export const deleteReview = async (req, res) => {
    const { id } = req.params;
    try {
        const review = await Review.findById(id);
        if (!review) {
            return res.status(404).json({ success: false, message: "Review not found!" });
        }
        await Review.findByIdAndDelete(id);
        res.json({ success: true, message: "Review deleted successfully" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: `Server Error in deleteReview - ${error}` });
    }
};