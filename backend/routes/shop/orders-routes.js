import express from "express";
import {getOrders, getOrderDetails, createOrderCOD, updateOrderStatus, createOrderStripe, updateStripeStatus, cancelOrder} from "../../controllers/shop/ordersController.js";

const ordersRouter = express.Router();

ordersRouter.post('/create', createOrderCOD);
ordersRouter.put('/update', updateOrderStatus);
ordersRouter.post('/stripe', createOrderStripe);
ordersRouter.put('/update/stripe', updateStripeStatus);
ordersRouter.get('/get/:userId', getOrders);
ordersRouter.get('/getOrderDetails/:id', getOrderDetails);
ordersRouter.put('/cancel/:id', cancelOrder);

export default ordersRouter;