import mongoose from "mongoose";

const cartItemSchema = new mongoose.Schema(
  {
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    size: {
      type: String,
      required: true,
    },
    quantity: {
      type: Number,
      default: 1,
    },
    originalPrice: {
      type: Number,
      required: true,
    },

    discountPercentage: {
      type: Number,
      default: 0,
    },
  },
  {
    _id: false, // Prevents automatic _id generation for subdocuments
  },
);

const cartSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    guestId: {
      type: String,
    },
    products: [cartItemSchema],

    totalPrice: {
      type: Number,
      required: true,
      default: 0,
    },
    pricing: {
      subtotal: {
        type: Number,
        default: 0,
      },

      couponDiscount: {
        type: Number,
        default: 0,
      },

      shipping: {
        type: Number,
        default: 0,
      },

      total: {
        type: Number,
        default: 0,
      },
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export default mongoose.model("Cart", cartSchema);
