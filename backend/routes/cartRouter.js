import express from "express";
import Cart from "../models/cartSchema.js";
import Product from "../models/productSchema.js";
import { protect } from "../middleware/authMiddleware.js";

const cartRouter = express.Router();

// Helper function to get cart by user Id or guest Id
const getCart = async (userId, guestId) => {
  if (userId) {
    return await Cart.findOne({ user: userId });
  } else if (guestId) {
    return await Cart.findOne({ guestId });
  }
  return null;
};

// ======================================================
// Calculate Cart Pricing
// ======================================================
const calculateCartPricing = (products) => {
  const subtotal = products.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );

  // Abhi coupon nahi lagaya hai
  const couponDiscount = 0;
  
  const shipping = subtotal >= 999 ? 0 : 40;

  const total = subtotal - couponDiscount + shipping;

  return {
    subtotal,
    couponDiscount,
    shipping,
    total,
  };
};

// ======================================================
// ✅ ADD TO CART
// ======================================================
cartRouter.post("/", async (request, response) => {
  const { productId, quantity, size, guestId, userId } = request.body;

  try {
    // 🔹 Get Product
    const product = await Product.findById(productId);
    if (!product) {
      return response.status(404).json({ message: "Product not found" });
    }

    // 🔹 Match size
    const selectedSize = product.sizes.find((s) => s.weight === size);

    if (!selectedSize) {
      return response.status(400).json({
        message: "Invalid size/weight selected",
      });
    }

    let cart = await getCart(userId, guestId);

    // 🔹 If cart exists, update it
    if (cart) {
      const productIndex = cart.products.findIndex(
        (p) => p.productId.toString() === productId && p.size === size,
      );

      if (productIndex > -1) {
        // If product already in cart with same size, update quantity
        cart.products[productIndex].quantity += quantity;
      } else {
        cart.products.push({
          productId,
          name: product.name,
          image: product.images?.[0]?.url || "",
          price: selectedSize.price,
          originalPrice: selectedSize.originalPrice,
          discountPercentage: Math.round(
            ((selectedSize.originalPrice - selectedSize.price) /
              selectedSize.originalPrice) *
              100,
          ),
          size,
          quantity,
        });
      }
      // Recalculate total price
      cart.totalPrice = cart.products.reduce(
        (total, item) => total + item.price * item.quantity,
        0,
      );

      // New pricing object
      cart.pricing = calculateCartPricing(cart.products);

      await cart.save();
      return response.status(200).json(cart);
    } else {
      // 🔹 Create new cart
      const newCart = await Cart.create({
        user: userId ? userId : undefined,
        guestId: guestId ? guestId : "guest_" + Date.now(),
        products: [
          {
            productId,
            name: product.name,
            image: product.images?.[0]?.url || "",
            price: selectedSize.price,
            originalPrice: selectedSize.originalPrice,
            discountPercentage: Math.round(
              ((selectedSize.originalPrice - selectedSize.price) /
                selectedSize.originalPrice) *
                100,
            ),
            size,
            quantity,
          },
        ],
        totalPrice: selectedSize.price * quantity,
      });

      // New
      newCart.pricing = calculateCartPricing(newCart.products);

      await newCart.save();
      return response.status(201).json(newCart);
    }
  } catch (error) {
    console.error(error);
    return response.status(500).json({ message: "Server Error" });
  }
});

// Update Cart Item
// PUT /api/cart
cartRouter.put("/", async (request, response) => {
  const { productId, size, quantity, guestId, userId } = request.body;

  try {
    let cart = await getCart(userId, guestId);
    if (!cart) return response.status(404).json({ message: "Cart not found" });

    const productIndex = cart.products.findIndex(
      (p) => p.productId.toString() === productId && p.size === size,
    );

    if (productIndex > -1) {
      // Update quantity
      if (quantity > 0) {
        cart.products[productIndex].quantity = quantity;
      } else {
        cart.products.splice(productIndex, 1);
      }

      cart.totalPrice = cart.products.reduce(
        (total, item) => total + item.price * item.quantity,
        0,
      );

      // New pricing object
      cart.pricing = calculateCartPricing(cart.products);

      await cart.save();
      return response.status(200).json(cart);
    } else {
      return response
        .status(404)
        .json({ message: "Product not found in cart" });
    }
  } catch (error) {
    console.error(error);
    return response.status(500).json({ message: "Server Error" });
  }
});

