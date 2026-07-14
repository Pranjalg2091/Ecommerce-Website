import twilio from "twilio";
import User from "../models/userSchema.js";

export const sendWhatsAppMessage = async (order) => {
  try {
    const client = twilio(
        process.env.TWILIO_SID, 
        process.env.TWILIO_AUTH
    );

    // Get user details
    const user = await User.findById(order.user);

    const message = `
NEW ORDER RECEIVED

Customer: ${user.name}
Email: ${user.email}
Phone Number: ${user.phonenumber}

ITEMS:
${order.orderItems
  .map(
    (item) =>
      `- ${item.name} (${item.size}) x ${item.quantity} - ₹${item.price}`,
  )
  .join("\n")}

Total Amount: ₹${order.totalPrice}

SHIPPING ADDRESS:
${order.shippingAddress.address}
${order.shippingAddress.city},
${order.shippingAddress.state}
${order.shippingAddress.postalCode}

Payment Method: ${order.paymentMethod}

Order Status: ${order.status}
`;

    await client.messages.create({
      from: process.env.TWILIO_WHATSAPP_NUMBER,
      to: process.env.ADMIN_WHATSAPP_NUMBER,
      body: message,
    });

    console.log("WhatsApp notification sent successfully");
  } catch (error) {
    console.log("WhatsApp Error:", error.message);
  }
};
