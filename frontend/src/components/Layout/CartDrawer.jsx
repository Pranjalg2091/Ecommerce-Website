import React from "react";
import { IoClose } from "react-icons/io5";
import CartContents from "../Cart/CartContents";

const CartDrawer = ({ drawerOpen, toggleCartDrawer }) => {
  return (
    <div
      className={`fixed top-0 right-0 w-3/4 sm:w-1/2 md:w-120 h-full bg-white shadow-lg transform transition-transform duration-300 flex flex-col z-50
        ${drawerOpen ? "translate-x-0" : "translate-x-full"}`}
    >
      {/* Close Button */}
      <div className="flex justify-end p-4">
        <button onClick={toggleCartDrawer}>
          <IoClose className="text-2xl cursor-pointer text-neutral-600" />
        </button>
      </div>

      {/* Cart content with scrollable area */}
      <div className="grow p-4 overflow-y-auto ">
        <h2 className="text-xl font-dm-serif mb-4">Your Cart</h2>
        
        {/* Component for Cart Contents */}
        <CartContents />
      </div>

      {/* Checkout button fixed at the bottom */}
      <div className="p-4 bg-white sticky bottom-0">
        <button className="w-full bg-primary-500 text-white py-3 rounded-sm font-medium hover:bg-primary-700
        transition">
          Checkout
        </button>
        <p className="text-xs tracking-tighter text-neutral-500 mt-2 text-center">Shipping, Taxes, and Discount codes calculated at checkout.</p>
      </div>
    </div>
  );
};

export default CartDrawer;