// Delete or Remove product from cart
// DELETE /api/cart
cartRouter.delete("/", async (request, response) => {
  const { productId, size, guestId, userId } = request.body;

  try {
    let cart = await getCart(userId, guestId);
    if (!cart) return response.status(404).json({ message: "Cart not found" });

    const productIndex = cart.products.findIndex(
      (p) => p.productId.toString() === productId && p.size === size,
    );

    if (productIndex > -1) {
      cart.products.splice(productIndex, 1);

      cart.totalPrice = cart.products.reduce(
        (total, item) => total + item.price * item.quantity,
        0,
      );

      // New pricing object
      cart.pricing = calculateCartPricing(cart.products);

      await cart.save();
      return response.status(200).json(cart);
    } else {
      return response
        .status(404)
        .json({ message: "Product not found in cart" });
    }
  } catch (error) {
    console.error(error);
    return response.status(500).json({ message: "Server Error" });
  }
});

// Get logged in user's cart or guest cart
// GET /api/cart
cartRouter.get("/", async (request, response) => {
  const { guestId, userId } = request.query;

  try {
    const cart = await getCart(userId, guestId);

    if (cart) {
      return response.status(200).json(cart);
    }

    return response.status(200).json({
      products: [],
      pricing: {
        subtotal: 0,
        discount: 0,
        couponDiscount: 0,
        taxableAmount: 0,
        cgst: 0,
        sgst: 0,
        shipping: 40,
        total: 40,
      },
      totalPrice: 0,
    });
  } catch (error) {
    console.error(error);
    response.status(500).json({ message: "Server Error" });
  }
});

// Merge guest cart with user cart on login
// POST /api/cart/merge
cartRouter.post("/merge", protect, async (request, response) => {
  const { guestId } = request.body;

  try {
    // Find guest cart and user cart
    const guestCart = await Cart.findOne({ guestId });
    const userCart = await Cart.findOne({ user: request.user._id });

    if (guestCart) {
      if (guestCart.products.length === 0) {
        return response.status(400).json({ message: "Guest cart is empty" });
      }

      if (userCart) {
        guestCart.products.forEach((guestItem) => {
          const productIndex = userCart.products.findIndex(
            (item) =>
              item.productId.toString() === guestItem.productId.toString() &&
              item.size === guestItem.size,
          );

          if (productIndex > -1) {
            userCart.products[productIndex].quantity += guestItem.quantity;
          } else {
            userCart.products.push(guestItem);
          }
        });

        userCart.totalPrice = userCart.products.reduce(
          (total, item) => total + item.price * item.quantity,
          0,
        );

        userCart.pricing = calculateCartPricing(userCart.products);

        await userCart.save();

        // Remove the guest cart after merging
        try {
          await Cart.findOneAndDelete({ guestId });
        } catch (error) {
          console.error("Error deleting guest cart after merge:", error);
        }
        return response.status(200).json(userCart);
      } else {
        guestCart.user = request.user._id;
        guestCart.guestId = undefined;

        guestCart.pricing = calculateCartPricing(guestCart.products);

        await guestCart.save();
        return response.status(200).json(guestCart);
      }
    } else {
      if (userCart) {
        return response.status(200).json(userCart);
      }
      return response.status(404).json({ message: "No cart to merge" });
    }
  } catch (error) {
    console.error(error);
    response.status(500).json({ message: "Server Error" });
  }
});

export default cartRouter;
