import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import CartContents from "./CartContents.jsx";
import Breadcrumbs from "../Common/Breadcrumbs.jsx";

const CartPage = () => {
  const navigate = useNavigate();

  const { cart } = useSelector((state) => state.cart);
  const { user, guestId } = useSelector((state) => state.auth);

  const userId = user ? user._id : null;

  const handleCheckout = () => {
    if (!user) {
      navigate("/login?redirect=checkout");
    } else {
      navigate("/checkout");
    }
  };

  if (!cart || cart.products.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <h2 className="text-3xl font-dm-serif mb-4">Your Cart is Empty</h2>

        <p className="text-body mb-6">
          Looks like you haven't added anything yet.
        </p>

        <button
          onClick={() => navigate("/collections/all")}
          className="bg-primary-500 text-white px-6 py-3 rounded"
        >
          Continue Shopping
        </button>
      </div>
    );
  }

  return (
    <section className="max-w-7xl mx-auto px-4 lg:px-8 py-10">
      <Breadcrumbs
        variant="light"
        className="mb-6"
        items={[
          {
            label: "Shopping Cart",
          },
        ]}
      />
      <h1 className="text-3xl font-dm-serif text-heading mb-2">
        Shopping Cart
      </h1>
      <p className="text-neutral-500 mb-8">Review your items before checkout</p>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Side */}
        <div className="lg:col-span-2 bg-white rounded-md p-6">
          <CartContents cart={cart} userId={userId} guestId={guestId} />
        </div>

        {/* Right Side */}
        <div className="lg:col-span-1">
          <div className="sticky top-24 bg-white rounded-2xl border border-neutral-200 p-6">
            <h2 className="text-2xl font-dm-serif mb-2">Order Summary</h2>
            <p className="text-sm text-neutral-500 mb-5">
              {cart.products.length} items in your cart
            </p>

            <div className="space-y-4">
              {/* Subtotal */}
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>₹{cart.pricing?.subtotal?.toLocaleString()}</span>
              </div>

              {/* CGST */}
              {/* <div className="flex justify-between">
                <span>CGST</span>
                <span>₹{cart.pricing?.cgst?.toLocaleString()}</span>
              </div> */}

              {/* SGST */}
              {/* <div className="flex justify-between">
                <span>SGST</span>
                <span>₹{cart.pricing?.sgst?.toLocaleString()}</span>
              </div> */}

              {/* Product Discount */}
              {/* {cart.pricing?.discount > 0 && (
                <div className="flex justify-between text-green-600">
                  <span>Product Discount</span>

                  <span>-₹{cart.pricing.discount.toLocaleString()}</span>
                </div>
              )} */}

              {/* Shipping */}
              <div className="flex justify-between">
                <span>Shipping</span>
                <span>
                  {cart.pricing?.shipping === 0
                    ? "FREE"
                    : `₹${cart.pricing?.shipping}`}
                </span>
              </div>

              {cart.pricing?.shipping > 0 ? (
                <div className="bg-yellow-50 border border-yellow-200 p-3 rounded-lg text-sm mb-4">
                  Add ₹{999 - cart.pricing.subtotal}
                  more for FREE Shipping 🚚
                </div>
              ) : (
                <div className="bg-green-50 border border-green-200 p-4 rounded-lg text-green-700">
                  <p className="font-semibold">🎉 Free Shipping Unlocked</p>

                  <p className="text-xs mt-1">
                    Your order qualifies for FREE delivery.
                  </p>
                </div>
              )}

              {/* Total */}
              <div className="border-t pt-5 pb-4 flex justify-between items-center">
                <span className="text-xl font-medium">Total</span>

                <span className="text-xl font-bold text-primary-600">
                  ₹{cart.pricing?.total?.toLocaleString()}
                </span>
              </div>
            </div>

            {/* Cart Savings */}
            {/* {cart.pricing?.discount > 0 && (
              <div className="mt-4 bg-green-50 border border-green-200 rounded-lg p-3">
                <h4 className="font-semibold text-green-700">🎉 You Saved</h4>

                <p className="text-sm text-green-600 mt-1">
                  ₹{cart.pricing.discount.toLocaleString()}
                </p>
              </div>
            )} */}

            {/* Estimated Delivery */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-4">
              <p className="text-sm text-blue-700">🚚 Estimated Delivery:</p>

              <p className="font-semibold text-blue-900">3 - 5 Business Days</p>
            </div>

            {/* Checkout Button */}
            <button
              onClick={handleCheckout}
              className="w-full mt-6 bg-primary-500 hover:bg-primary-700 transition text-white text-lg py-3 rounded-sm font-medium"
            >
              Proceed To Checkout
            </button>

            <button
              onClick={() => navigate("/collections/all")}
              className="w-full mt-3 border bg-secondary-500 text-white text-lg font-medium py-3 rounded-sm hover:bg-secondary-600 transition"
            >
              Continue Shopping
            </button>

            {/* Mobile Checkout Button */}
            <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t p-4 z-50">
              <button
                onClick={handleCheckout}
                className="w-full bg-primary-500 text-white py-4 rounded-md font-medium"
              >
                Proceed To Checkout • ₹{cart.pricing?.total?.toLocaleString()}
              </button>
            </div>

            <p className="text-xs text-center text-neutral-500 mt-4">
              Prices are inclusive of all applicable taxes.
            </p>

            {/* Trusted Badges */}
            <div className="grid grid-cols-2 gap-2 mt-4">
              <div className="border rounded-sm p-2 text-center text-sm">
                🔒 Secure Payment
              </div>
              <div className="border rounded-sm p-2 text-center text-sm">
                🚚 Fast Delivery
              </div>
              <div className="border rounded-sm p-2 text-center text-sm">
                🌾 Fresh Products
              </div>
              <div className="border rounded-sm p-2 text-center text-sm">
                ⭐ Premium Quality
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CartPage;
