import React from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import adminLogo from "../../assets/Grainmart-logo-dark.svg";
import { PiUsersThree } from "react-icons/pi";
import { FiLogOut } from "react-icons/fi";
import { LuClipboardList } from "react-icons/lu";
import { AiOutlineShop } from "react-icons/ai";
import { BsBoxSeam } from "react-icons/bs";

const AdminSidebar = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    navigate("/");
  };

  return (
    <div className="h-full flex flex-col p-5 font-manrope">
      {/* Logo */}
      <Link to="/admin" className="flex items-center justify-center mb-6">
        <img src={adminLogo} alt="GrainMart Logo" className="h-12" />
      </Link>

      {/* Title */}
      <h2 className="text-xl font-dm-serif text-white mb-6 text-center tracking-wide">
        Admin Dashboard
      </h2>

      {/* Nav */}
      <nav className="flex flex-col space-y-1">
        <NavLink
          to="/admin/users"
          className={({ isActive }) =>
            `flex items-center px-4 py-3 rounded-md space-x-3 transition-all duration-200 ${
              isActive
                ? "bg-primary-500 text-white shadow"
                : "text-neutral-300 hover:bg-gray-800 hover:text-white"
            }`
          }
        >
          <PiUsersThree className="text-xl" />
          <span className="text-sm font-medium">Users</span>
        </NavLink>

        <NavLink
          to="/admin/products"
          className={({ isActive }) =>
            `flex items-center px-4 py-3 rounded-md space-x-3 transition-all duration-200 ${
              isActive
                ? "bg-primary-500 text-white shadow"
                : "text-neutral-300 hover:bg-gray-800 hover:text-white"
            }`
          }
        >
          <BsBoxSeam className="text-lg" />
          <span className="text-sm font-medium">Products</span>
        </NavLink>
        <NavLink
          to="/admin/orders"
          className={({ isActive }) =>
            `flex items-center px-4 py-3 rounded-md space-x-3 transition-all duration-200 ${
              isActive
                ? "bg-primary-500 text-white shadow"
                : "text-neutral-300 hover:bg-gray-800 hover:text-white"
            }`
          }
        >
          <LuClipboardList className="text-lg" />
          <span className="text-sm font-medium">Orders</span>
        </NavLink>
        <NavLink
          to="/"
          className={({ isActive }) =>
            `flex items-center px-4 py-3 rounded-md space-x-3 transition-all duration-200 ${
              isActive
                ? "bg-primary-500 text-white shadow"
                : "text-neutral-300 hover:bg-gray-800 hover:text-white"
            }`
          }
        >
          <AiOutlineShop className="text-lg" />
          <span className="text-sm font-medium">Shop</span>
        </NavLink>
      </nav>

      <div className="mt-6 ">
        <button
          onClick={handleLogout}
          className="w-full bg-error hover:bg-error-hover text-white py-2 px-4 rounded flex items-center justify-center space-x-2"
        >
          <FiLogOut />
          <span>Logout</span>
        </button>
      </div>

      {/* Bottom space */}
      <div className="mt-auto text-xs text-neutral-500 text-center pt-6">
        © GrainMart Admin
      </div>
    </div>
  );
};

export default AdminSidebar;
