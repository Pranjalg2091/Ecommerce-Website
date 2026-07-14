import express from "express";
import Razorpay from "razorpay";
import crypto from "crypto";
import Checkout from "../models/checkoutSchema.js";

const paymentRouter = express.Router();

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// ✅ CREATE ORDER
paymentRouter.post("/create-order", async (request, response) => {
  try {
    const { checkoutId } = request.body;
    const checkout = await Checkout.findById(checkoutId);

    if (!checkout) {
      return response.status(404).json({
        message: "Checkout not found",
      });
    }

    const amount = checkout.pricing.total;

    if (!amount || amount <= 0) {
      return response.status(400).json({
        message: "Invalid amount",
      });
    }

    const order = await razorpay.orders.create({
      amount: Math.round(amount * 100),
      currency: "INR",
    });

    return response.json(order);
  } catch (error) {
    console.error(error);
    return response.status(500).json({
      message: error.message,
    });
  }
});

// ✅ VERIFY PAYMENT (🔥 IMPORTANT)
paymentRouter.post("/verify-payment", async (request, response) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      checkoutId,
    } = request.body;

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return response.status(400).json({
        success: false,
        message: "Missing payment data",
      });
    }

    const body = `${razorpay_order_id}|${razorpay_payment_id}`;

    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(body)
      .digest("hex");

    if (expectedSignature === razorpay_signature) {
      return response.json({
        success: true,
        message: "Payment verified",
        checkoutId,
      });
    } else {
      return response.status(400).json({
        success: false,
        message: "Invalid signature",
      });
    }
  } catch (error) {
    console.error("VERIFY ERROR:", error);
    return response.status(500).json({
      success: false,
      message: "Verification failed",
    });
  }
});

export default paymentRouter;
