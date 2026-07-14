import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { clearCart } from "../redux/slices/cartSlice.js";
import { FcOk } from "react-icons/fc";

const OrderConfirmationPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { checkout } = useSelector((state) => state.checkout);

  const { state } = useLocation();

  // Clear the cart when the order is confirmed
  useEffect(() => {
    if (checkout && checkout._id) {
      dispatch(clearCart());
      localStorage.removeItem("cart");
    } else {
      navigate("/my-orders");
    }
  }, [checkout, dispatch, navigate]);

  const calculateEstimateDelivery = (createdAt) => {
    const orderDate = new Date(createdAt);
    orderDate.setDate(orderDate.getDate() + 1);
    return orderDate.toLocaleDateString();
  };

  if (!checkout) {
    return <p>Loading...</p>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6 font-manrope">
      <h1 className="text-3xl font-dm-serif text-center text-secondary-600 mb-6">
        Order Placed Successfully!
      </h1>
      <p className="text-center text-gray-500 mb-6">
        Thank you for shopping with GrainMart
      </p>

      {checkout && (
        <div className="bg-white rounded-lg border p-6">

          <div className="mb-4 inline-flex items-center gap-2 bg-green-100 border border-green-200 text-success px-5 py-2 rounded-full text-sm font-medium">
            <FcOk className="text-xl" />
            <span>Payment Successful</span>
          </div>

          <div className="flex justify-between mb-2">
            {/* Order Id and Date */}
            <div>
              <h2 className="text-xl font-dm-serif mb-4">
                Order ID: {checkout.orderNumber || checkout._id}
              </h2>
              <p className="text-body">
                Order Date: {new Date(checkout.createdAt).toLocaleDateString()}
              </p>
            </div>

            {/* Estimated Delivery */}
            <div>
              <p className="text-secondary-600 text-base font-semibold">
                Estimated Delivery:{" "}
                {calculateEstimateDelivery(checkout.createdAt)}
              </p>
            </div>
          </div>

          {/* Order Items */}
          <div className="mb-20">
            {checkout.orderItems.map((item) => (
              <div key={item.productId} className="flex items-center mb-4">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-16 h-16 object-cover rounded-md mr-4"
                />

                <div>
                  <h3 className="font-dm-serif text-lg">{item.name}</h3>
                  <p className="text-sm text-body">Size: {item.size}</p>
                </div>

                <div className="ml-auto text-right">
                  <p className="text-lg font-semibold text-primary-500">
                    ₹{item.price?.toLocaleString()}
                  </p>
                  <p className="text-sm text-body">Quantity: {item.quantity}</p>
                </div>
              </div>
            ))}
          </div>
          {/* Payment and Delivery Information */}
          <div className="grid grid-cols-2 gap-8">
            {/* Payment Information */}
            <div>
              <h3 className="font-dm-serif text-lg mb-2">Payment</h3>
              <p className="text-body">{checkout.paymentMethod}</p>
            </div>

            {/* Delivery Information */}
            <div>
              <h3 className="font-dm-serif text-lg mb-2">Delivery</h3>
              <p className="text-body">{checkout.shippingAddress.address}</p>
              <p className="text-body">{checkout.shippingAddress.city}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderConfirmationPage;
