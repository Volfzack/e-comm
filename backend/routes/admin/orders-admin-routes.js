import express from "express";
import {getOrdersAdmin, updateOrderStatusAdmin, deleteOrderAdmin} from "../../controllers/admin/ordersAdmin.Controller.js";

const ordersAdminRouter = express.Router();

ordersAdminRouter.get('/get', getOrdersAdmin);
ordersAdminRouter.put('/update', updateOrderStatusAdmin);
ordersAdminRouter.delete('/delete/:id', deleteOrderAdmin);

export default ordersAdminRouter;