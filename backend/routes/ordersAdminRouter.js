import express from 'express';
import { protect, admin } from '../middleware/authMiddleware.js';
import Order from '../models/orderSchema.js';

const ordersAdminRouter = express.Router();

// Get all orders (Admin Only)
// Route: GET /api/admin/orders
ordersAdminRouter.get("/", protect, admin, async (request, response) => {
    try {
        const orders = await Order.find({}).populate("user", "name email");
        response.json(orders);
    } catch (error) {
        console.error(error);
        response.status(500).json({ message: 'Server Error' });
    }
});

// Update order status
// Route: PUT /api/admin/orders/:id
ordersAdminRouter.put("/:id", protect, admin, async (request, response) => {
    try {
       const order = await Order.findById(request.params.id).populate("user", "name");
       if (order) {
        order.status = request.body.status || order.status;
        order.isDelivered = 
            request.body.status === "Delivered" ? true : order.isDelivered;
        order.deliveredAt = 
            request.body.status === "Delivered" ? Date.now() : order.deliveredAt;

        const updatedOrder = await order.save();
        response.json(updatedOrder);
       } else {
        response.status(404).json({ message: 'Order not found' });
       }
    } catch (error) {
        console.error(error);
        response.status(500).json({ message: 'Server Error' });
    }
});
    
// Delete an order
// Route: DELETE /api/admin/orders/:id
ordersAdminRouter.delete("/:id", protect, admin, async (request, response) => {
    try {
        const order = await Order.findById(request.params.id);
        if (order) {
            await order.deleteOne();
            response.json({ message: 'Order removed' });
        } else {
            response.status(404).json({ message: 'Order not found' });
        }
    } catch (error) {
        console.error(error);
        response.status(500).json({ message: 'Server Error' });
    }
});


export default ordersAdminRouter;