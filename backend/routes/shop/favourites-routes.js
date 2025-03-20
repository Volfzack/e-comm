import express from "express";
import { addFavouriteItem, fetchFavouriteItems, deleteFavouriteItem } from "../../controllers/shop/favourites-controller.js";

const favouritesRouter = express.Router();

favouritesRouter.post('/add', addFavouriteItem);
favouritesRouter.get('/get/:userId', fetchFavouriteItems);
favouritesRouter.delete('/remove/:userId/:productId', deleteFavouriteItem);

export default favouritesRouter;