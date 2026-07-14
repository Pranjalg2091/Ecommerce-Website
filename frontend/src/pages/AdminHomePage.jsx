import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { fetchAdminProducts } from "../redux/slices/adminProductSlice.js";
import { fetchAllOrders } from "../redux/slices/adminOrderSlice.js";
import { AiOutlineEye } from "react-icons/ai";

const AdminHomePage = () => {
  const dispatch = useDispatch();

  const {
    products,
    loading: productsLoading,
    error: productsError,
  } = useSelector((state) => state.adminProducts);

  const {
    orders = [],
    totalOrders,
    totalSales,
    loading: ordersLoading,
    error: ordersError,
  } = useSelector((state) => state.adminOrders);

  useEffect(() => {
    dispatch(fetchAdminProducts());
    dispatch(fetchAllOrders());
  }, [dispatch]);

  return (
    <div className="space-y-8 font-manrope">
      {productsLoading || ordersLoading ? (
        <div className="rounded-xl border border-neutral-200 bg-white p-10 text-center text-neutral-500">
          Loading dashboard...
        </div>
      ) : productsError ? (
        <div className="rounded-xl border border-red-200 bg-red-50 p-5 text-error">
          Error fetching products: {productsError}
        </div>
      ) : ordersError ? (
        <div className="rounded-xl border border-red-200 bg-red-50 p-5 text-error">
          Error fetching orders: {ordersError}
        </div>
      ) : (
        // Cards
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 md:gap-6">
          {/* Card 1 */}
          <div className="rounded-xl border border-border bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
            <p className="text-sm font-medium text-neutral-500">Revenue</p>
            <p className="mt-2 text-3xl font-bold text-heading">
              ₹{(totalSales || 0).toFixed(2)}
            </p>
          </div>

          {/* Card 2 */}
          <div className="rounded-xl border border-border bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
            <p className="text-sm font-medium text-neutral-500">Total Orders</p>
            <p className="mt-2 text-3xl font-bold text-heading">
              {totalOrders}
            </p>
            <Link
              to="/admin/orders"
              className="mt-5 inline-flex items-center text-sm font-semibold text-primary-500 transition hover:gap-2"
            >
              View Orders →
            </Link>
          </div>

          {/* Card 3 */}
          <div className="rounded-xl border border-border bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
            <p className="text-sm font-medium text-neutral-500">
              Total Products
            </p>
            <p className="mt-2 text-3xl font-bold text-heading">
              {products.length}
            </p>
            <Link
              to="/admin/products"
              className="mt-5 inline-flex items-center text-sm font-semibold text-primary-500 transition hover:gap-2"
            >
              View Products →
            </Link>
          </div>

          {/* Card 4 */}
          <div className="rounded-xl border border-border bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
            <p className="text-sm font-medium text-neutral-500">Customers</p>
            <p className="mt-2 text-3xl font-bold text-heading">----</p>
            <p className="mt-5 text-sm text-neutral-400">Coming Soon</p>
          </div>
        </div>
      )}

      {/* Recent Orders */}
      <div className="mt-10">
        <div className="mb-5 flex items-center justify-between">
          <div>
            <h2 className="font-dm-serif text-2xl text-heading">
              Recent Orders
            </h2>
            <p className="mt-1 text-sm text-body">
              Latest customer orders received.
            </p>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-hidden rounded-xl border border-border bg-white shadow-sm">
          <table className="min-w-full text-left">
            <thead className="bg-neutral-100 text-xs uppercase tracking-wider text-neutral-500">
              <tr>
                <th className="px-6 py-4">Order ID</th>
                <th className="px-6 py-4">User</th>
                <th className="px-6 py-4">Date</th>
                <th className="px-6 py-4">Amount</th>
                <th className="px-6 py-4">Payment</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Action</th>
              </tr>
            </thead>
            <tbody>
              {orders.length > 0 ? (
                orders.slice(0, 5).map((order) => (
                  <tr
                    key={order._id}
                    className="text-sm border-t border-neutral-100 text-body transition hover:bg-neutral-50"
                  >
                    {/* Order ID */}
                    <td className="px-6 py-4">#{order._id.slice(-8)}</td>

                    {/* Customer */}
                    <td className="px-6 py-4">
                      <p className="text-sm text-heading">
                        {order.user?.name || "N/A"}
                      </p>
                      <p className="text-xs">{order.user?.email || ""}</p>
                    </td>

                    {/* Date */}
                    <td className="px-6 py-4 text-sm">
                      {new Date(order.createdAt).toLocaleDateString("en-IN", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      })}
                    </td>

                    {/* Amount */}
                    <td className="px-6 py-4">
                      ₹{order.totalPrice.toFixed(2)}
                    </td>

                    {/* Payment */}
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold
                          ${
                            order.isPaid
                              ? "bg-green-100 text-success"
                              : "bg-red-100 text-error"
                          }`}
                      >
                        {order.isPaid ? "Paid" : "Pending"}
                      </span>
                    </td>

                    {/* Order Status */}
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold
                          ${
                            order.status === "Delivered"
                              ? "bg-green-100 text-success"
                              : order.status === "Processing"
                                ? "bg-blue-100 text-info"
                                : order.status === "Pending"
                                  ? "bg-yellow-100 text-warning"
                                  : order.status === "Cancelled"
                                    ? "bg-red-100 text-error"
                                    : "bg-neutral-100 text-neutral-700"
                          }`}
                      >
                        {order.status}
                      </span>
                    </td>

                    {/* Action */}
                    <td className="px-6 py-4 text-center">
                      <Link
                        to={`/admin/orders/${order._id}`}
                        className="inline-flex text-sm items-center gap-2 text-primary-600 hover:text-primary-700 font-medium"
                      >
                        <AiOutlineEye className="text-sm" />
                        View
                      </Link>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={7}
                    className="px-6 py-16 text-center text-neutral-500"
                  >
                    No recent orders available.
                  </td>
                </tr>
              )}
            </tbody>
          </table>

          <div className="flex items-center justify-between border-t border-neutral-200 bg-neutral-50 px-6 py-4">
            <p className="text-sm text-neutral-500">
              Showing{" "}
              <span className="font-semibold">
                {Math.min(orders.length, 5)}
              </span>{" "}
              of <span className="font-semibold">{orders.length}</span> orders
            </p>

            <Link
              to="/admin/orders"
              className="text-sm font-semibold text-primary-500 hover:underline"
            >
              View All Orders →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminHomePage;
