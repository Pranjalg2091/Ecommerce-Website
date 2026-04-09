import express from "express";
import jwt from "jsonwebtoken";
import User from "../models/userSchema.js";
import { protect } from "../middleware/authMiddleware.js";

const userRouter = express.Router();

// User registration
userRouter.post("/register", async (request, response) => {
  const { name, email, password } = request.body;

  try {
    let user = await User.findOne({ email });
    if (user) {
      return response.status(400).json({ message: "User already exists" });
    }
    user = new User({ name, email, password }); // Default role is "customer", but you can set it to "admin" for testing});
    await user.save();

    // Generate JWT token
    const payload = { user: { userId: user._id, role: user.role } };

    // Sign and return the token
    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: "40h" },
      (err, token) => {
        if (err) throw err;

        // Send the user and token in the response
        response.status(201).json({
          user: {
            id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
          },
          token,
        });
      },
    );
  } catch (error) {
    console.log(error); // IMPORTANT: Log the error for debugging
    response.status(500).send({ message: error.message });
  }
});

// User login
userRouter.post("/login", async (request, response) => {
  const { email, password } = request.body;

  try {
    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) {
      return response.status(400).json({ message: "Invalid credentials" });
    }

    // Check if the password is correct
    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return response.status(400).json({ message: "Invalid credentials" });
    }

    // Generate JWT token
    const payload = { user: { userId: user._id, role: user.role } };
    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: "40h" },
      (err, token) => {
        if (err) throw err;

        // Send the user and token in the response
        response.json({
          user: {
            id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
          },
          token,
        });
      },
    );
  } catch (error) {
    console.log(error); // IMPORTANT: Log the error for debugging
    response.status(500).send({ message: error.message });
  }
});

// Profile route (protected)
userRouter.get("/profile", protect, async (request, response) => {
  response.json(request.user);
});

export default userRouter;
