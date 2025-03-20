import express from "express";
import { addToCart, fetchCartItems, deleteCartItem, updateCartItemQty, clearCart } from "../../controllers/shop/cart-controller.js";

const cartRouter = express.Router();

cartRouter.post('/add', addToCart);
cartRouter.get('/get/:userId', fetchCartItems);
cartRouter.put('/update', updateCartItemQty);
cartRouter.delete('/remove/:userId/:productId', deleteCartItem);
cartRouter.delete('/clear/:userId', clearCart);

export default cartRouter;