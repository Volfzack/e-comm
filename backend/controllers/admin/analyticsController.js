import productModel from "../../models/product.models.js";
import Order from "../../models/order.models.js";

export const getAnalytics = async (req, res) => {
    try {
        const products = await productModel.countDocuments();
        const orders = await Order.countDocuments();
        const salesData = await Order.aggregate([
            {
                $group: {
                    _id: null,
                    totalRevenue: { $sum: '$total' },
                    totalSales: { $sum: 1 }
                }
            }
        ])

        const sales = salesData.length > 0 ? salesData[0] : { totalSales: 0, totalRevenue: 0 };
        res.status(200).json({ success: true, products, orders, sales });
    } catch (error) {
        res.status(500).json({ success: false, message: `Server Error in get analytics - ${error} ` });
    }
};