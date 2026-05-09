import express from "express";
import { protect, admin } from "../middleware/authMiddleware.js";
import User from "../models/userSchema.js";

const adminRouter = express.Router();

// Get all Users (Admin Only)
// Route: GET /api/admin/users
adminRouter.get("/", protect, admin, async (request, response) => {
  try {
    const users = await User.find({});
    response.json(users);
  } catch (error) {
    console.error(error);
    response.status(500).json({ message: "Server Error" });
  }
});

// Add a new user (Admin Only)
// Route: POST /api/admin/users
adminRouter.post("/", protect, admin, async (request, response) => {
  const { name, email, password, role } = request.body;

  try {
    let user = await User.findOne({ email });
    if (user) {
      return response.status(400).json({ message: "User already exists" });
    }

    user = new User({
      name,
      email,
      password,
      role: role || "customer",
    });
    await user.save();
    response.status(201).json({ message: "User created successfully", user });
  } catch (error) {
    console.error(error);
    response.status(500).json({ message: "Server Error" });
  }
});

// Update user info (Admin Only) - name, email, role
// Route: PUT /api/admin/users/:id
adminRouter.put("/:id", protect, admin, async (request, response) => {
  const { name, email, role } = request.body;

  try {
    const user = await User.findById(request.params.id);

    if (user) {
      user.name = name || user.name;
      user.email = email || user.email;
      user.role = role || user.role;
    }

    const updatedUser = await user.save();
    response.json({ message: "User updated successfully", user: updatedUser });
  } catch (error) {
    console.error(error);
    response.status(500).json({ message: "Server Error" });
  }
});

// Delete a user (Admin Only)
// Route: DELETE /api/admin/users/:id
adminRouter.delete("/:id", protect, admin, async (request, response) => {
  try {
    const user = await User.findById(request.params.id);
    if (user) {
      await user.deleteOne();
      response.json({ message: "User deleted successfully" });
    } else {
      return response.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    console.error(error);
    response.status(500).json({ message: "Server Error" });
  }
});

export default adminRouter;
