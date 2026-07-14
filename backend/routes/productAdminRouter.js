import express from "express";
import { protect, admin } from "../middleware/authMiddleware.js";
import Product from "../models/productSchema.js";

const productAdminRouter = express.Router();

// Get all products (Admin Only)
// Route: GET /api/admin/products
productAdminRouter.get("/", protect, admin, async (request, response) => {
  try {
    const products = await Product.find().sort({
      createdAt: -1,
    });
    response.json(products);
  } catch (error) {
    console.error(error);
    response.status(500).json({
      message: "Server Error",
    });
  }
});

//  GET SINGLE PRODUCT (Admin Only)
productAdminRouter.get("/:id", protect, admin, async (request, response) => {
  try {
    const product = await Product.findById(request.params.id);
    if (!product) {
      return response.status(404).json({
        message: "Product not found",
      });
    }
    response.json(product);
  } catch (error) {
    console.error(error);
    response.status(500).json({
      message: "Server Error",
    });
  }
});

//  CREATE PRODUCT
productAdminRouter.post("/", protect, admin, async (request, response) => {
  try {
    const product = new Product({
      ...request.body,
      user: request.user._id,
    });

    const createdProduct = await product.save();

    response.status(201).json(createdProduct);
  } catch (error) {
    console.error(error);

    response.status(500).json({
      message: "Server Error",
    });
  }
});

/* ==========================================
   UPDATE PRODUCT
========================================== */

productAdminRouter.put("/:id", protect, admin, async (request, response) => {
  try {
    const product = await Product.findById(request.params.id);
    if (!product) {
      return response.status(404).json({
        message: "Product not found",
      });
    }
    Object.assign(product, request.body);
    const updatedProduct = await product.save();
    response.json(updatedProduct);
  } catch (error) {
    console.error(error);
    response.status(500).json({
      message: "Server Error",
    });
  }
});

/* ==========================================
   DELETE PRODUCT
========================================== */

productAdminRouter.delete("/:id", protect, admin, async (request, response) => {
  try {
    const product = await Product.findById(request.params.id);
    if (!product) {
      return response.status(404).json({
        message: "Product not found",
      });
    }
    await product.deleteOne();

    response.json({
      message: "Product deleted successfully",
    });
  } catch (error) {
    console.error(error);
    response.status(500).json({
      message: "Server Error",
    });
  }
});

export default productAdminRouter;
