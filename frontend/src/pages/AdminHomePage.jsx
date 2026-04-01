import React from "react";
import { Link } from "react-router-dom";

const AdminHomePage = () => {
  const orders = [
    {
      _id: "12345",
      user: {
        name: "John Doe",
      },
      totalPrice: 1930,
      status: "Processing",
    },
    {
      _id: "45678",
      user: {
        name: "John Doe",
      },
      totalPrice: 1930,
      status: "Processing",
    },
    {
      _id: "90123",
      user: {
        name: "John Doe",
      },
      totalPrice: 1930,
      status: "Processing",
    },
    {
      _id: "90150",
      user: {
        name: "John Doe",
      },
      totalPrice: 1930,
      status: "Processing",
    },
    {
      _id: "25678",
      user: {
        name: "John Doe",
      },
      totalPrice: 1930,
      status: "Processing",
    },
  ];

  return (
    <div className="max-w-7xl mx-auto p-4 font-manrope ">
      <h1 className="text-2xl font-dm-serif mb-6">Admin Home</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        
        <div className="p-5 border border-border rounded-lg bg-white">
          <h2 className="text-sm">Revenue</h2>
          <p className="text-xl font-semibold mt-1">₹19,300.00</p>
        </div>
       
        <div className="p-5 border border-border rounded-lg bg-white">
          <h2 className="text-sm">Total Orders</h2>
          <p className="text-xl font-semibold mt-1">20</p>
          <Link
            to="/admin/orders"
            className="text-primary-500 hover:underline text-sm font-medium"
          >
            Manage Orders
          </Link>
        </div>
        
        <div className="p-5 border border-border rounded-lg bg-white">
          <h2 className="text-sm ">Total Products</h2>
          <p className="text-xl font-semibold mt-1">40</p>
          <Link
            to="/admin/products"
            className="text-primary-500 hover:underline text-sm font-medium"
          >
            Manage Products
          </Link>
        </div>
      </div>

      <div className="mt-6">
        <h2 className="text-xl font-bold mb-4">Recent Orders</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white text-left text-body rounded-lg overflow-hidden">
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
                    <td className="p-4">{order._id}</td>
                    <td className="p-4">{order.user.name}</td>
                    <td className="p-4">₹{order.totalPrice.toFixed(2)}</td>
                    <td className="p-4">{order.status}</td>
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
