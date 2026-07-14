import React from "react";
import axios from "axios";
import { MdLockOutline } from "react-icons/md";

const UpiPayButton = ({
  amount,
  paymentMethod,
  onSuccess,
  user,
  disabled,
  checkoutId,
  setCheckoutId,
  shippingAddress,
  checkoutItems,
  couponCode,
}) => {
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
    console.log("SHIPPING ADDRESS =", shippingAddress);

    if (
      !shippingAddress.address ||
      !shippingAddress.city ||
      !shippingAddress.postalCode ||
      !shippingAddress.state ||
      !shippingAddress.country
    ) {
      alert("Please fill all delivery details");
      return;
    }

    try {
      // if (!checkoutId) {
      //   alert("Please click Checkout first");
      //   return;
      // }

      let currentCheckoutId = checkoutId;

      if (!currentCheckoutId) {
        console.log("CHECKOUT DATA =", {
          checkoutItems,
          shippingAddress,
          paymentMethod: "Razorpay",
          couponCode,
          totalPrice: amount,
        });

        const checkoutRes = await axios.post(
          `${import.meta.env.VITE_BACKEND_URL}/api/checkout`,
          {
            checkoutItems,
            shippingAddress,
            paymentMethod: "Razorpay",
            couponCode,
            totalPrice: amount,
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("userToken")}`,
            },
          },
        );

        currentCheckoutId = checkoutRes.data._id;

        setCheckoutId(currentCheckoutId);
      }

      const isLoaded = await loadScript();

      if (!isLoaded) {
        alert("Razorpay SDK failed to load");
        return;
      }

      // ✅ STEP 1: CREATE ORDER FROM BACKEND
      const orderRes = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/payment/create-order`,
        {
          checkoutId: currentCheckoutId,
        },
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
                checkoutId: currentCheckoutId,
              },
            );

            if (verifyRes.data.success) {
              onSuccess(response, currentCheckoutId);
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
      console.error("PAYMENT ERROR =", error);

      if (error.response) {
        console.log("STATUS =", error.response.status);
        console.log("DATA =", error.response.data);
      }

      alert("Payment failed");
    }
  };

  return (
    <button
      type="button"
      onClick={handlePayment}
      disabled={disabled}
         className="w-full flex items-center justify-center gap-2 bg-primary-500 hover:bg-primary-600 text-white py-4 rounded-lg transition-all duration-300 font-medium text-base shadow-md hover:shadow-lg disabled:opacity-50"
   >
      <MdLockOutline className="text-lg" />
      <span>
        {paymentMethod === "COD"
          ? `Place Order • ₹${amount}`
          : `Pay ₹${amount} Securely`}
      </span>
    </button>
  );
};

export default UpiPayButton;
