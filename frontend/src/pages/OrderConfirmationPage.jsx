import React from "react";

const checkout = {
  _id: "12345",
  createdAt: new Date(),
  checkoutItems: [
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
  shippingAddress: {
    address: "14, Manik Bagh Road, Palasia",
    city: "Indore",
  },
};

const OrderConfirmationPage = () => {
  const calculateEstimateDelivery = (createdAt) => {
    const orderDate = new Date(createdAt);
    orderDate.setDate(orderDate.getDate() + 5);
    return orderDate.toLocaleDateString();

    // const estimatedDate = new Date(orderDate);
    // estimatedDate.setDate(orderDate.getDate() + 5);
  };

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
          <div className="mb-4 inline-block bg-green-100 text-success px-4 py-1 rounded-full text-sm font-medium">
            Payment Successful
          </div>

          <div className="flex justify-between mb-2">
            {/* Order Id and Date */}
            <div>
              <h2 className="text-xl font-dm-serif mb-4">
                Order ID: {checkout._id}
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
            {checkout.checkoutItems.map((item) => (
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
              <p className="text-body">UPI</p>
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
