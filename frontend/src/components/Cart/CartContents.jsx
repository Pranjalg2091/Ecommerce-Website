import React from "react";
import { RiDeleteBinLine } from "react-icons/ri";
import { useDispatch } from "react-redux";
import {
  removeFromCart,
  updateCartItemQuantity,
} from "../../redux/slices/cartSlice";

const CartContents = ({ cart, userId, guestId }) => {
  const dispatch = useDispatch();

  const handleAddToCart = (productId, delta, quantity, size) => {
    const newQuantity = quantity + delta;
    if (newQuantity >= 1) {
      dispatch(
        updateCartItemQuantity({
          productId,
          userId,
          guestId,
          quantity: newQuantity,
          size,
        }),
      );
    }
  };

  const handleRemoveFromCart = (productId, size) => {
    dispatch(removeFromCart({ productId, userId, guestId, size }));
  };

  return (
    <div>
      {cart.products.map((product) => (
        <div
          key={`${product.productId}-${product.size}`}
          className="bg-white rounded-2xl p-4 sm:p-6 border border-neutral-200 transition-all duration-300 mb-5"
        >
          <div className="flex flex-col sm:flex-row justify-between gap-6">
            {/* Left Section*/}

            <div className="flex flex-col sm:flex-row flex-1 gap-4 sm:gap-6 w-full">
              {/* Product Image */}
              <img
                src={product.image}
                alt={product.name}
                className="w-24 h-24 sm:w-32 sm:h-32 object-cover rounded-xl border border-neutral-200"
              />

              {/* Product Details */}
              <div className="flex-1 min-w-0">
                {/* Product Name */}
                <h3 className="text-xl lg:text-2xl font-semibold text-heading leading-snug">
                  {product.name}
                </h3>

                {/* Product Stock */}
                <p className="text-base text-green-600 font-medium mt-2">
                  In Stock
                </p>

                {/* Product Size */}
                <p className="text-base text-body mt-1">Size: {product.size}</p>

                {/* Delivery Date */}
                <p className="text-sm text-neutral-500 mt-1">
                  Delivery by 28 June
                </p>

                {/* Mobile Price */}
                <div className="sm:hidden mt-4">
                  <p className="text-3xl font-bold text-heading">
                    ₹{product.price.toLocaleString()}
                  </p>

                  {product.originalPrice > product.price && (
                    <>
                      <p className="text-sm line-through text-neutral-400">
                        ₹{product.originalPrice.toLocaleString()}
                      </p>

                      <span className="inline-block mt-1 bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full font-medium">
                        {product.discountPercentage}% OFF
                      </span>
                    </>
                  )}
                </div>

                {/* Quantity */}
                <div className="flex items-center gap-3 mt-5">
                  <button
                    onClick={() =>
                      handleAddToCart(
                        product.productId,
                        -1,
                        product.quantity,
                        product.size,
                      )
                    }
                    className="w-11 h-11 rounded-md border border-neutral-300 hover:bg-neutral-100 transition flex items-center justify-center"
                  >
                    <span className="text-3xl font-light leading-none">-</span>
                  </button>

                  <span className="font-semibold text-2xl min-w-[32px] text-center">
                    {product.quantity}
                  </span>

                  <button
                    onClick={() =>
                      handleAddToCart(
                        product.productId,
                        1,
                        product.quantity,
                        product.size,
                      )
                    }
                    className="w-11 h-11 rounded-md border border-neutral-300 hover:bg-neutral-100 transition flex items-center justify-center"
                  >
                    <span className="text-3xl font-light leading-none">+</span>
                  </button>
                </div>

                {/* Remove */}
                <button
                  onClick={() =>
                    handleRemoveFromCart(product.productId, product.size)
                  }
                  className="flex items-center gap-2 mt-5 text-sm font-medium text-neutral-500 hover:text-red-500 transition"
                >
                  <RiDeleteBinLine className="h-5 w-5" />

                  <span className="text-sm font-medium">Remove</span>
                </button>
              </div>
            </div>

            {/* Right Price */}
            {/* Desktop Price */}
            <div className="hidden sm:flex flex-col items-end min-w-[160px]">
              <p className="text-3xl lg:text-4xl font-bold text-heading">
                ₹{product.price.toLocaleString()}
              </p>

              {product.originalPrice > product.price && (
                <>
                  <p className="text-base line-through text-neutral-400 mt-1">
                    ₹{product.originalPrice.toLocaleString()}
                  </p>

                  <span className="mt-2 bg-green-100 text-green-700 text-sm px-3 py-1 rounded-full font-medium">
                    {product.discountPercentage}% OFF
                  </span>
                </>
              )}

              {/* Item Total */}
              <p className="text-sm font-medium text-neutral-700 mt-3">
                Item Total:
                <span className="font-semibold text-heading ml-1">
                  ₹{(product.price * product.quantity).toLocaleString()}
                </span>
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CartContents;
