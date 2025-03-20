import Order from "../../models/order.models.js";
import productModel from "../../models/product.models.js";

export const getOrdersAdmin = async (req, res) => {
    try {
        const orders = await Order.find().sort({ createdAt: -1 });
        res.status(200).json({ success: true, message: "Orders fetched successfully", data: orders});
    } catch (error) {
        res.status(500).json({ success: false, message: `Server Error in get orders - ${error}` });
    }
};

export const updateOrderStatusAdmin = async (req, res) => {
    try {
        const { orderId, status } = req.body;
        if (!orderId || !status) {
            return res.status(400).json({ success: false, message: "Invalid data provided!" });
        }
        const order = await Order.findById(orderId);
        if (!order) {
            return res.status(404).json({ success: false, message: "Order not found!" });
        }
        order.status = status || order.status;
        order.paymentStatus = status === "Delivered" ? "Paid" : order.paymentStatus;
        order.paymentStatus = status === "Shipping" ? "Pending" : order.paymentStatus;
        order.paidAt = status === "Delivered" ? Date.now() : order.paidAt;
        order.paidAt = status === "Delivered" ? Date.now() : order.paidAt;
        order.isPaid = status === "Paid" ? true : order.isPaid;
        order.isDelivered = status === "Delivered" ? true : order.isDelivered;
        order.deliveredAt = status === "Delivered" ? Date.now() : order.deliveredAt;

        await order.save();
        res.status(200).json({ success: true, data: order });
    } catch (error) {
        res.status(500).json({ success: false, message: `Server Error in update order status - ${error}` });
};
};

export const deleteOrderAdmin = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);
        if (!order) {
            return res.status(404).json({ success: false, message: "Order not found" });
        }
        if (order.status === "Delivered") {
            return res.status(400).json({ success: false, message: "You cannot delete an order that has been delivered" });
        }
        if (order.status !== "Cancelled") {
            for (let item of order.items) {
                        const product = await productModel.findById(item.productId);
                        if (!product) {
                            return res.status(404).json({ success: false, message: "Product not found!" });
                        }
                        if (product.quantity < item.quantity) {
                            return res.status(400).json({ success: false, message: `Only ${product.quantity} ${product.name} available` });
                        }
                        product.quantity += item.quantity;
                        await product.save();
                    }
            } 
        await Order.findByIdAndDelete(req.params.id);
        res.status(200).json({ success: true, message: "Order deleted successfully" });
    } catch (error) {
        res.status(500).json({ success: false, message: `Server Error in delete order - ${error} ` });
    }
};