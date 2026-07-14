import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchUserOrders } from "../redux/slices/orderSlice.js";
import { AiOutlineEye } from "react-icons/ai";
import Breadcrumbs from "../components/Common/Breadcrumbs.jsx";

const MyOrdersPage = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const { orders, loading, error } = useSelector((state) => state.orders);

  useEffect(() => {
    dispatch(fetchUserOrders());
  }, [dispatch]);

  const handleRowClick = (orderId) => {
    // Navigate to order details page
    navigate(`/order/${orderId}`);
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6">
      <Breadcrumbs
        className="mb-6"
        variant="light"
        items={[
          {
            label: "My Orders",
          },
        ]}
      />
      <h2 className="text-xl sm:text-2xl font-dm-serif mb-6">My Orders</h2>
      <div className="relative shadow-sm sm:rounded-lg overflow-hidden">
        <table className="min-w-full text-left">
          <thead className="bg-neutral-100 text-xs font-manrope uppercase text-body">
            <tr>
              <th className="py-2 px-4 sm:py-3">Product</th>
              <th className="py-2 px-4 sm:py-3">Order ID</th>
              <th className="py-2 px-4 sm:py-3">Created At</th>
              <th className="py-2 px-4 sm:py-3">Address</th>
              <th className="py-2 px-4 sm:py-3">Items</th>
              <th className="py-2 px-4 sm:py-3">Total</th>
              <th className="py-2 px-4 sm:py-3">Payment</th>
              <th className="py-2 px-4 sm:py-3">Delivery</th>
              <th className="py-2 px-4 sm:py-3 text-center">Action</th>
            </tr>
          </thead>
          <tbody className="font-manrope text-body text-sm">
            {orders?.length > 0 ? (
              orders?.map((order) => (
                // Render each order row with a click handler to navigate to the order details page
                // Order ID

                // <tr
                //   key={order._id}
                //   onClick={() => handleRowClick(order._id)}
                //   className="border-b border-border transition-colors cursor-pointer"
                // >
                <tr
                  key={order._id}
                  className="border-b border-border hover:bg-neutral-50 transition-colors cursor-pointer"
                >
                  {/* Product Image and Name */}
                  <td className="py-2 px-2 sm:py-4 sm:px-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={order.orderItems[0].image}
                        alt={order.orderItems[0].name}
                        className="w-14 h-14 rounded-lg object-cover border"
                      />
                      <div>
                        <p className="font-semibold text-heading">
                          {order.orderItems[0].name}
                        </p>
                        <p className="text-xs text-neutral-500">
                          {order.orderItems.length > 1
                            ? `+${order.orderItems.length - 1} more item${
                                order.orderItems.length > 2 ? "s" : ""
                              }`
                            : "1 Item"}
                        </p>
                      </div>
                    </div>
                  </td>

                  {/* Order ID */}
                  <td className="py-2 px-2 sm:py-4 font-semibold whitespace-nowrap">
                    {/* #{order.orderNumber || order._id} */}#
                    {order.orderNumber || order._id.slice(-8)}
                  </td>

                  {/* Created At */}
                  <td className="py-2 px-2 sm:py-4 sm:px-4">
                    <p>
                      {new Date(order.createdAt).toLocaleDateString("en-IN")}
                    </p>
                    <p className="text-xs text-neutral-500">
                      {new Date(order.createdAt).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                  </td>

                  {/* Delivery Address */}
                  <td className="py-2 px-2 sm:py-4 sm:px-4 max-w-[180px]">
                    {order.shippingAddress
                      ? `${order.shippingAddress.address}, ${order.shippingAddress.city}`
                      : "N/A"}
                  </td>

                  {/* Items Count */}
                  <td className="py-2 px-2 sm:py-4 sm:px-4">
                    {order.orderItems.length} Product
                    {order.orderItems.length > 1 && "s"}
                  </td>

                  {/* Total Price */}
                  <td className="py-2 px-2 sm:py-4 sm:px-4">
                    ₹
                    {(
                      order.pricing?.total || order.totalPrice
                    ).toLocaleString()}
                  </td>

                  {/* Payment Status */}
                  <td className="py-2 px-2 sm:py-4 sm:px-4">
                    <span
                      className={`py-1 px-3 rounded-full text-xs font-semibold 
                        ${
                          order.isPaid
                            ? "bg-green-100 text-success"
                            : "bg-red-100 text-error"
                        }`}
                    >
                      {order.isPaid ? "Paid" : "Pending"}
                    </span>
                  </td>

                  {/* Delivery Status */}
                  <td className="py-2 px-2 sm:py-4 sm:px-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        order.status === "Delivered"
                          ? "bg-green-100 text-success"
                          : order.status === "Shipped"
                            ? "bg-blue-100 text-info"
                            : order.status === "Packed"
                              ? "bg-yellow-100 text-warning"
                              : "bg-neutral-100 text-body"
                      }`}
                    >
                      {order.status}
                    </span>
                  </td>

                  {/* Action */}
                  <td className="py-2 px-2 sm:py-4 sm:px-4">
                    <button
                      onClick={() => handleRowClick(order._id)}
                      className="inline-flex items-center gap-2 text-primary-600 hover:text-primary-700 font-medium"
                    >
                      <AiOutlineEye className="text-lg" />
                      View
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td className="py-2 px-4 text-center text-body" colSpan={7}>
                  You have no orders yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyOrdersPage;
