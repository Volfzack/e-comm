import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    userName: {
        type: String,
    },
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
    },
    rating: {
        type: Number,
        min: 1,
        max: 5,
    },
    comment: {
        type: String,
    },
},
    {
        timestamps: true,
    }
);

const Review = mongoose.model('Review', reviewSchema);

export default Review;
