import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import UpiPayButton from "./UpiPayButton.jsx";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { createCheckout } from "../../redux/slices/checkoutSlice.js";

const Checkout = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const { cart, loading, error } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.auth);

  const [checkoutId, setCheckoutId] = useState(null); // To track if checkout session is created
  const [shippingAddress, setShippingAddress] = useState({
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    postalCode: "",
    state: "",
    country: "",
    phone: "",
  });

  // Ensure cart is loaded before proceeding
  useEffect(() => {
    if (!cart || !cart.products || cart.products.length === 0) {
      navigate("/");
    }
  }, [cart, navigate]);

  // If cart is empty, redirect to home or products page
  if (cart.products.length === 0) {
    navigate("/");
    return null; // or a loading state
  }

  const handleCreateCheckout = async (e) => {
    e.preventDefault();

    if (cart && cart.products.length > 0) {
      const response = await dispatch(
        createCheckout({
          checkoutItems: cart.products,
          shippingAddress,
          paymentMethod: "Razorpay",
          totalPrice: cart.totalPrice,
        }),
      );

      if (response.payload && response.payload._id) {
        setCheckoutId(response.payload._id);
      } else {
        console.error("Checkout creation failed");
      }
    }
  };

  const handlePaymentSuccess = async (details) => {
    try {
      const response = await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/api/checkout/${checkoutId}/pay`,
        {
          paymentStatus: "paid",
          paymentDetails: details,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("userToken")}`,
          },
        },
      );
      await handleFinalizeCheckout(checkoutId);
    } catch (error) {
      console.error(error);
    }
  };

  const handleFinalizeCheckout = async (checkoutId) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/checkout/${checkoutId}/finalize`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("userToken")}`,
          },
        },
      );
      navigate("/order-confirmation");
    } catch (error) {
      console.error(error);
    }
  };

  if (loading) {
    return <p>Loading Cart...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  if (!cart || !cart.products || cart.products.length === 0) {
    return <p>Your Cart is empty</p>;
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-7xl mx-auto px-6 py-10">
      {/* Shipping Address Form - Left Section*/}
      <div className="bg-white font-manrope rounded-lg p-6">
        <h2 className="text-2xl font-dm-serif mb-6">Checkout</h2>
        <form action="" onSubmit={handleCreateCheckout}>
          <h3 className="text-lg font-semibold mb-4">Contact Details</h3>
          <div className="mb-4">
            <label htmlFor="" className="block text-heading">
              Email
            </label>
            <input
              type="email"
              value={user ? user.email : ""}
              className="w-full p-2 border border-border rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-neutral-100 disabled:text-neutral-400 
                disabled:border-neutral-200"
              disabled
            />
          </div>
          <h3 className="text-lg font-semibold mb-4">Delivery</h3>
          <div className="mb-4 grid grid-cols-2 gap-4">
            {/* First Name */}
            <div>
              <label htmlFor="" className="block text-heading">
                First Name
              </label>
              <input
                type="text"
                value={shippingAddress.firstName}
                onChange={(e) =>
                  setShippingAddress({
                    ...shippingAddress,
                    firstName: e.target.value,
                  })
                }
                className="w-full p-2 border border-border rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            {/* Last Name */}
            <div>
              <label htmlFor="" className="block text-heading">
                Last Name
              </label>
              <input
                type="text"
                value={shippingAddress.lastName}
                onChange={(e) =>
                  setShippingAddress({
                    ...shippingAddress,
                    lastName: e.target.value,
                  })
                }
                className="w-full p-2 border border-border rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
          </div>

          {/* Address */}
          <div className="mb-4">
            <label htmlFor="" className="block text-heading">
              Address
            </label>
            <input
              type="text"
              value={shippingAddress.address}
              onChange={(e) =>
                setShippingAddress({
                  ...shippingAddress,
                  address: e.target.value,
                })
              }
              className="w-full p-2 border border-border rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div className="mb-4 grid grid-cols-2 gap-4">
            {/* City */}
            <div>
              <label htmlFor="" className="block text-heading">
                City
              </label>
              <input
                type="text"
                value={shippingAddress.city}
                onChange={(e) =>
                  setShippingAddress({
                    ...shippingAddress,
                    city: e.target.value,
                  })
                }
                className="w-full p-2 border border-border rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            {/* Postal Code */}
            <div>
              <label htmlFor="" className="block text-heading">
                Postal Code
              </label>
              <input
                type="text"
                value={shippingAddress.postalCode}
                onChange={(e) =>
                  setShippingAddress({
                    ...shippingAddress,
                    postalCode: e.target.value,
                  })
                }
                className="w-full p-2 border border-border rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
          </div>

          {/* State */}
          <div className="mb-4">
            <label htmlFor="" className="block text-heading">
              State
            </label>
            <input
              type="text"
              value={shippingAddress.state}
              onChange={(e) =>
                setShippingAddress({
                  ...shippingAddress,
                  state: e.target.value,
                })
              }
              className="w-full p-2 border border-border rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Country */}
          <div className="mb-4">
            <label className="block text-heading">Country</label>
            <input
              type="text"
              value={shippingAddress.country}
              onChange={(e) =>
                setShippingAddress({
                  ...shippingAddress,
                  country: e.target.value,
                })
              }
              className="w-full p-2 border border-border rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Phone Number */}
          <div className="mb-4">
            <label htmlFor="" className="block text-heading">
              Phone Number
            </label>
            <input
              type="tel"
              value={shippingAddress.phone}
              onChange={(e) =>
                setShippingAddress({
                  ...shippingAddress,
                  phone: e.target.value,
                })
              }
              className="w-full p-2 border border-border rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Payment Options */}
          <div className="bg-gray-50 p-4 rounded-lg mb-6">
            <h3 className="text-lg font-semibold mb-3">
              Choose Payment Method
            </h3>

            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                <span className="text-success font-bold">₹</span>
              </div>
              <div>
                <p className="font-medium">UPI / Cards / Netbanking</p>
                <p className="text-sm text-neutral-500">
                  Pay securely via Razorpay
                </p>
              </div>
            </div>

            <UpiPayButton
              amount={cart?.totalPrice || 0}
              checkoutId={checkoutId}
              user={{
                name: `${shippingAddress.firstName} ${shippingAddress.lastName}`,
                phone: shippingAddress.phone,
              }}
              disabled={false} // 👈 IMPORTANT
              onSuccess={handlePaymentSuccess}
            />
          </div>
        </form>
      </div>

      {/* Order Summary - Right Section */}
      <div className="bg-secondary-50 font-manrope p-6 rounded-lg">
        <h3 className="text-lg font-semibold mb-4">Order Summary</h3>
        <div className="border-t py-4 mb-4">
          {cart.products.map((product, index) => (
            <div
              key={index}
              className="flex items-start justify-between py-2 border-b border-border"
            >
              <div className="flex items-start">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-24 h-24 object-cover mr-4"
                />
                <div>
                  <h4 className="text-base font-semibold">{product.name}</h4>
                  <p className="text-sm text-body">
                    Quantity: {product.quantity}
                  </p>

                  <p className="text-sm text-body">Size: {product.size}</p>
                </div>
              </div>

              <p className="text-xl">₹{product.price?.toLocaleString()}</p>
            </div>
          ))}
        </div>

        <div className="flex justify-between items-center text-lg mb-4">
          <p>Subtotal:</p>
          <p>₹{cart.totalPrice?.toLocaleString()}</p>
        </div>

        <div className="flex justify-between items-center text-lg">
          <p>Shipping:</p>
          <p className="text-base">Free</p>
        </div>

        <div className="flex justify-between items-center text-xl font-bold mt-4 border-t pt-4">
          <p>Total:</p>
          <p>₹{cart.totalPrice?.toLocaleString()}</p>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
