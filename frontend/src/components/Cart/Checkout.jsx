import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import UpiPayButton from "./UpiPayButton.jsx";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { setCheckout } from "../../redux/slices/checkoutSlice.js";
import { fetchCoupons } from "../../redux/slices/couponSlice.js";
import { clearCart } from "../../redux/slices/cartSlice.js";
import Breadcrumbs from "../Common/Breadcrumbs.jsx";
import { MdOutlinePayments, MdOutlineLocalShipping } from "react-icons/md";
import {
  MdOutlineLocalOffer,
  MdLockOutline,
  MdContentCopy,
} from "react-icons/md";
import useEmblaCarousel from "embla-carousel-react";

const Checkout = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const { cart, loading, error } = useSelector((state) => state.cart);
  console.log("CART DATA =", cart);

  const { user } = useSelector((state) => state.auth);
  const { coupons } = useSelector((state) => state.coupon);
  const availableCoupons = coupons || [];

  const [checkoutId, setCheckoutId] = useState(null); // To track if checkout session is created
  const [shippingAddress, setShippingAddress] = useState({
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    postalCode: "",
    state: "",
    country: "",
    phonenumber: "",
  });

  const [couponCode, setCouponCode] = useState("");
  const [couponDiscount, setCouponDiscount] = useState(0);
  const [couponMessage, setCouponMessage] = useState("");

  const [autoApplied, setAutoApplied] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("Razorpay");
  const [showCouponInput, setShowCouponInput] = useState(false);

  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    containScroll: "trimSnaps",
    dragFree: false,
    skipSnaps: false,
  });
  const [activeCoupon, setActiveCoupon] = useState(0);

  const scrollToCoupon = (index) => {
    if (!emblaApi) return;

    emblaApi.scrollTo(index);
  };

  const removeCoupon = () => {
    setCouponCode("");
    setCouponDiscount(0);
    setCouponMessage("Coupon removed");
  };

  const subtotal = cart?.totalPrice || 0;

  const shipping = subtotal >= 999 ? 0 : 40;

  const total = subtotal - couponDiscount + shipping;

  const pricingSummary = {
    subtotal,
    couponDiscount,
    shipping,
    total,
  };

  const freeShippingTarget = 999;

  const freeShippingProgress = Math.min(
    (pricingSummary.subtotal / freeShippingTarget) * 100,
    100,
  );

  const amountLeftForFreeShipping = Math.max(
    freeShippingTarget - pricingSummary.subtotal,
    0,
  );

  const nextCoupon = coupons
    ?.filter((coupon) => coupon.minimumAmount > pricingSummary.subtotal)
    .sort((a, b) => a.minimumAmount - b.minimumAmount)[0];

  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => {
      setActiveCoupon(emblaApi.selectedScrollSnap());
    };
    emblaApi.on("select", onSelect);
    onSelect();
    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi]);

  // Ensure cart is loaded before proceeding
  useEffect(() => {
    if (
      cart &&
      cart.products &&
      Array.isArray(cart.products) &&
      cart.products.length === 0
    ) {
      navigate("/");
    }
  }, [cart, navigate]);

  // If cart is empty, redirect to home or products page
  // if (cart.products.length === 0) {
  //   // navigate("/");
  //   return null; // or a loading state
  // }

  // Fetch available coupons on component mount
  useEffect(() => {
    dispatch(fetchCoupons());
  }, [dispatch]);

  useEffect(() => {
    if (!cart) return;

    if (availableCoupons.length > 0 && couponDiscount === 0 && !autoApplied) {
      const validCoupons = availableCoupons.filter(
        (coupon) => (cart?.totalPrice || 0) >= coupon.minimumAmount,
      );

      if (validCoupons.length > 0) {
        validCoupons.sort((a, b) => b.discountValue - a.discountValue);

        handleApplyCoupon(validCoupons[0].code);
        setCouponCode(validCoupons[0].code);
        setAutoApplied(true);
      }
    }
  }, [availableCoupons, couponDiscount, autoApplied, cart]);

  const handleApplyCoupon = async (code = couponCode) => {
    try {
      setCouponMessage("");

      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/coupon/apply`,
        {
          couponCode: code,
          subtotal: cart.totalPrice,
        },
      );

      setCouponDiscount(response.data.couponDiscount);
      setCouponMessage(response.data.message);
    } catch (error) {
      setCouponDiscount(0);
      setCouponMessage(error.response?.data?.message || "Invalid coupon");
    }
  };

  const handlePaymentSuccess = async (details, checkoutId) => {
    console.log("CHECKOUT ID =", checkoutId);
    console.log("PAYMENT DETAILS =", details);
    console.log(checkoutId);
    try {
      await axios.put(
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
      console.log("STATUS =", error.response?.status);
      console.log("DATA =", error.response?.data);
      console.log("FULL ERROR =", error);
    }
  };

  // Finalize checkout by creating an order and navigating to the order confirmation page
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
      dispatch(setCheckout(response.data.order));
      dispatch(clearCart());
      navigate("/order-confirmation", {
        state: {
          order: response.data.order,
        },
      });
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
    navigate("/");
    return null;
  }

  if (!Array.isArray(cart.products)) {
    console.log("Products missing:", cart);
    return <p>Products Missing</p>;
  }

  return (
    <div className="bg-gray-50 min-h-screen mx-auto px-4 lg:px-8 py-10">
      <Breadcrumbs
        variant="light"
        className="mb-8"
        items={[
          {
            label: "Shopping Cart",
            href: "/cart",
          },
          {
            label: "Checkout",
          },
        ]}
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* -------------- Left Section -------------- */}
        {/* Shipping Address Form*/}
        <div className="bg-white font-manrope rounded-2xl shadow-sm p-6 border border-border">
          <div className="mb-8">
            <h2 className="text-3xl font-dm-serif text-heading">Checkout</h2>
            <p className="text-neutral-500 mt-2 text-sm">
              Complete your order securely
            </p>
          </div>

          <form action="" className="space-y-2">
            <h3 className="text-xl font-semibold border-b border-border pb-3 mb-6">
              Contact Details
            </h3>
            <div className="mb-6 ">
              <label
                htmlFor=""
                className="block text-sm uppercase tracking-wide text-neutral-500 mb-2 font-semibold"
              >
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

            <h3 className="text-xl font-semibold border-b border-neutral-200 pb-3 mt-10 mb-6">
              Delivery Address
            </h3>

            <div className="mb-6 grid grid-cols-1 md:grid-cols-2 gap-5">
              {/* First Name */}
              <div>
                <label
                  htmlFor=""
                  className="block text-sm uppercase tracking-wide text-neutral-500 mb-2 font-semibold"
                >
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
                <label
                  htmlFor=""
                  className="block text-sm uppercase tracking-wide text-neutral-500 mb-2 font-semibold"
                >
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

            {/* Phone Number */}
            <div className="mb-6">
              <label
                htmlFor=""
                className="block text-sm uppercase tracking-wide text-neutral-500 mb-2 font-semibold"
              >
                Phone Number
              </label>
              <input
                type="tel"
                placeholder="9876543210"
                value={shippingAddress.phonenumber}
                onChange={(e) =>
                  setShippingAddress({
                    ...shippingAddress,
                    phonenumber: e.target.value,
                  })
                }
                className="w-full p-2 border border-border rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            {/* Address */}
            <div className="mb-6">
              <label
                htmlFor=""
                className="block text-sm uppercase tracking-wide text-neutral-500 mb-2 font-semibold"
              >
                Address
              </label>
              <input
                type="text"
                placeholder="House No, Street, Area"
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

            <div className="mb-6 grid grid-cols-1 md:grid-cols-2 gap-5">
              {/* City */}
              <div>
                <label
                  htmlFor=""
                  className="block text-sm uppercase tracking-wide text-neutral-500 mb-2 font-semibold"
                >
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
                <label
                  htmlFor=""
                  className="block text-sm uppercase tracking-wide text-neutral-500 mb-2 font-semibold"
                >
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

            <div className="mb-6 grid grid-cols-1 md:grid-cols-2 gap-5">
              {/* State */}
              <div>
                <label className="block text-sm uppercase tracking-wide text-neutral-500 mb-2 font-semibold">
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
                  className="w-full p-2 border border-border rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
                  required
                />
              </div>

              {/* Country */}
              <div>
                <label className="block text-sm uppercase tracking-wide text-neutral-500 mb-2 font-semibold">
                  Country
                </label>

                <input
                  type="text"
                  value={shippingAddress.country}
                  onChange={(e) =>
                    setShippingAddress({
                      ...shippingAddress,
                      country: e.target.value,
                    })
                  }
                  className="w-full p-2 border border-border rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
                  required
                />
              </div>
            </div>

            {/* Payment Method */}
            <div className="mt-8">
              <h3 className="text-xl font-semibold mb-5">
                Choose Payment Method
              </h3>

              <div className="space-y-4">
                {/* Razorpay */}
                <div
                  onClick={() => setPaymentMethod("Razorpay")}
                  className={`cursor-pointer rounded-2xl border p-5 transition-all duration-300 ${
                    paymentMethod === "Razorpay"
                      ? "border-primary-500 bg-primary-50"
                      : "border-neutral-200 bg-white hover:border-primary-300"
                  }`}
                >
                  <div className="flex justify-between items-start">
                    <div className="flex gap-4">
                      <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
                        <MdOutlinePayments className="text-2xl text-primary-600" />
                      </div>

                      <div>
                        <h4 className="font-semibold text-lg">
                          UPI / Cards / Wallet
                        </h4>

                        <p className="text-sm text-neutral-500 mt-1">
                          Pay securely with Razorpay
                        </p>

                        <div className="flex gap-2 mt-3 flex-wrap">
                          <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">
                            UPI
                          </span>

                          <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">
                            Cards
                          </span>

                          <span className="text-xs bg-yellow-100 text-yellow-700 px-2 py-1 rounded-full">
                            Wallet
                          </span>

                          <span className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded-full">
                            Net Banking
                          </span>
                        </div>
                      </div>
                    </div>
                    <input
                      type="radio"
                      checked={paymentMethod === "Razorpay"}
                      readOnly
                    />
                  </div>
                </div>

                {/* COD */}
                <div
                  onClick={() => setPaymentMethod("COD")}
                  className={`cursor-pointer rounded-2xl border p-5 transition-all duration-300 ${
                    paymentMethod === "COD"
                      ? "border-primary-500 bg-primary-50"
                      : "border-neutral-200 bg-white hover:border-primary-300"
                  }`}
                >
                  <div className="flex justify-between items-start">
                    <div className="flex gap-4">
                      <div className="w-12 h-12 rounded-full bg-yellow-100 flex items-center justify-center">
                        <MdOutlineLocalShipping className="text-2xl text-yellow-700" />
                      </div>

                      <div>
                        <h4 className="font-semibold text-lg">
                          Cash On Delivery
                        </h4>

                        <p className="text-sm text-neutral-500 mt-1">
                          Pay after your order is delivered
                        </p>

                        <span className="inline-block mt-3 text-xs bg-yellow-100 text-yellow-700 px-2 py-1 rounded-full">
                          Available
                        </span>
                      </div>
                    </div>

                    <input
                      type="radio"
                      checked={paymentMethod === "COD"}
                      readOnly
                    />
                  </div>
                </div>
              </div>

              <div className="mt-6">
                <UpiPayButton
                  amount={pricingSummary.total}
                  paymentMethod={paymentMethod}
                  checkoutId={checkoutId}
                  setCheckoutId={setCheckoutId}
                  shippingAddress={shippingAddress}
                  checkoutItems={cart.products}
                  couponCode={couponCode}
                  user={{
                    name: `${shippingAddress.firstName} ${shippingAddress.lastName}`,
                    phonenumber: shippingAddress.phonenumber,
                  }}
                  disabled={false}
                  onSuccess={handlePaymentSuccess}
                />

                <p className="text-center text-xs text-neutral-500 mt-3">
                  100% Secure Checkout
                </p>
              </div>
            </div>
          </form>
        </div>

        {/* -------------- Right Section -------------- */}
        {/* Order Summary*/}
        <div className="bg-white border border-border font-manrope p-6 rounded-2xl shadow-sm sticky top-24">
          {/* Order Summary Header */}
          <div className="flex justify-between items-center mb-5">
            <div>
              <h3 className="text-2xl font-dm-serif">Order Summary</h3>

              <p className="text-sm text-neutral-500 mt-1">
                {cart.products.length} items in your order
              </p>
            </div>
          </div>

          {/* Product name and Edit option */}
          <div className="border-t border-b border-neutral-200 py-5 mb-6">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-semibold text-lg">
                  {cart.products.length} Items
                </h4>
                <p className="text-sm text-neutral-500 mt-1">
                  {cart.products
                    .slice(0, 2)
                    .map((item) => item.name)
                    .join(", ")}

                  {cart.products.length > 2 &&
                    ` +${cart.products.length - 2} more`}
                </p>
              </div>
              <button
                onClick={() => navigate("/cart")}
                className="text-primary-600 font-medium hover:underline"
              >
                Edit Cart
              </button>
            </div>
          </div>

          {/* Coupon Section */}
          <div className="mb-6 pt-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-lg font-semibold">Apply Coupon</h3>

              {couponDiscount > 0 && (
                <span className="text-sm text-green-600 font-medium">
                  Saved ₹{couponDiscount}
                </span>
              )}
            </div>

            <div className="flex gap-3 mt-3">
              <div className="relative flex-1">
                <MdOutlineLocalOffer className="absolute left-4 top-1/2 -translate-y-1/2 text-xl text-neutral-400" />

                <input
                  type="text"
                  placeholder="Enter coupon code"
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      handleApplyCoupon(couponCode);
                    }
                  }}
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                  className="w-full pl-12 pr-4 py-3 rounded-xl border border-neutral-300 focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>

              <button
                disabled={!couponCode.trim()}
                onClick={() => handleApplyCoupon(couponCode)}
                className={`px-6 rounded-lg text-white transition ${
                  couponCode.trim()
                    ? "bg-primary-500 hover:bg-primary-600"
                    : "bg-neutral-300 cursor-not-allowed"
                }`}
              >
                Apply
              </button>
            </div>

            {/* Coupon Message */}
            {couponMessage && (
              <p
                className={`mt-3 text-sm ${
                  couponDiscount > 0 ? "text-success" : "text-error"
                }`}
              >
                {couponMessage}
              </p>
            )}

            {/* Coupon Applied */}
            {couponDiscount > 0 && (
              <div className="mt-4 flex items-center justify-between rounded-xl bg-green-50 border border-green-200 p-3">
                <div>
                  <p className="font-semibold text-success">{couponCode}</p>
                  {/* <p className="text-xs text-success">
                    Coupon Applied Successfully
                  </p> */}
                </div>
                <button
                  onClick={removeCoupon}
                  className="text-error text-sm hover:underline"
                >
                  Remove
                </button>
              </div>
            )}
          </div>

          {/* Unlock Deals */}
          {availableCoupons.length > 0 && (
            <div className="mt-8 mb-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-lg font-semibold">Exclusive Offers</h3>
                  <p className="text-xs text-neutral-500">
                    Apply the best offer & save more.
                  </p>
                </div>
              </div>

              {/* Coupon Card Slider */}
              <div className="overflow-hidden" ref={emblaRef}>
                <div className="flex gap-2">
                  {availableCoupons.map((coupon) => {
                    const unlocked =
                      pricingSummary.subtotal >= coupon.minimumAmount;

                    const remaining =
                      coupon.minimumAmount - pricingSummary.subtotal;

                    return (
                      <div key={coupon._id} className="flex-[0_0_320px]">
                        <div
                          className={`rounded-2xl border h-full p-5 transition-all duration-200 ease-out hover:border-primary-300 ${
                            unlocked
                              ? "border-green-200 bg-green-50"
                              : "border-neutral-200 bg-white"
                          }`}
                        >
                          {/* Card Header */}
                          <div className="flex justify-between items-start">
                            <div className="flex gap-4">
                              <div
                                className={`w-11 h-11 rounded-full flex items-center justify-center ${
                                  unlocked ? "bg-green-100" : "bg-orange-100"
                                }`}
                              >
                                <MdOutlineLocalOffer
                                  className={`text-lg ${
                                    unlocked
                                      ? "text-success"
                                      : "text-orange-500"
                                  }`}
                                />
                              </div>

                              <div>
                                <h4 className="inline-flex rounded-full bg-primary-100 text-primary-700 px-3 py-1 text-xs font-bold tracking-wider uppercase">
                                  {coupon.code}
                                </h4>

                                <p className="mt-2 text-base font-semibold text-heading">
                                  {coupon.discountType === "fixed"
                                    ? `Flat ₹${coupon.discountValue} OFF`
                                    : `${coupon.discountValue}% OFF`}
                                </p>

                                <p className="text-xs text-neutral-500 mt-1">
                                  Minimum Purchase ₹{coupon.minimumAmount}
                                </p>
                              </div>
                            </div>
                          </div>

                          {/* Body */}
                          <div className="mt-5">
                            {unlocked ? (
                              <div className="mt-5 flex justify-end">
                                <button
                                  onClick={() => {
                                    setCouponCode(coupon.code);
                                    handleApplyCoupon(coupon.code);
                                  }}
                                  className="w-fit ml-auto flex items-center justify-center bg-primary-500 hover:bg-primary-600 text-white px-5 py-2 rounded-md text-sm font-medium transition-colors"
                                >
                                  Apply
                                </button>
                              </div>
                            ) : (
                              <>
                                <p className="text-sm text-orange-600 font-medium">
                                  Add ₹{remaining} more to unlock
                                </p>

                                <div className="mt-3 h-2 rounded-full bg-neutral-200 overflow-hidden">
                                  <div
                                    className="h-full bg-orange-400 rounded-full transition-all"
                                    style={{
                                      width: `${Math.min(
                                        (pricingSummary.subtotal /
                                          coupon.minimumAmount) *
                                          100,
                                        100,
                                      )}%`,
                                    }}
                                  />
                                </div>
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Dots */}
              <div className="flex justify-center items-center gap-2 mt-4">
                {availableCoupons.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => scrollToCoupon(index)}
                    className={`transition-all duration-300 ease-out rounded-full ${
                      activeCoupon === index
                        ? "w-6 h-2 bg-primary-500"
                        : "w-2 h-2 bg-neutral-300 hover:bg-neutral-400"
                    }`}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Pricing Summary */}
          <div className="space-y-5 border-t border-neutral-200 pt-5">
            <div className="flex justify-between text-body">
              <p>Subtotal</p>
              <p>₹{pricingSummary.subtotal?.toLocaleString() || 0}</p>
            </div>

            <div className="flex justify-between text-green-600">
              <p>Coupon Discount</p>
              <p>-₹{pricingSummary.couponDiscount?.toLocaleString() || 0}</p>
            </div>

            <div className="flex justify-between items-center">
              <p>Shipping</p>

              {pricingSummary.shipping === 0 ? (
                <span className="bg-green-100 text-success px-3 py-1 rounded-full text-xs font-semibold">
                  FREE
                </span>
              ) : (
                <p>₹{pricingSummary.shipping}</p>
              )}
            </div>

            {pricingSummary.shipping > 0 && (
              <div className="mb-5">
                <div className="flex justify-between text-sm mb-2">
                  <p>
                    🚚 Add ₹{amountLeftForFreeShipping}
                    more for FREE Delivery
                  </p>

                  <p>{Math.round(freeShippingProgress)}%</p>
                </div>

                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-green-500 h-2 rounded-full"
                    style={{
                      width: `${freeShippingProgress}%`,
                    }}
                  ></div>
                </div>
              </div>
            )}

            {/* Total Price */}
            <div className="flex justify-between items-center border-t border-neutral-200 pt-5">
              <div>
                <p className="text-lg">Total</p>

                <p className="text-xs text-neutral-500">
                  Inclusive of all taxes
                </p>
              </div>
              <p className="text-3xl font-bold text-primary-600">
                ₹{pricingSummary.total?.toLocaleString() || 0}
              </p>
            </div>

            {/* Payment Method */}
            <div className="mt-5 pt-5 border-t border-dashed border-neutral-200">
              <div className="flex justify-between text-sm">
                <span className="text-neutral-500">Payment</span>
                <span className="font-medium">
                  {paymentMethod === "COD" ? "Cash On Delivery" : "Razorpay"}
                </span>
              </div>
            </div>

            {/* Saving Cards */}
            {couponDiscount > 0 && (
              <div className="mt-5 rounded-xl border border-green-200 bg-green-50 p-4">
                <p className="font-semibold text-green-700">
                  🎉 Congratulations
                </p>
                <p className="text-sm text-green-600 mt-1">
                  You saved ₹{couponDiscount.toLocaleString()} on this order.
                </p>
              </div>
            )}

            {/* Inclusive of all applicable taxes */}
            <p className="text-xs text-neutral-500 text-center mt-4">
              Prices are inclusive of all applicable taxes.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
