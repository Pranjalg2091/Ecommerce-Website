import express from "express";
import jwt from "jsonwebtoken";
import User from "../models/userSchema.js";
import { protect } from "../middleware/authMiddleware.js";

const userRouter = express.Router();

// User registration
userRouter.post("/register", async (request, response) => {
  const { name, email, phonenumber, password } = request.body;

  try {
    let user = await User.findOne({ email });
    if (user) {
      return response.status(400).json({ message: "User already exists" });
    }

    user = new User({ name, email, phonenumber, password });
    await user.save();

    // ✅ FIXED PAYLOAD
    const payload = {
      userId: user._id,
      role: user.role,
    };

    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: "7d" },
      (err, token) => {
        if (err) throw err;

        response.status(201).json({
          user: {
            _id: user._id,
            name: user.name,
            email: user.email,
            phonenumber: user.phonenumber,
            role: user.role,
            createdAt: user.createdAt,
            addresses: user.addresses,
          },
          token,
        });
      },
    );
  } catch (error) {
    console.log(error);
    response.status(500).send({ message: error.message });
  }
});

// User login
userRouter.post("/login", async (request, response) => {
  const { email, password } = request.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return response.status(400).json({ message: "Invalid credentials" });
    }

    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return response.status(400).json({ message: "Invalid credentials" });
    }

    // ✅ FIXED PAYLOAD
    const payload = {
      userId: user._id,
      role: user.role,
    };

    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: "7d" },
      (err, token) => {
        if (err) throw err;

        response.json({
          user: {
            _id: user._id,
            name: user.name,
            email: user.email,
            phonenumber: user.phonenumber,
            role: user.role,
            createdAt: user.createdAt,
            addresses: user.addresses,
          },
          token,
        });
      },
    );
  } catch (error) {
    console.log(error);
    response.status(500).send({ message: error.message });
  }
});

// Profile route (protected)
userRouter.get("/profile", protect, async (request, response) => {
  response.json(request.user);
});

// Update Profile
userRouter.put("/profile", protect, async (request, response) => {
  try {
    const user = await User.findById(request.user._id);

    if (!user) {
      return response.status(404).json({
        message: "User not found",
      });
    }
    const { name, email, phonenumber } = request.body;

    // Check email uniqueness
    if (email && email !== user.email) {
      const existingUser = await User.findOne({ email });

      if (existingUser) {
        return response.status(400).json({
          message: "Email already exists",
        });
      }
      user.email = email;
    }

    // Update fields
    user.name = name || user.name;
    user.phonenumber = phonenumber || user.phonenumber;

    const updatedUser = await user.save();

    response.json({
      message: "Profile updated successfully",
      user: {
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        phonenumber: updatedUser.phonenumber,
        role: updatedUser.role,
        createdAt: updatedUser.createdAt,
        addresses: updatedUser.addresses,
      },
    });
  } catch (error) {
    console.error(error);

    response.status(500).json({
      message: "Server Error",
    });
  }
});

// Get User Addresses
userRouter.get("/addresses", protect, async (request, response) => {
  try {
    const user = await User.findById(request.user._id).select("addresses");

    response.json(user.addresses);
  } catch (error) {
    response.status(500).json({
      message: "Server Error",
    });
  }
});

// Add Address
userRouter.post("/addresses", protect, async (request, response) => {
  try {
    const user = await User.findById(request.user._id);

    if (!user) {
      return response.status(404).json({
        message: "User not found",
      });
    }
    const newAddress = request.body;

    if (newAddress.isDefault) {
      user.addresses.forEach((address) => {
        address.isDefault = false;
      });
    }
    user.addresses.push(newAddress);
    await user.save();

    response.status(201).json({
      message: "Address added successfully",
      addresses: user.addresses,
    });
  } catch (error) {
    response.status(500).json({
      message: "Server Error",
    });
  }
});

// Update Address
userRouter.put("/addresses/:id", protect, async (request, response) => {
  try {
    const user = await User.findById(request.user._id);

    const address = user.addresses.id(request.params.id);

    if (!address) {
      return response.status(404).json({
        message: "Address not found",
      });
    }

    if (request.body.isDefault) {
      user.addresses.forEach((addr) => {
        addr.isDefault = false;
      });
    }

    Object.assign(address, request.body);

    await user.save();

    response.json({
      message: "Address updated successfully",
      addresses: user.addresses,
    });
  } catch (error) {
    response.status(500).json({
      message: "Server Error",
    });
  }
});

// Delete Address
userRouter.delete("/addresses/:id", protect, async (request, response) => {
  try {
    const user = await User.findById(request.user._id);

    user.addresses.pull(request.params.id);

    await user.save();

    response.json({
      message: "Address deleted successfully",
      addresses: user.addresses,
    });
  } catch (error) {
    response.status(500).json({
      message: "Server Error",
    });
  }
});

// Change Password
userRouter.put("/change-password", protect, async (request, response) => {
  try {
    const { currentPassword, newPassword } = request.body;

    if (!currentPassword || !newPassword) {
      return response.status(400).json({
        message: "All fields are required",
      });
    }
    const user = await User.findById(request.user._id);
    const isMatch = await user.matchPassword(currentPassword);

    if (!isMatch) {
      return response.status(400).json({
        message: "Current password is incorrect",
      });
    }
    user.password = newPassword;
    await user.save();

    response.json({
      message: "Password changed successfully",
    });
  } catch (error) {
    console.error(error);

    response.status(500).json({
      message: "Server Error",
    });
  }
});

export default userRouter;
