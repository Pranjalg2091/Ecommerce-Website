import mongoose from "mongoose";
import dotenv from "dotenv";
import Product from "./models/productSchema.js";
import User from "./models/userSchema.js";
import products from "./data/products.js";

dotenv.config();

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI);

// Function to seed Data
const seedData = async () => {
  try {

    console.log("Seeding started...");

    // Clear Existing Data
    await Product.deleteMany();
    await User.deleteMany();

    // Create a Default Admin
    const createdUser = await User.create({
      name: "Admin User",
      email: "admin@example.com",
      password: "123456", // 👉 ensure hash middleware lagaa ho
      role: "admin",
    });

    // Assign  the default user ID to each product
    const userID = createdUser._id;

    const sampleProducts = products.map((product) => {
      return { ...product, user: userID };
    });

    //  Insert the products into the database
    await Product.insertMany(sampleProducts);

    console.log("Product data Seeded Successfully!");
    process.exit();
  } catch (error) {
    console.error("Error seeding the data:", error);
    process.exit(1);
  }
};

seedData();