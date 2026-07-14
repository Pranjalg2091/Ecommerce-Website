import express from "express";
import mongoose from "mongoose";
import { protect } from "../middleware/authMiddleware.js";
import Checkout from "../models/checkoutSchema.js";
import Cart from "../models/cartSchema.js";
import Product from "../models/productSchema.js";
import Order from "../models/orderSchema.js";
import { sendWhatsAppMessage } from "../utility/whatsappService.js";
import Coupon from "../models/couponSchema.js";

const checkoutRouter = express.Router();

// ======================================================
// Calculate Checkout Pricing
// ======================================================
const calculateCheckoutPricing = async (checkoutItems, couponCode = "") => {
  // Product subtotal (already discounted prices)
  const subtotal = checkoutItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );

  let couponDiscount = 0;

  if (couponCode) {
    const coupon = await Coupon.findOne({
      code: couponCode,
      isActive: true,
    });

    if (coupon) {
      if (coupon.discountType === "percentage") {
        couponDiscount = (subtotal * coupon.discountValue) / 100;
      } else {
        couponDiscount = coupon.discountValue;
      }

      // Never allow coupon more than subtotal
      couponDiscount = Math.min(couponDiscount, subtotal);
    }
  }

  const shipping = subtotal >= 499 ? 0 : 40;

  const total = subtotal - couponDiscount + shipping;

  return {
    subtotal,
    couponDiscount,
    shipping,
    total,
  };
};

// Create a new checkout
// Route: POST /api/checkout
checkoutRouter.post("/", protect, async (request, response) => {
  const { checkoutItems, shippingAddress, paymentMethod, couponCode } =
    request.body;

  if (!checkoutItems || checkoutItems.length === 0) {
    return response.status(400).json({ message: "No items in the cart" });
  }

  try {
    // Calculate pricing
    const pricing = await calculateCheckoutPricing(checkoutItems, couponCode);

    const newCheckout = await Checkout.create({
      user: request.user._id,
      checkoutItems,
      shippingAddress,
      paymentMethod,
      couponCode,

      // Old field (existing compatibility)
      totalPrice: pricing.total,

      // New pricing object
      pricing,
      paymentStatus: "Pending",
      isPaid: false,
    });
    console.log(`Checkout created for user: ${request.user._id}`);
    response.status(201).json(newCheckout);
  } catch (error) {
    console.error("Error Creating checkout session:", error);

    response.status(500).json({
      message: error.message,
      errors: error.errors,
    });
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
      // Generate Order Number
      const lastOrder = await Order.findOne().sort({ createdAt: -1 });

      let orderNumber = "GM100001";

      if (lastOrder?.orderNumber) {
        const lastNumber = parseInt(lastOrder.orderNumber.replace("GM", ""));
        orderNumber = `GM${lastNumber + 1}`;
      }

      // Create final order based on checkout details
      const finalOrder = await Order.create({
        user: checkout.user,
        orderItems: checkout.checkoutItems,
        shippingAddress: checkout.shippingAddress,
        paymentMethod: checkout.paymentMethod,
        orderNumber,
        couponCode: checkout.couponCode,

        // Compatibility
        totalPrice: checkout.totalPrice,

        // New pricing snapshot
        pricing: checkout.pricing,
        isPaid: true,
        paidAt: checkout.paidAt,
        isDelivered: false,
        paymentStatus: "paid",
        paymentDetails: checkout.paymentDetails,
      });

      console.log("ORDER CREATED =>", finalOrder);
      console.log("ORDER USER =>", finalOrder.user);

      await finalOrder.populate("user", "name email");

      await sendWhatsAppMessage(finalOrder);

      //   Mark checkout as finalized
      checkout.isFinalized = true;
      checkout.finalizedAt = Date.now();
      await checkout.save();

      //   Delete cart associated with user
      await Cart.findOneAndUpdate(
        { user: checkout.user },
        {
          $set: {
            products: [],
            totalPrice: 0,
            pricing: {
              subtotal: 0,
              discount: 0,
              couponDiscount: 0,
              taxableAmount: 0,
              cgst: 0,
              sgst: 0,
              shipping: 0,
              total: 0,
            },
          },
        },
      );
      response.status(201).json({
        success: true,
        message: "Order placed successfully",
        order: finalOrder,
      });
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
