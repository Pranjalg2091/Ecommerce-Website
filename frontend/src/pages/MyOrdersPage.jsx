import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const MyOrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // simulate fetch orders data
    setTimeout(() => {
      const mockOrders = [
        // Replace with actual mock data if needed
        {
          _id: "12345",
          createdAt: new Date(),
          shippingAddress: {
            address: "Palasia",
            city: "Indore",
          },

          orderItems: [
            {
              name: "Product 1",
              image: "https://picsum.photos/600/600?random=10",
            },
          ],
          totalPrice: 430.0,
          isPaid: true,
        },
        {
          _id: "45678",
          createdAt: new Date(),
          shippingAddress: {
            address: "Tilak Nagar",
            city: "Indore",
          },

          orderItems: [
            {
              name: "Product 1",
              image: "https://picsum.photos/600/600?random=12",
            },
          ],
          totalPrice: 250.0,
          isPaid: true,
        },
      ];

      setOrders(mockOrders);
    }, 1000);
  }, []);

  const handleRowClick = (orderId) => {
    // Navigate to order details page
    navigate(`/order/${orderId}`);
  }

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6">
      <h2 className="text-xl sm:text-2xl font-dm-serif mb-6">My Orders</h2>
      <div className="relative shadow-sm sm:rounded-lg overflow-hidden">
        <table className="min-w-full text-left text-heading">
          <thead className="bg-neutral-100 text-sm font-manrope uppercase text-body">
            <tr>
              <th className="py-2 px-4 sm:py-3">Image</th>
              <th className="py-2 px-4 sm:py-3">Order ID</th>
              <th className="py-2 px-4 sm:py-3">Created</th>
              <th className="py-2 px-4 sm:py-3">Shipping Address</th>
              <th className="py-2 px-4 sm:py-3">Items</th>
              <th className="py-2 px-4 sm:py-3">Price</th>
              <th className="py-2 px-4 sm:py-3">Status</th>
            </tr>
          </thead>
          <tbody className="font-manrope text-body text-sm">
            {orders.length > 0 ? (
              orders.map((order) => (
                <tr
                  key={order._id}
                  onClick={() => handleRowClick(order._id)}
                  className="border-b border-border transition-colors cursor-pointer"
                >
                  <td className="py-2 px-2 sm:py-4 sm:px-4">
                    <img
                      src={order.orderItems[0].image}
                      alt={order.orderItems[0].name}
                      className="w-10 h-10 sm:w-12 sm:h-12 object-cover rounded-md"
                    />
                  </td>
                  <td className="py-2 px-2 sm:py-4 font-semibold whitespace-nowrap">
                    #{order._id}
                  </td>
                  <td className="py-2 px-2 sm:py-4 sm:px-4">
                    {new Date(order.createdAt).toLocaleDateString()},{" "}
                    {new Date(order.createdAt).toLocaleTimeString()}
                  </td>
                  <td className="py-2 px-2 sm:py-4 sm:px-4">
                    {order.shippingAddress
                      ? `${order.shippingAddress.address}, ${order.shippingAddress.city}`
                      : "N/A"}
                  </td>
                  <td className="py-2 px-2 sm:py-4 sm:px-4">
                    {order.orderItems.length}
                  </td>
                  <td className="py-2 px-2 sm:py-4 sm:px-4">
                    ₹{order.totalPrice.toFixed(2)}
                  </td>
                  <td className="py-2 px-2 sm:py-4 sm:px-4">
                    <span
                      className={`py-1 px-3 rounded-full text-xs font-semibold 
                        ${order.isPaid 
                            ? "bg-green-100 text-success" 
                            : "bg-red-100 text-error"}`}
                    >
                      {order.isPaid ? "Paid" : "Not Paid"}
                    </span>
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
