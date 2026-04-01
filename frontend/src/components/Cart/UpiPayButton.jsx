import React from "react";
import { MdLockOutline } from "react-icons/md";

const UpiPayButton = ({ amount, onSuccess, user }) => {
  const loadScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handlePayment = async () => {
    const isLoaded = await loadScript();

    if (!isLoaded) {
      alert("Razorpay SDK failed to load");
      return;
    }

    const options = {
      key: "rzp_test_SX57Cp9esjlSup", // 👈 apni key daal
      amount: amount * 100,
      currency: "INR",
      name: "GrainMart",
      description: "Order Payment",

      handler: function (response) {
        console.log("Payment Success:", response);
        onSuccess(response);
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
  };

  return (
    <button
      onClick={handlePayment}
      className="w-full flex items-center justify-center gap-2 bg-primary-500 hover:bg-primary-600 text-white py-3 rounded-sm transition-all duration-200 font-manrope text-sm"
    >
      <MdLockOutline className="text-lg" />
      <span>Pay ₹{amount} Securely</span>
    </button>
  );
};

export default UpiPayButton;
