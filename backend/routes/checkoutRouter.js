import express from "express";
import mongoose from "mongoose";
import { protect } from "../middleware/authMiddleware.js";
import Checkout from "../models/checkoutSchema.js";
import Cart from "../models/cartSchema.js";
import Product from "../models/productSchema.js";
import Order from "../models/orderSchema.js";
import { sendWhatsAppMessage } from "../utility/whatsappService.js";

const checkoutRouter = express.Router();

// Create a new checkout
// Route: POST /api/checkout
checkoutRouter.post("/", protect, async (request, response) => {
  const { checkoutItems, shippingAddress, paymentMethod, totalPrice } =
    request.body;

  if (!checkoutItems || checkoutItems.length === 0) {
    return response.status(400).json({ message: "No items in the cart" });
  }

  try {
    const newCheckout = await Checkout.create({
      user: request.user._id,
      checkoutItems: checkoutItems,
      shippingAddress,
      paymentMethod,
      totalPrice,
      paymentStatus: "Pending",
      isPaid: false,
    });
    console.log(`Checkout created for user: ${request.user._id}`);
    response.status(201).json(newCheckout);
  } catch (error) {
    console.error("Error Creating checkout session:", error);
    response.status(500).json({ message: "Server Error" });
  }
});

// Update checkout to mark as paid after successful payment
// Route: PUT /api/checkout/:id/pay
checkoutRouter.put("/:id/pay", protect, async (request, response) => {
  const { paymentStatus, paymentDetails } = request.body;

  if (!mongoose.Types.ObjectId.isValid(request.params.id)) {
    return response.status(400).json({ message: "Invalid checkout ID" });
  }

  try {
    const checkout = await Checkout.findById(request.params.id);

    if (!checkout) {
      return response.status(404).json({ message: "Checkout not found" });
    }

    if (paymentStatus === "paid") {
      checkout.isPaid = true;
      checkout.paymentStatus = paymentStatus;
      checkout.paymentDetails = paymentDetails;
      checkout.paidAt = Date.now();

      await checkout.save();
      response.status(200).json(checkout);
    } else {
      return response.status(400).json({ message: "Invalid Payment Status" });
    }
  } catch (error) {
    console.error(error);
    response.status(500).json({ message: "Server Error" });
  }
});

// Finaliize checkout and convert to an order after payment confirmation
// Route: POST /api/checkout/:id/finalize
checkoutRouter.post("/:id/finalize", protect, async (request, response) => {
  
  if (!mongoose.Types.ObjectId.isValid(request.params.id)) {
    return response.status(400).json({ message: "Invalid checkout ID" });
  }

  try {
    const checkout = await Checkout.findById(request.params.id);

    if (!checkout) {
      return response.status(404).json({ message: "Checkout not found" });
    }

    if (checkout.isPaid && !checkout.isFinalized) {
      // Create final order based on checkout details
      const finalOrder = await Order.create({
        user: checkout.user,
        orderItems: checkout.checkoutItems,
        shippingAddress: checkout.shippingAddress,
        paymentMethod: checkout.paymentMethod,
        totalPrice: checkout.totalPrice,
        isPaid: true,
        paidAt: checkout.paidAt,
        isDelivered: false,
        paymentStatus: "paid",
        paymentDetails: checkout.paymentDetails,
      });

      await sendWhatsAppMessage(finalOrder);

      //   Mark checkout as finalized
      checkout.isFinalized = true;
      checkout.finalizedAt = Date.now();
      await checkout.save();

      //   Delete cart associated with user
      await Cart.findOneAndDelete({ user: checkout.user });
      response.status(201).json(finalOrder);
    } else if (checkout.isFinalized) {
      return response
        .status(400)
        .json({ message: "Checkout already finalized" });
    } else {
      return response.status(400).json({ message: "Checkout not paid" });
    }
  } catch (error) {
    console.error(error);
    response.status(500).json({ message: "Server Error" });
  }
});

export default checkoutRouter;
