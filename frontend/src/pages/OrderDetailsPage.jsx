import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { fetchOrderDetails } from "../redux/slices/orderSlice.js";
import { IoArrowBack } from "react-icons/io5";
import Breadcrumbs from "../components/Common/Breadcrumbs.jsx";

const OrderDetailsPage = () => {
  const { id } = useParams();

  const dispatch = useDispatch();
  const { orderDetails, loading, error } = useSelector((state) => state.orders);

  useEffect(() => {
    dispatch(fetchOrderDetails(id));
  }, [dispatch, id]);

  const handleSupport = () => {
    window.open(
      "https://wa.me/917247277454?text=Hi, I need help regarding my order.",
      "_blank",
    );
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6 font-manrope">
      {/* Breadcrumbs */}
      {orderDetails && (
        <Breadcrumbs
          variant="light"
          className="mb-6"
          items={[
            {
              label: "My Orders",
              href: "/my-orders",
            },
            {
              label: `Order #${orderDetails.orderNumber}`,
            },
          ]}
        />
      )}
      <h2 className="text-2xl font-dm-serif mb-4">Order Details</h2>
      {!orderDetails ? (
        <p>No Order details found</p>
      ) : (
        <div className="p-2 sm:p-6 mt-4 ">
          {/* <div className="mt-6 bg-white"> */}
          {/* Back to Orders Link */}
          {/* <Link
            to="/my-orders"
            className="inline-flex items-center gap-2 text-base text-body hover:text-primary-600 hover:underline transition"
          >
            <IoArrowBack className="text-base" />
            Back to My Orders
          </Link>

          <div className="border-b border-neutral-200"></div> */}

          {/* <div className="flex flex-col sm:flex-row justify-between mb-8 mt-6"> */}
          <div className="flex flex-col sm:flex-row justify-between mb-8 mt-4 gap-6">
            {/* Order ID and Date */}
            <div>
              {/* <h3 className="text-lg md:text-xl font-semibold">
                Order ID: #{orderDetails.orderNumber}
              </h3> */}

              <p className="text-sm text-body uppercase tracking-wide">
                Order Number:
              </p>
              <h2 className="text-2xl font-dm-serif text-heading mt-1">
                #{orderDetails.orderNumber}
              </h2>

              <p className="mt-2 text-sm text-body">
                {new Date(orderDetails.createdAt).toLocaleString()}
              </p>
              <p className="text-sm text-body mt-1">
                {orderDetails.orderItems.length} Items
              </p>
            </div>

            {/* Order Status */}
            <div className="flex flex-col items-start sm:items-end gap-3 mt-4 sm:mt-0">
              <div className="flex gap-2 flex-wrap">
                <span
                  className={`px-5 py-2 rounded-full text-sm font-medium
                    ${
                      orderDetails.isPaid
                        ? "bg-green-100 text-success"
                        : "bg-red-100 text-error"
                    }`}
                >
                  {orderDetails.isPaid ? "Paid" : "Pending Payment"}
                </span>

                <span
                  className={`px-5 py-2 rounded-full text-sm font-medium
                    ${
                      orderDetails.isDelivered
                        ? "bg-green-100 text-success"
                        : "bg-yellow-100 text-warning"
                    }`}
                >
                  {orderDetails.status}
                </span>
              </div>
            </div>
          </div>

          {/* Order Timeline */}
          <div className="border-t border-neutral-200 mt-5 mb-8"></div>
          <div className="mt-8 mb-8 p-4 sm:p-6">
            <div className="flex items-center justify-between">
              <div className="flex flex-col items-center flex-1">
                <div className="w-3 h-3 rounded-full bg-success"></div>
                <p className="text-sm mt-2">Order Placed</p>
              </div>

              <div className="h-1 flex-1 bg-success"></div>

              <div className="flex flex-col items-center flex-1">
                <div className="w-3 h-3 rounded-full bg-success"></div>
                <p className="text-sm mt-2">Confirmed</p>
              </div>

              <div
                className={`h-1 flex-1 ${
                  orderDetails.isDelivered ? "bg-success" : "bg-neutral-300"
                }`}
              ></div>
              <div className="flex flex-col items-center flex-1">
                <div
                  className={`w-3 h-3 rounded-full ${
                    orderDetails.isDelivered ? "bg-success" : "bg-neutral-300"
                  }`}
                ></div>
                <p className="text-sm mt-2">Delivered</p>
              </div>
            </div>
          </div>
          <div className="border-b border-neutral-200 mt-5 mb-8"></div>

          {/* Customer, Payment and Shipping Information */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-2 gap-14 mb-8">
            {/* Payment Information */}
            <div>
              <h4 className="text-lg font-semibold mb-2">Payment Info</h4>

              <p className="text-body mb-2 text-[15px]">
                Payment Method: {orderDetails.paymentMethod}
              </p>

              <p className="text-body mb-2 text-[15px]">
                Payment Status: {orderDetails.paymentStatus}
              </p>

              <p className="text-body mb-2 text-[15px]">
                Paid On:{" "}
                {orderDetails.paidAt
                  ? new Date(orderDetails.paidAt).toLocaleString()
                  : "-"}
              </p>
            </div>

            {/* Shipping Address */}
            <div>
              <h4 className="text-lg font-semibold mb-2">Delivery Address</h4>
              <p className="text-body mb-2 text-[15px]">
                {orderDetails.shippingAddress.address}
              </p>

              <p className="text-body mb-2 text-[15px]">
                {orderDetails.shippingAddress.city},{" "}
                {orderDetails.shippingAddress.state}
              </p>

              <p className="text-body mb-2 text-[15px]">
                {orderDetails.shippingAddress.country} -{" "}
                {orderDetails.shippingAddress.postalCode}
              </p>
              <p className="mt-4 text-sm text-success">
                ✔ Your order will be safely delivered to this address.
              </p>
            </div>
          </div>
          <div className="border-b border-neutral-200 mt-5 mb-8"></div>

          {/* Product List */}
          <h3 className="text-2xl font-dm-serif mb-5">Ordered Items</h3>
          <div className="rounded-xl bg-white overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="min-w-full text-body mb-4">
                <thead className="bg-neutral-50 border-b border-border text-sm text-body uppercase tracking-wide">
                  <tr>
                    <th className="px-6 py-4 text-left">Product Name</th>
                    <th className="px-6 py-4 text-left">Unit Price</th>
                    <th className="px-6 py-4 text-left">Quantity</th>
                    <th className="px-6 py-4 text-left">Total</th>
                  </tr>
                </thead>
                <tbody>
                  {orderDetails.orderItems.map((item) => (
                    <tr key={item.productId} className="border-b border-border">
                      <td className="px-6 py-5">
                        <div className="flex items-center gap-4">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-16 h-16 object-cover mr-4 rounded-sm border border-border"
                          />
                          <div>
                            <Link
                              to={`/products/${item.productId}`}
                              className="text-primary-500 hover:underline"
                            >
                              {item.name}
                            </Link>
                            <p className="text-sm text-neutral-500 mt-1">
                              Variant : {item.size}
                            </p>
                          </div>
                        </div>
                      </td>

                      <td className="py-2 px-4">
                        ₹{item.price.toLocaleString()}
                      </td>
                      <td className="py-2 px-4">{item.quantity}</td>
                      <td className="py-2 px-4">
                        ₹{(item.price * item.quantity).toLocaleString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {/* Order Summary */}
              {/* <div className="border-t pt-6 mt-6 space-y-3">
                <div className="flex items-center justify-between">
                  <span>Subtotal</span>
                  <span>₹{orderDetails.pricing.subtotal.toLocaleString()}</span>
                </div>

                {orderDetails.pricing.couponDiscount > 0 && (
                  <div className="flex items-center justify-between text-success">
                    <span>Coupon Discount</span>

                    <span>
                      -₹{orderDetails.pricing.couponDiscount.toLocaleString()}
                    </span>
                  </div>
                )}

                <div className="flex items-center justify-between">
                  <span>Shipping</span>

                  <span>
                    {orderDetails.pricing.shipping === 0
                      ? "FREE"
                      : `₹${orderDetails.pricing.shipping}`}
                  </span>
                </div>

                <div className="flex items-center justify-between border-t pt-3 text-lg font-bold">
                  <span>Total</span>

                  <span>₹{orderDetails.pricing.total.toLocaleString()}</span>
                </div>
              </div> */}

              <div className="flex justify-end pt-5 pb-6 px-6">
                <div className="w-90">
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-body">Subtotal</span>

                      <span className="font-medium">
                        ₹{orderDetails.pricing.subtotal.toLocaleString()}
                      </span>
                    </div>

                    {orderDetails.pricing.couponDiscount > 0 && (
                      <div className="flex justify-between">
                        <span className="text-body">Discount</span>

                        <span className="text-success font-medium">
                          -₹
                          {orderDetails.pricing.couponDiscount.toLocaleString()}
                        </span>
                      </div>
                    )}

                    <div className="flex justify-between">
                      <span className="text-body">Shipping</span>

                      <span
                        className={
                          orderDetails.pricing.shipping === 0
                            ? "text-success font-medium"
                            : "font-medium"
                        }
                      >
                        {orderDetails.pricing.shipping === 0
                          ? "FREE"
                          : `₹${orderDetails.pricing.shipping}`}
                      </span>
                    </div>

                    <div className="border-t border-dashed mt-3 pt-3 flex justify-between items-center">
                      <span className="text-xl font-semibold">Total</span>

                      <span className="text-xl font-semibold text-heading">
                        ₹{orderDetails.pricing.total.toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              {/* End Order Summary */}
            </div>
          </div>

          {/* Support */}
          <div className="mt-10 border-t border-border pt-8 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <h3 className="text-xl font-dm-serif text-heading">Need Help?</h3>

              <p className="text-body mt-2 max-w-xl">
                Questions about your order, delivery or payment? Our support
                team is always happy to help.
              </p>
            </div>

            <button
              onClick={handleSupport}
              className="self-start md:self-auto bg-primary-500 hover:bg-primary-600 transition text-white px-6 py-3 rounded-md font-medium"
            >
              Contact Support →
            </button>
          </div>
          {/* End Support */}
        </div>
      )}
    </div>
  );
};

export default OrderDetailsPage;
