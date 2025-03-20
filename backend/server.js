import express from "express";
import cors from "cors";
import "dotenv/config";
import cookieParser from "cookie-parser";
import { connectDb } from "./lib/db.js";
import authRouter from "./routes/auth/auth-routes.js";
import productRouter from "./routes/admin/product-routes.js";
import productShopRouter from "./routes/shop/product-shop-router.js";
import cartRouter from "./routes/shop/cart-routes.js";
import favouriteRouter from "./routes/shop/favourites-routes.js";
import ordersRouter from "./routes/shop/orders-routes.js";
import ordersAdminRouter from "./routes/admin/orders-admin-routes.js";
import reviewRouter from "./routes/shop/review-routes.js";
import analyticsRouter from "./routes/admin/analytics-routes.js";


const app = express();
const PORT = process.env.PORT || 5000;


app.use(cors({
    origin: 'https://volfzack.github.io/e-comm',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Cache-Control', 'Pragma', "Expires"],
    credentials: true
}));

app.use(express.json());
app.use(cookieParser());

//Api_Endpoints
app.use('/api/auth', authRouter);
app.use('/api/admin/products', productRouter);
app.use('/api/product', productShopRouter);
app.use('/api/cart', cartRouter);
app.use('/api/favourites', favouriteRouter);
app.use('/api/orders', ordersRouter);
app.use('/api/admin/orders', ordersAdminRouter);
app.use('/api/review', reviewRouter);
app.use('/api/admin/analytics', analyticsRouter);

app.get('/', (req, res) => {
    res.send("Hello");
});

app.listen(PORT, () => {
    console.log("Server running on http://localhost:" + PORT);

    connectDb();
});


