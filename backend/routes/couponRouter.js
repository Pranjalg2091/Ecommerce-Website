import express from "express";
import Coupon from "../models/couponSchema.js";

const couponRouter = express.Router();

// ==========================================
// CREATE COUPON
// POST /api/coupon
// ==========================================
couponRouter.post("/", async (request, response) => {
  try {

    const {
      code,
      discountType,
      discountValue,
      minimumAmount,
      maxDiscount,
      expiryDate,
    } = request.body;

    const couponExists = await Coupon.findOne({
      code: code.toUpperCase(),
    });

    if (couponExists) {
      return response.status(400).json({
        message: "Coupon already exists",
      });
    }

    const coupon = await Coupon.create({
      code,
      discountType,
      discountValue,
      minimumAmount,
      maxDiscount,
      expiryDate,
      isActive: true,
    });

    response.status(201).json(coupon);

  } catch (error) {

    console.error(error);

    response.status(500).json({
      message: "Server Error",
    });

  }
});

// ==========================================
// Apply Coupon
// POST /api/coupon/apply
// ==========================================
couponRouter.post("/apply", async (request, response) => {
  try {
    const { couponCode, subtotal } = request.body;

    if (!couponCode) {
      return response.status(400).json({
        success: false,
        message: "Coupon code required",
      });
    }

    const coupon = await Coupon.findOne({
      code: couponCode.toUpperCase(),
      isActive: true,
    });

    if (!coupon) {
      return response.status(404).json({
        success: false,
        message: "Invalid coupon code",
      });
    }

    if (coupon.expiryDate && coupon.expiryDate < new Date()) {
      return response.status(400).json({
        success: false,
        message: "Coupon expired",
      });
    }

    if (subtotal < coupon.minimumAmount) {
      return response.status(400).json({
        success: false,
        message: `Minimum order amount is ₹${coupon.minimumAmount}`,
      });
    }

    let couponDiscount = 0;

    if (coupon.discountType === "percentage") {
      couponDiscount = subtotal * (coupon.discountValue / 100);

      if (coupon.maxDiscount > 0 && couponDiscount > coupon.maxDiscount) {
        couponDiscount = coupon.maxDiscount;
      }
    } else {
      couponDiscount = coupon.discountValue;
    }
    return response.status(200).json({
      success: true,
      couponDiscount,
      message: "Coupon applied successfully",
    });
  } catch (error) {
    console.error(error);

    response.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
});

// GET ALL ACTIVE COUPONS
couponRouter.get("/", async (request, response) => {
  try {
    const coupons = await Coupon.find({
      isActive: true,
    }).sort({
      createdAt: -1,
    });

    response.status(200).json(coupons);
  } catch (error) {
    console.error(error);

    response.status(500).json({
      message: "Server Error",
    });
  }
});

export default couponRouter;
