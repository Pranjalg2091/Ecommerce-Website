import express from "express";
import { protect, admin } from "../middleware/authMiddleware.js";
import Product from "../models/productSchema.js";

const productAdminRouter = express.Router();

// Get all products (Admin Only)
// Route: GET /api/admin/products
productAdminRouter.get("/", protect, admin, async (request, response) => {
  try {
    const products = await Product.find({});
    response.json(products);
  } catch (error) {
    console.error(error);
    response.status(500).json({ message: "Server Error" });
  }
});

export default productAdminRouter;