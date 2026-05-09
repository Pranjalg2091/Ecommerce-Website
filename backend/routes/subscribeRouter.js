import express from "express";
import Subscribe from "../models/subscribeSchema.js";

const subscribeRouter = express.Router();

// Handle newsletter subscription
// Route: POST /api/subscribe
subscribeRouter.post("/subscribe", async (request, response) => {
  const { email } = request.body;

  if (!email) {
    return response.status(400).json({ message: "Email is required" });
  }

  try {
    let subscribe = await Subscribe.findOne({ email });

    if (subscribe) {
      return response.status(400).json({ message: "Email already subscribed" });
    }

    subscribe = new Subscribe({ email });
    await subscribe.save();

    response.status(201).json({ message: "Successfully Subscribed to newsletter" });
  } catch (error) {
    console.error(error);
    response.status(500).json({ message: "Server Error" });
  }
});

export default subscribeRouter;
