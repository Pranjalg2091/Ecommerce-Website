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
          key={product.productId}
          className="flex items-start justify-between py-4 border-b"
        >
          <div className="flex items-start">
            <img
              src={product.image}
              alt={product.name}
              className="w-24 h-24 object-cover mr-4 rounded"
            />

            <div>
              <h3 className="font-dm-serif text-heading">{product.name}</h3>

              <p className="text-sm font-manrope text-body">
                Size: {product.size}
              </p>

              {/* Quantity */}
              <div className="flex items-center mt-2">
                <button
                  onClick={() =>
                    handleAddToCart(
                      product.productId,
                      -1,
                      product.quantity,
                      product.size,
                    )
                  }
                  className="border rounded px-2 py-1 text-xl font-medium"
                >
                  -
                </button>

                <span className="mx-4">{product.quantity}</span>

                <button
                  onClick={() =>
                    handleAddToCart(
                      product.productId,
                      1,
                      product.quantity,
                      product.size,
                    )
                  }
                  className="border rounded px-2 py-1 text-xl font-medium"
                >
                  +
                </button>
              </div>
            </div>
          </div>

          {/* Price + Delete */}
          <div className="text-right">
            <p className="font-manrope text-body text-lg">
              ₹ {product.price.toLocaleString()}
            </p>

            <button
              onClick={() =>
                handleRemoveFromCart(
                  product.productId, 
                  product.size
                )
              }
            >
              <RiDeleteBinLine className="h-6 w-6 mt-2 text-error cursor-pointer" />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CartContents;
