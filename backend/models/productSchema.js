import mongoose from "mongoose";

// ✅ Variant Schema (sizes)
const sizeSchema = new mongoose.Schema({
  weight: {
    type: String, // e.g. "5kg"
    required: true,
    trim: true,
  },
  price: {
    type: Number,
    required: true,
  },
  originalPrice: {  
    type: Number,
    required: true,  // For showing discounts, if any
  },
});

// ✅ Image Schema
const imageSchema = new mongoose.Schema({
  url: {
    type: String,
    required: true,
  },
  altText: {
    type: String,
    default: "",
  },
});

// ✅ Main Product Schema
const productSchema = new mongoose.Schema(
  {
    // 🔹 Basic Info
    name: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      required: true,
    },

    category: {
      type: String,
      required: true,
      enum: ["Wheat", "Wheat Flour", "Organic Grains"],
    },

    // 🔹 Admin Fields
    sku: {
      type: String,
      required: true,
      unique: true,
    },

    countInStock: {
      type: Number,
      required: true,
      default: 0,
    },

    // 🔹 Origin (user page me hai)
    origin: {
      type: String,
      default: "",
    },

    // 🔹 Ratings (future ready)
    rating: {
      type: Number,
      default: 0,
    },

    reviews: {
      type: Number,
      default: 0,
    },

    // 🔹 Variants (IMPORTANT ⚡)
    sizes: {
      type: [sizeSchema],
      validate: [(arr) => arr.length > 0, "At least one size is required"],
    },

    // 🔹 Base Price (for sorting 🔥)
    basePrice: {
      type: Number,
    },

    // 🔹 Images
    images: {
      type: [imageSchema],
      default: [],
    },

    // 🔹 Features
    features: {
      type: [String],
      default: [],
    },

    // 🔹 Nutrition
    nutrition: {
      energy: String,
      protein: String,
      carbs: String,
      fiber: String,
    },

    // 🔹 Storage Guide
    storage: {
      type: String,
    },

    // 🔹 Grinding Slots (optional)
    grindingSlots: {
      type: [String],
      default: [],
    },

    // 🔹 Status
    isActive: {
      type: Boolean,
      default: true,
    },
    isFeatured: {
      type: Boolean,
      default: false,
    },
    isPublished: {
      type: Boolean,
      default: false,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    // metaTitle: {
    //   type: String,
    // },
    // metaDescription: {
    //   type: String,
    // },
    // metaKeywords: {
    //   type: [String],
    // },
  },
  {
    timestamps: true,
  },
);

// ✅ 🔥 AUTO CALCULATE basePrice (VERY IMPORTANT)
productSchema.pre("save", async function () {
  if (this.sizes && this.sizes.length > 0) {
    this.basePrice = Math.min(...this.sizes.map((s) => s.price));
  }
});

export default mongoose.model("Product", productSchema);
