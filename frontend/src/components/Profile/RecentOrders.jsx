import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserOrders } from "../../redux/slices/orderSlice.js";
import { useNavigate } from "react-router-dom";
import { IoArrowForward } from "react-icons/io5";
import { FiPackage } from "react-icons/fi";
import { AiOutlineEye } from "react-icons/ai";

const RecentOrders = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { orders, loading } = useSelector((state) => state.orders);

  useEffect(() => {
    if (!orders?.length) {
      dispatch(fetchUserOrders());
    }
  }, [dispatch, orders?.length]);

  const recentOrders = [...(orders || [])]
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 3);

  const getStatusClass = (status) => {
    switch (status) {
      case "Delivered":
        return "bg-green-100 text-success";
      case "Shipped":
        return "bg-blue-100 text-info";
      case "Packed":
      case "Processing":
        return "bg-yellow-100 text-warning";
      case "Cancelled":
        return "bg-red-100 text-error";
      default:
        return "bg-neutral-100 text-body";
    }
  };

  if (loading) {
    return (
      <div className="rounded-xl bg-white shadow-sm p-6">
        <p className="text-body">Loading latest orders...</p>
      </div>
    );
  }

  return (
    <div className="rounded-xl bg-white shadow-sm overflow-hidden">
      {/* Header */}

      <div className="flex items-start justify-between px-6 py-5 border-b border-border">
        <div>
          <h2 className="text-xl font-semibold text-heading">Latest Orders</h2>

          <p className="mt-1 text-sm text-body">
            Keep track of your recent purchases.
          </p>
        </div>

        <button
          onClick={() => navigate("/my-orders")}
          className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline"
        >
          View All
          <IoArrowForward />
        </button>
      </div>

      {recentOrders.length > 0 ? (
        <>
          {/* Desktop */}

          <div className="hidden md:block">
            <table className="w-full text-left">
              <thead className="bg-neutral-50 text-xs font-manrope uppercase text-body">
                <tr className="border-b border-border">
                  <th className="py-2 px-4 sm:py-3">Product</th>
                  <th className="py-2 px-4 sm:py-3">Date</th>
                  <th className="py-2 px-4 sm:py-3">Status</th>
                  <th className="py-2 px-4 sm:py-3">Total</th>
                  <th className="py-2 px-4 sm:py-3 text-center">Action</th>
                </tr>
              </thead>

              <tbody className="font-manrope text-body text-sm">
                {recentOrders.map((order) => (
                  <tr
                    key={order._id}
                    className="border-b last:border-0 border-border hover:bg-neutral-50 transition-colors"
                  >
                    {/* Product Name and Order ID*/}
                    <td className="py-2 px-2 sm:py-4 sm:px-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={order.orderItems[0].image}
                          alt={order.orderItems[0].name}
                          className="w-12 h-12 rounded-lg object-cover border"
                        />
                        <div>
                          <p className="font-semibold text-heading">
                            {order.orderItems[0].name}
                          </p>
                          <p className="text-xs text-neutral-500 mt-1">
                            #{order.orderNumber || order._id.slice(-8)}
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* Date */}
                    <td className="py-2 px-2 sm:py-4 sm:px-4">
                      {new Date(order.createdAt).toLocaleDateString("en-IN", {
                        day: "2-digit",
                        month: "short",
                      })}
                    </td>

                    {/* Status */}
                    <td className="py-2 px-2 sm:py-4 sm:px-4">
                      <span
                        className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${getStatusClass(order.status)}`}
                      >
                        {order.status}
                      </span>
                    </td>

                    {/* Price */}
                    <td className="py-2 px-2 sm:py-4 sm:px-4">
                      ₹
                      {(
                        order.pricing?.total || order.totalPrice
                      ).toLocaleString()}
                    </td>

                    {/* Action */}
                    <td className="py-2 px-2 sm:py-4 sm:px-4">
                      <button
                        onClick={() => navigate(`/order/${order._id}`)}
                        className="inline-flex items-center gap-2 text-primary-600 hover:text-primary-700 font-medium"
                      >
                        <AiOutlineEye className="text-lg" />
                        View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile */}

          <div className="md:hidden divide-y divide-border">
            {recentOrders.map((order) => (
              <button
                key={order._id}
                onClick={() => navigate(`/order/${order._id}`)}
                className="w-full flex items-center gap-3 p-4 text-left hover:bg-neutral-50"
              >
                <img
                  src={order.orderItems[0].image}
                  alt={order.orderItems[0].name}
                  className="w-14 h-14 rounded-lg border object-cover"
                />

                <div className="flex-1">
                  <p className="font-semibold text-heading">
                    {order.orderItems[0].name}
                  </p>

                  <p className="text-xs text-neutral-500 mt-1">
                    ₹
                    {(
                      order.pricing?.total || order.totalPrice
                    ).toLocaleString()}
                  </p>

                  <span
                    className={`inline-flex mt-2 rounded-full px-2 py-1 text-[11px] font-semibold ${getStatusClass(order.status)}`}
                  >
                    {order.status}
                  </span>
                </div>

                <IoArrowForward />
              </button>
            ))}
          </div>
        </>
      ) : (
        <div className="py-16 px-6 text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-neutral-100">
            <FiPackage className="text-2xl text-neutral-500" />
          </div>

          <h3 className="text-lg font-semibold text-heading">No Orders Yet</h3>

          <p className="mt-2 text-body">
            Start shopping to see your latest orders here.
          </p>

          <button
            onClick={() => navigate("/collections/all")}
            className="mt-5 inline-flex items-center gap-2 text-primary font-semibold hover:underline"
          >
            Browse Products
            <IoArrowForward />
          </button>
        </div>
      )}
    </div>
  );
};

export default RecentOrders;
