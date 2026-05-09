import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  fetchAllOrders,
  updateOrderStatus,
} from "../../redux/slices/adminOrderSlice";
import Pagination from "../Common/Pagination";
import { IoArrowBack } from "react-icons/io5";

const OrderManagement = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const { user } = useSelector((state) => state.auth);
  const { orders, loading, error } = useSelector((state) => state.adminOrders);

  // ✅ PAGINATION LOGIC
  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;

  const currentOrders = orders.slice(indexOfFirst, indexOfLast);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentPage]);

  useEffect(() => {
    if (!user && user.role !== "admin") {
      navigate("/");
    } else {
      dispatch(fetchAllOrders());
    }
  }, [dispatch, navigate, user]);

  const handleStatusChange = (orderId, newStatus) => {
    dispatch(updateOrderStatus({ id: orderId, status: newStatus }));
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div className="max-w-7xl mx-auto p-6 font-manrope text-body">
      <div className="flex items-center gap-3 mb-6">
        <button
          type="button"
          onClick={() => window.history.back()}
          className="p-2 rounded-md hover:bg-gray-100 transition"
        >
          <IoArrowBack className="text-xl" />
        </button>

        <h2 className="text-2xl font-dm-serif">Order Management</h2>
      </div>

      <div className="overflow-x-auto shadow-sm sm:rounded-lg bg-white">
        <table className="min-w-full text-left text-sm  text-body">
          <thead className="bg-neutral-100 uppercase text-heading">
            <tr>
              <th className="py-3 px-4">Order ID</th>
              <th className="py-3 px-4">Customer</th>
              <th className="py-3 px-4">Total Price</th>
              <th className="py-3 px-4">Status</th>
              <th className="py-3 px-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.length > 0 ? (
              currentOrders.map((order) => (
                <tr
                  key={order._id}
                  className="border-b border-border cursor-pointer"
                >
                  {/* Order ID */}
                  <td className="py-4 px-4 font-medium whitespace-nowrap">
                    {order._id}
                  </td>

                  {/* Customer */}
                  <td className="p-4">{order.user.name}</td>

                  {/* Total Price */}
                  <td className="p-4">₹ {order.totalPrice.toFixed(2)}</td>

                  {/* Status */}
                  <td className="p-4">
                    <select
                      value={order.status}
                      onChange={(e) =>
                        handleStatusChange(order._id, e.target.value)
                      }
                      className="bg-neutral-50 border border-border text-sm text-body rounded block p-2.5"
                    >
                      <option value="Processing">Processing</option>
                      <option value="Shipped">Shipped</option>
                      <option value="Delivered">Delivered</option>
                      <option value="Cancelled">Cancelled</option>
                    </select>
                  </td>

                  {/* Actions */}
                  <td className="p-4">
                    <button className="bg-success hover:bg-success-hover text-white py-2 px-4 rounded">
                      Mark as Delivered
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="p-4 text-center">
                  No orders found
                </td>
              </tr>
            )}
          </tbody>
        </table>

        <div className="mt-4 px-2">
          <Pagination
            currentPage={currentPage}
            totalItems={orders.length}
            itemsPerPage={itemsPerPage}
            onPageChange={setCurrentPage}
            onLimitChange={(limit) => {
              setItemsPerPage(limit);
              setCurrentPage(1);
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default OrderManagement;
