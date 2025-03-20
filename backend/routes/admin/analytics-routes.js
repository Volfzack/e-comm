import express from "express";
import { getAnalytics } from "../../controllers/admin/analyticsController.js";

const analyticsRouter = express.Router();

analyticsRouter.get('/get', getAnalytics);

export default analyticsRouter;