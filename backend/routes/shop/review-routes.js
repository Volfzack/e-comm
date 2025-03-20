import express from "express";
import { createReview, getReviews, deleteReview } from "../../controllers/shop/review-controller.js";
const reviewRouter = express.Router();

reviewRouter.post('/create', createReview);
reviewRouter.get('/get/:productId', getReviews);
reviewRouter.delete('/delete/:id', deleteReview);

export default reviewRouter;