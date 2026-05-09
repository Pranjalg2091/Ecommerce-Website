import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import Order from "../models/orderSchema.js";

const orderRouter = express.Router();

// Get Logged-in user's orders
// Route: GET /api/orders/my-orders
orderRouter.get("/my-orders", protect, async (request, response) => {
  try {
    const orders = await Order.find({ user: request.user._id }).sort({
      createdAt: -1,
    });
    response.json(orders);
  } catch (error) {
    console.error(error);
    response.status(500).json({ message: "Server Error" });
  }
});

// Get order details by ID
// Route: GET /api/orders/:id
orderRouter.get("/:id", protect, async (request, response) => {
  try {
    const order = await Order.findById(request.params.id).populate(
      "user",
      "name email",
    );

    if (!order) {
      response.status(404).json({ message: "Order not found" });
    }
    // Return full order details
    response.json(order);
  } catch (error) {
    console.error(error);
    response.status(500).json({ message: "Server Error" });
  }
});

export default orderRouter;
