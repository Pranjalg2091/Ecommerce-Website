import express from "express";
import Product from "../models/productSchema.js";
import { protect, admin } from "../middleware/authMiddleware.js";

const productRouter = express.Router();

// ✅ CREATE PRODUCT
productRouter.post("/", protect, admin, async (request, response) => {
  try {
    const {
      name,
      description,
      category,
      sku,
      countInStock,
      origin,
      sizes,
      images,
      features,
      nutrition,
      storage,
      grindingSlots,
      isFeatured,
      isPublished,
    } = request.body;

    // 🔴 Basic Validation
    if (
      !name ||
      !description ||
      !category ||
      !sku ||
      !sizes ||
      sizes.length === 0
    ) {
      return response.status(400).json({
        message: "Please fill all required fields",
      });
    }

    // 🔴 Check SKU duplicate
    const existingProduct = await Product.findOne({ sku });
    if (existingProduct) {
      return response.status(400).json({
        message: "Product with this SKU already exists",
      });
    }

    // ✅ Create Product
    const product = new Product({
      name,
      description,
      category,
      sku,
      countInStock,
      origin,
      sizes,
      images,
      features,
      nutrition,
      storage,
      grindingSlots,
      isFeatured,
      isPublished,
      user: request.user._id, // Associate product with the user who created it
    });

    const createdProduct = await product.save();
    response.status(201).json({ createdProduct });
  } catch (error) {
    console.error(error);
    response.status(500).json({ message: "Server Error" });
  }
});

// Api to update product
productRouter.put("/:id", protect, admin, async (request, response) => {
  try {
    const {
      name,
      description,
      category,
      sku,
      countInStock,
      origin,
      sizes,
      images,
      features,
      nutrition,
      storage,
      grindingSlots,
      isFeatured,
      isPublished,
    } = request.body;

    const product = await Product.findById(request.params.id);
    if (product) {
      product.name = name || product.name;
      product.description = description || product.description;
      product.category = category || product.category;
      product.sku = sku || product.sku;
      product.countInStock = countInStock || product.countInStock;
      product.origin = origin || product.origin;
      product.sizes = sizes || product.sizes;
      product.images = images || product.images;
      product.features = features || product.features;
      product.nutrition = nutrition || product.nutrition;
      product.storage = storage || product.storage;
      product.grindingSlots = grindingSlots || product.grindingSlots;
      product.isFeatured =
        isFeatured !== undefined ? isFeatured : product.isFeatured;
      product.isPublished =
        isPublished !== undefined ? isPublished : product.isPublished;

      const updatedProduct = await product.save();
      response.json({ updatedProduct });
    } else {
      return response.status(404).json({ message: "Product not found" });
    }
  } catch (error) {
    console.error(error);
    response.status(500).json({ message: "Server Error" });
  }
});

// Api to delete product
productRouter.delete("/:id", protect, admin, async (request, response) => {
  try {
    const product = await Product.findById(request.params.id);
    if (product) {
      await product.deleteOne();
      response.json({ message: "Product removed" });
    } else {
      return response.status(404).json({ message: "Product not found" });
    }
  } catch (error) {
    console.error(error);
    response.status(500).json({ message: "Server Error" });
  }
});

// Get Api
productRouter.get("/", async (request, response) => {
  try {
    const { category, size, grindingSlots, search, sortBy, limit } =
      request.query;

    let query = {};

    // Category (case-insensitive)
    if (category && category.toLowerCase() !== "all") {
      query.category = { $regex: `^${category}$`, $options: "i" };
    }

    // Size filter (nested)
    if (size) {
      query["sizes.weight"] = { $in: size.split(",") };
    }

    // Grinding slots (array match)
    if (grindingSlots) {
      query.grindingSlots = { $in: [grindingSlots] };
    }

    // Search
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
      ];
    }

    // Sorting
    let sort = {};
    if (sortBy === "priceAsc") sort = { basePrice: 1 };
    else if (sortBy === "priceDesc") sort = { basePrice: -1 };
    else if (sortBy === "popularity") sort = { rating: -1 };

    const products = await Product.find(query)
      .sort(sort)
      .limit(Number(limit) || 0);

    response.json(products);
  } catch (error) {
    console.error("GET PRODUCTS ERROR:", error);
    response.status(500).json({ message: error.message });
  }
});

// @route GET /api/products/best-seller
// @desc Retrieve the product with highest rating
productRouter.get("/best-seller", async (request, response) => {
  try {
    const bestSeller = await Product.findOne().sort({ rating: -1 });

    if (bestSeller) {
      response.json(bestSeller); // ✅ mila to return karo
    } else {
      response.status(404).json({ message: "No Best Seller Found" }); // ❌ nahi mila to error
    }
  } catch (error) {
    console.error(error);
    response.status(500).json({ message: "Server Error" });
  }
});

// @route GET /api/products/new-arrivals
// @desc Retrieve latest 8 product - creation date
productRouter.get("/new-arrivals", async (request, response) => {
  try {
    const newArrivals = await Product.find().sort({ createdAt: -1 }).limit(8);
    response.json(newArrivals);
  } catch (error) {
    console.error(error);
    response.status(500).json({ message: "Server Error" });
  }
});

// Get API with single products
productRouter.get("/:id", async (request, response) => {
  try {
    const product = await Product.findById(request.params.id);
    if (product) {
      response.json(product);
    } else {
      response.status(404).json({ message: "Product Not Found" });
    }
  } catch (error) {
    console.error(error);
    response.status(500).json({ message: "Server Error" });
  }
});

// @route GET /api/products/similar/:id
// @desc Retrieve similar products based on category
productRouter.get("/similar/:id", async (request, response) => {
  const { id } = request.params;
  try {
    const product = await Product.findById(id);
    if (!product) {
      return response.status(404).json({ message: "Product not found" });
    }

    const similarProducts = await Product.find({
      _id: { $ne: id },
      category: product.category,
    }).limit(4);
    response.json(similarProducts);
  } catch (error) {
    console.error(error);
    response.status(500).json({ message: "Server Error" });
  }
});

export default productRouter;
