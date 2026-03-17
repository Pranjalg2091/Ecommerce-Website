import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/Grainmart-logo.svg";
import { FiUser, FiShoppingCart } from "react-icons/fi";
import SearchBar from "./SearchBar";
import { HiBars3BottomRight } from "react-icons/hi2";
import CartDrawer from "../Layout/CartDrawer";
import { IoClose } from "react-icons/io5";

const Navbar = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [navDrawerOpen, setNavDrawerOpen] = useState(false);

  const toggleNavDrawer = () => {
    setNavDrawerOpen(!navDrawerOpen);
  };

  const toggleCartDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  return (
    <>
      <nav className="w-full bg-white">
        <div className="container mx-auto py-4 px-6 h-20 flex items-center justify-between">
          {/* LEFT → LOGO */}
          <Link to="/" className="flex items-center">
            <img src={logo} alt="GrainMart Logo" className="h-18 w-auto" />
          </Link>

          {/* CENTER → NAVIGATION LINKS */}
          <div className="hidden md:flex items-center gap-8 font-manrope text-base">
            <Link
              to="/"
              className="text-heading font-medium hover:text-primary-500 transition-colors"
            >
              Home
            </Link>

            <Link
              to="/about"
              className="text-heading font-medium hover:text-primary-500 transition-colors"
            >
              About
            </Link>

            <Link
              to="/products"
              className="text-heading font-medium hover:text-primary-500 transition-colors"
            >
              Products
            </Link>

            <Link
              to="/contact"
              className="text-heading font-medium hover:text-primary-500 transition-colors"
            >
              Contact
            </Link>
          </div>

          {/* RIGHT → ICONS */}
          <div className="flex items-center gap-5">
            {/* User */}
            <Link to="/profile" className="hover:text-primary-500">
              <FiUser className="text-2xl text-neutral-700 hover:text-primary-500 cursor-pointer" />
            </Link>

            {/* Cart */}
            <button
              onClick={toggleCartDrawer}
              className="relative cursor-pointer hover:text-primary-500"
            >
              <FiShoppingCart className="text-2xl text-neutral-700 " />

              <span className="absolute -top-2 -right-2 bg-secondary-500 text-neutral-700 text-xs w-5 h-5 flex items-center justify-center rounded-full">
                3
              </span>
            </button>

            {/* Search */}
            <div className="overflow-hidden">
              <SearchBar />
            </div>

            <button onClick={toggleNavDrawer} className="md:hidden">
              <HiBars3BottomRight className="text-2xl text-neutral-700" />
            </button>
          </div>
        </div>
      </nav>

      {/* CartDrawer Will Open from here */}
      <CartDrawer drawerOpen={drawerOpen} toggleCartDrawer={toggleCartDrawer} />

      {/* Mobile Navigation */}
      <div
        className={`fixed top-0 left-0 w-3/4 sm:w-1/2 md:w-1/3 h-full bg-white shadow-lg transform transition-transform duration-300 z-50
        ${navDrawerOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        
        <div className="flex justify-end p-4">
          <button onClick={toggleNavDrawer}>
            <IoClose className="text-2xl cursor-pointer text-neutral-700" />
          </button>
        </div>
        <div className="p-4">
          <h2 className="text-2xl mb-4 font-dm-serif">Menu</h2>
          <nav className="space-y-4 text-heading font-medium">
            <Link
              to="#"
              onClick={toggleNavDrawer}
              className="block hover:text-primary-500 transition-colors"
            >Home</Link>

            <Link
              to="#"
              onClick={toggleNavDrawer}
              className="block hover:text-primary-500 transition-colors"
            >About</Link>

            <Link
              to="#"
              onClick={toggleNavDrawer}
              className="block hover:text-primary-500 transition-colors"
            >Products</Link>

            <Link
              to="#"
              onClick={toggleNavDrawer}
              className="block hover:text-primary-500 transition-colors"
            >Contact</Link>
          </nav>
        </div>
      </div>
    </>
  );
};

export default Navbar;
