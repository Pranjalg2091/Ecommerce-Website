import React from "react";
import { RiDeleteBinLine } from "react-icons/ri";

const CartContents = () => {
  const cartProducts = [
    {
      productId: 1,
      name: "Wheat Flour",
      size: "5kg",
      quantity: 1,
      price: 250,
      image: "https://picsum.photos/200?random=1",
    },
    {
      productId: 2,
      name: "Sharbati Wheat",
      size: "10kg",
      quantity: 2,
      price: 840,
      image: "https://picsum.photos/200?random=2",
    },
  ];
  return (
    <div>
      {cartProducts.map((product, index) => (
        <div
          key={index}
          className="flex items-start justify-between py-4 border-b"
        >
          <div className="flex items-start">
            <img
              src={product.image}
              alt={product.name}
              className="w-22 h-24 object-cover mr-4 rounded"
            />
            <div>
              <h3 className="font-dm-serif text-heading">{product.name}</h3>
              <p className="text-sm font-manrope text-body">
                Size: {product.size}
              </p>
              <div className="flex items-center mt-2">
                <button className="border rounded px-2 py-1 text-xl font-medium">
                  -
                </button>
                <span className="mx-4">{product.quantity}</span>
                <button className="border rounded px-2 py-1 text-xl font-medium">
                  +
                </button>
              </div>
            </div>
          </div>

          <div>
            <p className="font-manrope text-body text-lg">
              &#8377; {product.price.toLocaleString()}
            </p>
            <button>
              <RiDeleteBinLine className="h-6 w-6 mt-2 text-error" />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CartContents;
