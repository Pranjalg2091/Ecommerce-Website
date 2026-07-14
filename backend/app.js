import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import connectDB from "./connection/dbconfig.js";
import userRouter from "./routes/userRouter.js";
import productRouter from "./routes/productRouter.js";
import cartRouter from "./routes/cartRouter.js";
import checkoutRouter from "./routes/checkoutRouter.js";
import orderRouter from "./routes/orderRouter.js";
import uploadRouter from "./routes/uploadRouter.js";
import subscribeRouter from "./routes/subscribeRouter.js";
import adminRouter from "./routes/adminRouter.js";
import productAdminRouter from "./routes/productAdminRouter.js";
import ordersAdminRouter from "./routes/ordersAdminRouter.js";
import paymentRouter from "./routes/paymentRouter.js";
import couponRouter from "./routes/couponRouter.js";

connectDB(); // Call the function to connect to the database

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 9000;

app.get("/", (request, response) => {
  response.send("Hello from GrainMart API!");
});

// API routes
app.use("/api/users", userRouter);
app.use("/api/products", productRouter);
app.use("/api/cart", cartRouter);
app.use("/api/checkout", checkoutRouter);
app.use("/api/orders", orderRouter);
app.use("/api/upload", uploadRouter);
app.use("/api", subscribeRouter);
app.use("/api/payment", paymentRouter);
app.use("/api/coupon", couponRouter);

// Admin routes
app.use("/api/admin/users", adminRouter);
app.use("/api/admin/products", productAdminRouter);
app.use("/api/admin/orders", ordersAdminRouter);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});