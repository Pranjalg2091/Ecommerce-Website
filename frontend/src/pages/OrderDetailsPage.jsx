import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

const OrderDetailsPage = () => {
  const { id } = useParams();
  const [orderDetails, setOrderDetails] = useState(null);

  useEffect(() => {
    const mockOrderDetails = {
      _id: id,
      createdAt: new Date(),
      isPaid: true,
      isDelivered: false,
      paymentMethod: "Razorpay",
      shippingMethod: "Standard Shipping",
      shippingAddress: {
        city: "Indore",
        address: "14, Manik Bagh Road, Palasia",
      },
      orderItems: [
        {
          productId: 1,
          name: "Wheat Flour",
          size: "5kg",
          quantity: 1,
          price: 250,
          image: "https://picsum.photos/200?random=8",
        },
        {
          productId: 2,
          name: "Sharbati Wheat",
          size: "10kg",
          quantity: 2,
          price: 840,
          image: "https://picsum.photos/200?random=9",
        },
      ],
    };
    setOrderDetails(mockOrderDetails);
  }, [id]);

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6 font-manrope">
      <h2 className="text-2xl font-dm-serif mb-6">Order Details</h2>
      {!orderDetails ? (
        <p>No Order details found</p>
      ) : (
        <div className="p-4 sm:p-6 rounded-lg border border-border">
          <div className="flex flex-col sm:flex-row justify-between mb-8">
            <div>
              <h3 className="text-lg md:text-xl font-semibold">
                Order ID: #{orderDetails._id}
              </h3>
              <p className="text-body">
                {new Date(orderDetails.createdAt).toLocaleString()}
              </p>
            </div>
            <div className="flex flex-col items-start sm:items-end mt-4 sm:mt-0">
              <span
                className={`${
                  orderDetails.isPaid
                    ? "bg-green-100 text-success"
                    : "bg-red-100 text-error"
                } 
                    px-3 py-1 rounded-full text-sm font-medium mb-2`}
              >
                {orderDetails.isPaid ? "Approved" : "Pending Payment"}
              </span>
              <span
                className={`${
                  orderDetails.isDelivered
                    ? "bg-green-100 text-success"
                    : "bg-yellow-100 text-warning"
                } 
                    px-3 py-1 rounded-full text-sm font-medium mb-2`}
              >
                {orderDetails.isDelivered ? "Delivered" : "Pending Delivery"}
              </span>
            </div>
          </div>

          {/* Customer, Payment and Shipping Information */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mb-8">
            <div>
              <h4 className="text-lg font-semibold mb-2">Payment Info</h4>
              <p className="text-body">
                Payment Method: {orderDetails.paymentMethod}
              </p>
              <p className="text-body">
                Status: {orderDetails.isPaid ? "Paid" : "Unpaid"}
              </p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-2">Shipping Info</h4>
              <p className="text-body">
                Shipping Method: {orderDetails.shippingMethod}
              </p>
              <p className="text-body">
                Address:{" "}
                {`${orderDetails.shippingAddress.address}, ${orderDetails.shippingAddress.city}`}
              </p>
            </div>
          </div>

          {/* Product List */}
          <div className="overflow-x-auto">
            <h4 className="text-lg font-semibold mb-4">Products</h4>
            <table className="min-w-full text-body mb-4">
              <thead className="bg-neutral-100">
                <tr>
                  <th className="py-2 px-4 text-left">Name</th>
                  <th className="py-2 px-4 text-left">Unit Price</th>
                  <th className="py-2 px-4 text-left">Quantity</th>
                  <th className="py-2 px-4 text-left">Total</th>
                </tr>
              </thead>
              <tbody>
                {orderDetails.orderItems.map((item) => (
                  <tr key={item.productId} className="border-b border-border">
                    <td className="py-2 px-4 flex items-center">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-16 h-16 object-cover mr-4"
                      />
                      <Link
                        to={`/products/${item.productId}`}
                        className="text-primary-500 hover:underline"
                      >
                        {item.name}
                      </Link>
                    </td>
                    <td className="py-2 px-4">₹{item.price.toFixed(2)}</td>
                    <td className="py-2 px-4">{item.quantity}</td>
                    <td className="py-2 px-4">
                      ₹{(item.price * item.quantity).toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Back to Orders Link */}
          <Link to="/my-orders" className="text-primary-500 hover:underline">
            &larr; Back to My Orders
          </Link>
        </div>
      )}
    </div>
  );
};

export default OrderDetailsPage;
