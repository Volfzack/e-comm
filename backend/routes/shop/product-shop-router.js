import express from "express";
import { getProductShop, getAllProductsShop } from "../../controllers/shop/product-controller.js";

const productShopRouter = express.Router();


productShopRouter.get('/get/:id', getProductShop);
productShopRouter.get('/all', getAllProductsShop);

export default productShopRouter;