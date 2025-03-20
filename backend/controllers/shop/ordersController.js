import Order from "../../models/order.models.js";
import Cart from '../../models/cart.models.js';
import productModel from '../../models/product.models.js';
import { stripe } from "../../configs/stripe.js";

export const createOrderCOD = async (req, res) => {
    const {userId, items, shippingAddress, paymentMethod, total, userPhone, itemsQuantity} = req.body;
    try {
        for (let item of items) {
            const product = await productModel.findById(item.productId);
            if (!product) {
                return res.status(404).json({ success: false, message: "Product not found!" });
            }
            if (product.quantity < item.quantity) {
                return res.status(400).json({ success: false, message: `Only ${product.quantity} ${product.name} available` });
            }
            product.quantity -= item.quantity;
            await product.save();
        }
        const order = await Order.create({userId: userId, items: items, shippingAddress: shippingAddress, paymentMethod: paymentMethod, total: total, userPhone: userPhone, isPaid: false, isDelivered: false, status: 'Processing', paymentStatus: 'Unpaid', itemsQuantity: itemsQuantity});
        await Cart.findOneAndDelete({userId: userId});
        res.status(200).json({ success: true, data: order, message: 'Order created successfully' });
    } catch (error) {
        res.status(500).json({ success: false, message: `Server Error in createOrderCOD - ${error}` });
    }
}

export const updateOrderStatus = async (req, res) => {
    const {orderId, status, paymentStatus} = req.body;
    try {
        if (!orderId || !status) {
            return res.status(400).json({ success: false, message: "Invalid data provided!" });
        }
        const order = await Order.findById(orderId);
        if (!order) {
            return res.status(404).json({ success: false, message: "Order not found!" });
        }
        order.status = status;
        order.paymentStatus = paymentStatus;
        if( paymentStatus === 'Paid' ) {
            order.isPaid = true;
            order.paidAt = Date.now();
        }
        if( status === 'Delivered' ) {
            order.paymentStatus = 'Paid';
            order.paidAt = Date.now();
            order.isPaid = true;
            order.isDelivered = true;
            order.deliveredAt = Date.now();
        }
        await order.save();
        res.status(200).json({ success: true, data: order });
    } catch (error) {
        res.status(500).json({ success: false, message: `Server Error in update order status - ${error}` });
    }
}

export const createOrderStripe = async (req, res) => {
    const {userId, items, shippingAddress, paymentMethod, total, userPhone, itemsQuantity} = req.body;
    const {origin} = req.headers
    try {
        if (!userId || !items || !shippingAddress || !paymentMethod || !total || !itemsQuantity) {
            return res.status(400).json({ success: false, message: "Invalid data provided!" });
        }
        const order = await Order.create({userId: userId, items: items, shippingAddress: shippingAddress, paymentMethod: paymentMethod, total: total, userPhone: userPhone, isPaid: false, isDelivered: false, status: 'Processing', paymentStatus: 'Pending', itemsQuantity: itemsQuantity});

        const line_items = items.map((item) => ({
            price_data: {
                currency: "usd",
                product_data: {
                    name: item.name,
                    images:[item.image]
                },
                unit_amount: item.price * 100,
            },
            quantity: item.quantity
        })) 

        const session = await stripe.checkout.sessions.create({
            success_url: `${origin}/purchase-success?session_id={CHECKOUT_SESSION_ID}&order=${order._id}`,
            cancel_url: `${origin}/purchase-cancel?session_id={CHECKOUT_SESSION_ID}&order=${order._id}`,
            line_items,
            mode: 'payment'
        })


        res.status(200).json({success: true, message: "Order created successfully", sessionId: session.id, orderId: order._id})
        }
 catch (error) {
        res.status(500).json({ success: false, message: `Server Error in createOrderStripe - ${error}` });
    }
}

export const updateStripeStatus = async (req, res) => {
    const {orderId, sessionId} = req.body;
    const session = stripe.checkout.sessions.retrieve(sessionId)


    try{
        if((await session).payment_status === "paid"){
           await Order.findByIdAndUpdate(orderId, {isPaid: true, paymentStatus: "Paid", paidAt: Date.now()})
           for (let item of (await Order.findById(orderId)).items) {
               const product = await productModel.findById(item.productId);
               if (!product) {
                   return res.status(404).json({ success: false, message: "Product not found!" });
                }
                if (product.quantity < item.quantity) {
                    return res.status(400).json({ success: false, message: `Only ${product.quantity} ${product.name} available` });
                }
                product.quantity -= item.quantity;
                await product.save();
            }
            res.status(200).json({success:true, message:"Order status updated"})
        } else {
            await Order.findByIdAndDelete(orderId)
        }
    } catch(error){
        res.status(500).json({ success: false, message: `Server Error in updateStripeStatus - ${error}` });
    }
}

export const getOrders = async (req, res) => {
    const { userId } = req.params;
    try {
        const orders = await Order.find({userId}).sort({createdAt: -1});
        if (!orders) {
            return res.status(404).json({ success: false, message: "Orders not found" });
        }
        res.json(orders);
    } catch (error) {
        res.status(500).json({ success: false, message: `Server Error in get orders - ${error}` });
    }
};

export const getOrderDetails = async (req, res) => {
    const { id } = req.params;
    try {
        const order = await Order.findById(id);
        if (!order) {
            return res.status(404).json({ success: false, message: "Order not found" });
        }
        res.json(order);
    } catch (error) {
        res.status(500).json({ success: false, message: `Server Error in get order details - ${error}` });
    }
};

export const cancelOrder = async (req, res) => {
    const { id } = req.params;
    try {
        const order = await Order.findById(id);
        if (!order) {
            return res.status(404).json({ success: false, message: "Order not found" });
        }
        order.status = "Cancelled";
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
        await order.save();
        res.json({ success: true, message: "Order cancelled successfully", data: order });
    } catch (error) {
        res.status(500).json({ success: false, message: `Server Error in update order status - ${error}` });
    }
};