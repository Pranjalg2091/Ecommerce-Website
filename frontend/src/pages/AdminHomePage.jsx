import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { fetchAdminProducts } from "../redux/slices/adminProductSlice.js";
import { fetchAllOrders } from "../redux/slices/adminOrderSlice.js";

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
    <div className="max-w-7xl mx-auto px-3 py-4 md:p-4 font-manrope">
      <h1 className="text-xl md:text-2xl font-dm-serif mb-5 md:mb-6">
        Admin Home
      </h1>

      {productsLoading || ordersLoading ? (
        <p>Loading...</p>
      ) : productsError ? (
        <p className="text-error">Error fetching products: {productsError}</p>
      ) : ordersError ? (
        <p className="text-error">Error fetching orders: {ordersError}</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          <div className="p-4 md:p-5 border border-border rounded-lg bg-white">
            <h2 className="text-xs md:text-sm">Revenue</h2>
            <p className="text-lg md:text-xl font-semibold mt-1">
              ₹{(totalSales || 0).toFixed(2)}
            </p>
          </div>

          <div className="p-4 md:p-5 border border-border rounded-lg bg-white">
            <h2 className="text-xs md:text-sm">Total Orders</h2>
            <p className="text-lg md:text-xl font-semibold mt-1">
              {totalOrders}
            </p>
            <Link
              to="/admin/orders"
              className="text-primary-500 hover:underline text-sm font-medium"
            >
              Manage Orders
            </Link>
          </div>

          <div className="p-4 md:p-5 border border-border rounded-lg bg-white">
            <h2 className="text-xs md:text-sm">Total Products</h2>
            <p className="text-lg md:text-xl font-semibold mt-1">
              {products.length}
            </p>
            <Link
              to="/admin/products"
              className="text-primary-500 hover:underline text-sm font-medium"
            >
              Manage Products
            </Link>
          </div>
        </div>
      )}

      <div className="mt-6">
        <h2 className="text-lg md:text-xl font-bold mb-3 md:mb-4">Recent Orders</h2>
        <div className="overflow-x-auto rounded-lg">
          <table className="min-w-full bg-white text-left text-sm text-body rounded-lg overflow-hidden">
            <thead className="bg-neutral-100 text-xs uppercase text-heading">
              <tr>
                <th className="py-3 px-4">Order ID</th>
                <th className="py-3 px-4">User</th>
                <th className="py-3 px-4">Total Price</th>
                <th className="py-3 px-4">Status</th>
              </tr>
            </thead>
            <tbody>
              {orders.length > 0 ? (
                orders.map((order) => (
                  <tr
                    key={order._id}
                    className="border-b border-border cursor-pointer hover:bg-neutral-100 transition-colors"
                  >
                    <td className="p-2 md:p-4">{order._id}</td>
                    <td className="p-2 md:p-4">{order.user?.name || "N/A"}</td>
                    <td className="p-2 md:p-4">₹{order.totalPrice.toFixed(2)}</td>
                    <td className="p-2 md:p-4">{order.status}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td className="p-4 text-center text-body">
                    No orders found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminHomePage;
