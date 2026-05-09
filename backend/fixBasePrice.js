import mongoose from "mongoose";
import dotenv from "dotenv";
import Product from "./models/productSchema.js";

dotenv.config();

await mongoose.connect(process.env.MONGO_URI);

const fixBasePrice = async () => {
  try {
    const products = await Product.find();

    for (let product of products) {
      if (product.sizes && product.sizes.length > 0) {
        product.basePrice = Math.min(
          ...product.sizes.map((s) => s.price)
        );
        await product.save();
      }
    }

    console.log("✅ basePrice fixed for all products");
    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

fixBasePrice();