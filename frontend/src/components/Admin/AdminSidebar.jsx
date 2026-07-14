import React from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import adminLogo from "../../assets/Grainmart-logo-dark.svg";
import { logout } from "../../redux/slices/authSlice.js";
import { clearCart } from "../../redux/slices/cartSlice.js";

import { PiUsersThree, PiSquaresFour } from "react-icons/pi";
import { FiLogOut } from "react-icons/fi";
import { LuClipboardList } from "react-icons/lu";
import { AiOutlineShop } from "react-icons/ai";
import { BsBoxSeam } from "react-icons/bs";

const AdminSidebar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
    dispatch(clearCart());
    navigate("/");
  };

  const menuItems = [
    {
      title: "Dashboard",
      icon: <PiSquaresFour size={22} />,
      path: "/admin",
    },
    {
      title: "Products",
      icon: <BsBoxSeam size={22} />,
      path: "/admin/products",
    },
    {
      title: "Orders",
      icon: <LuClipboardList size={22} />,
      path: "/admin/orders",
    },
    {
      title: "Users",
      icon: <PiUsersThree size={22} />,
      path: "/admin/users",
    },
    {
      title: "Visit Store",
      icon: <AiOutlineShop size={22} />,
      path: "/",
    },
  ];

  return (
    <div className="flex h-full w-full flex-col bg-[#111827] font-manrope">
      {/* ================= Logo ================= */}
      <div className="px-5 pt-6 pb-5">
        <Link to="/admin" className="block">
          <img src={adminLogo} alt="GrainMart" className="h-12" />
          <h2 className="mt-5 font-dm-serif text-3xl text-white leading-none">
            Admin Panel
          </h2>
          <p className="mt-2 text-sm leading-6 text-neutral-400">GrainMart Management</p>
        </Link>
      </div>
      <div className="mx-5 border-b border-white/10"></div>

      {/* Navbar */}
      {/* <nav className="flex flex-col space-y-1">
        <NavLink
          to="/admin/users"
          className={({ isActive }) =>
            `flex items-center px-3 md:px-4 py-2.5 md:py-3 rounded-md space-x-3 transition-all duration-200 ${
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
            `flex items-center px-3 md:px-4 py-2.5 md:py-3 rounded-md space-x-3 transition-all duration-200 ${
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
            `flex items-center px-3 md:px-4 py-2.5 md:py-3 rounded-md space-x-3 transition-all duration-200 ${
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
            `flex items-center px-3 md:px-4 py-2.5 md:py-3 rounded-md space-x-3 transition-all duration-200 ${
              isActive
                ? "bg-primary-500 text-white shadow"
                : "text-neutral-300 hover:bg-gray-800 hover:text-white"
            }`
          }
        >
          <AiOutlineShop className="text-lg" />
          <span className="text-sm font-medium">Shop</span>
        </NavLink>
      </nav> */}
     <nav className="flex-1 px-3 py-7">
       <div className="space-y-2">
        {menuItems.map((item) => (
          <NavLink
            key={item.title}
            to={item.path}
            end={item.path === "/admin"}
            className={({ isActive }) =>
              `flex items-center w-full h-[42px] rounded-md px-5 transition-all duration-200 ${
                isActive
                  ? "bg-primary-500 text-white"
                  : "text-neutral-300 hover:bg-gray-800 hover:text-white"
              }`
            }
          >
            <span className="w-7">{item.icon}</span>
            <span className="ml-1 font-medium text-sm">{item.title}</span>
          </NavLink>
        ))}
        </div>
      </nav>

      {/* Logout */}
      <div className="px-3 pb-5">
      <div className="border-t border-white/10 pt-5">
        <button
          onClick={handleLogout}
          className="flex w-full h-[42px] items-center justify-center rounded-md bg-error text-sm font-semibold text-white transition-all duration-200 hover:bg-error-hover"
      >
          <FiLogOut size={20} />
          <span className="ml-3"> Logout</span>
        </button>
      </div>
      </div>

      {/* Bottom space */}
      <div className="mx-5 border-t border-white/10 pt-5 pb-5">
        <p className="text-center text-sm text-neutral-500">GrainMart Admin</p>
        <p className="mt-1 text-center text-xs text-neutral-600">Version 1.0</p>
      </div>
    </div>
  );
};

export default AdminSidebar;
