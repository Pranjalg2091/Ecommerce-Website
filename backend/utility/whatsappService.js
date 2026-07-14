import axios from "axios";
import User from "../models/userSchema.js";

export const sendWhatsAppMessage = async (order) => {
  try {
    console.log("WHATSAPP_TOKEN =", process.env.WHATSAPP_TOKEN);
    console.log("PHONE_NUMBER_ID =", process.env.PHONE_NUMBER_ID);
    console.log("ADMIN_NUMBER =", process.env.ADMIN_WHATSAPP_NUMBER);

    // User details fetch karo
    const user = await User.findById(order.user);

    // Message format
    const message = `
      NEW ORDER RECEIVED

      Customer: ${user.name}
      Email: ${user.email}
      Phone Number: ${user.phonenumber}

      ITEMS:
        ${order.orderItems
          .map(
            (item) =>
              `• ${item.name} (${item.size}) x ${item.quantity} - ₹${item.price}`,
          )
          .join("\n")}

      Total Amount: ₹${order.totalPrice}

      SHIPPING ADDRESS:
        ${order.shippingAddress.address}
        ${order.shippingAddress.city}, ${order.shippingAddress.state}
        ${order.shippingAddress.postalCode}

      Payment Method: ${order.paymentMethod}

      Order Status: ${order.status}
`;

    console.log("Sending WhatsApp message...");

    // Send message to Admin
    const response = await axios.post(
      `https://graph.facebook.com/v22.0/${process.env.PHONE_NUMBER_ID}/messages`,
      {
        messaging_product: "whatsapp",
        to: process.env.ADMIN_WHATSAPP_NUMBER,
        type: "text",
        text: {
          body: message,
        },
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.WHATSAPP_TOKEN}`,
          "Content-Type": "application/json",
        },
      },
    );

    console.log("META RESPONSE =", response.data);
    console.log("WhatsApp notification sent successfully");
    return response.data;
  } catch (error) {
    console.log("ERROR RESPONSE =", error.response?.data);
    console.log("ERROR MESSAGE =", error.message);
  }
};

export default sendWhatsAppMessage;