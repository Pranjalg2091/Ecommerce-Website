import React from "react";
import axios from "axios";
import { MdLockOutline } from "react-icons/md";

const UpiPayButton = ({ amount, onSuccess, user, disabled, checkoutId }) => {
  const loadScript = () => {
    return new Promise((resolve) => {
      if (window.Razorpay) return resolve(true);

      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";

      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);

      document.body.appendChild(script);
    });
  };

 const handlePayment = async () => {
  try {
    if (!checkoutId) {
      alert("Please click Checkout first");
      return;
    }

    const isLoaded = await loadScript();

    if (!isLoaded) {
      alert("Razorpay SDK failed to load");
      return;
    }

    // ✅ STEP 1: CREATE ORDER FROM BACKEND
    const orderRes = await axios.post(
      `${import.meta.env.VITE_BACKEND_URL}/api/payment/create-order`,
      { amount }
    );

    const order = orderRes.data;

    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: order.amount,
      currency: order.currency,
      order_id: order.id,

      name: "GrainMart",
      description: "Order Payment",

      handler: async function (response) {
        try {

          // ✅ STEP 2: VERIFY PAYMENT
          const verifyRes = await axios.post(
            `${import.meta.env.VITE_BACKEND_URL}/api/payment/verify-payment`,
            {
              ...response,
              checkoutId,
            }
          );

          if (verifyRes.data.success) {
            onSuccess(response);
          } else {
            alert("Payment verification failed");
          }
        } catch (error) {
          console.error(error);
          alert("Verification failed");
        }
      },

      prefill: {
        name: user?.name || "Guest",
        contact: user?.phone || "9999999999",
      },

      theme: {
        color: "#16a34a",
      },
    };

    const razorpayInstance = new window.Razorpay(options);
    razorpayInstance.open();

  } catch (error) {
    console.error(error);
    alert("Payment failed");
  }
};

  return (
    <button
      onClick={handlePayment}
      disabled={disabled}
      className="w-full flex items-center justify-center gap-2 bg-primary-500 hover:bg-primary-600 text-white py-3 rounded-sm transition-all duration-200 font-manrope text-sm disabled:opacity-50 disabled:cursor-not-allowed"
    >
      <MdLockOutline className="text-lg" />
      <span>Pay ₹{amount} Securely</span>
    </button>
  );
};

export default UpiPayButton;
