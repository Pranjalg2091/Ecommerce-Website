import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./connection/dbconfig.js";
import userRouter from "./routes/userRouter.js";
import productRouter from "./routes/productRouter.js";

dotenv.config();

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

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});