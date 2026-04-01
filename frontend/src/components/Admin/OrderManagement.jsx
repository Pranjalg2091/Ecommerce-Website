import React from "react";

const OrderManagement = () => {
  const orders = [
    {
      _id: "12345",
      user: {
        name: "John Doe",
      },
      totalPrice: 500,
      status: "Processing",
    },
     {
      _id: "12348",
      user: {
        name: "John Doe",
      },
      totalPrice: 500,
      status: "Shipped",
    },
     {
      _id: "12340",
      user: {
        name: "John Doe",
      },
      totalPrice: 500,
      status: "Processing",
    },
  ];

  const handleStatusChange = (orderId, newStatus) => {
    console.log({ id: orderId, status: newStatus });
  };

  return (
    <div className="max-w-7xl mx-auto p-6 font-manrope text-body">
      <h2 className="text-2xl font-dm-serif mb-6">Order Management</h2>

      <div className="overflow-x-auto shadow-sm sm:rounded-lg bg-white">
        <table className="min-w-full text-left text-body">
          <thead className="bg-neutral-100 text-sm uppercase text-heading">
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
              orders.map((order) => (
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
                  <td className="p-4">₹ {order.totalPrice.toLocaleString()}</td>

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
      </div>
    </div>
  );
};

export default OrderManagement;
