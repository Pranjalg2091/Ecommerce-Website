import React, { useState } from "react";
import AdminSidebar from "./AdminSidebar.jsx";
import { Outlet } from "react-router-dom";
import { IoNotificationsOutline, IoChevronDown } from "react-icons/io5";
import { FiUser, FiSearch } from "react-icons/fi";
import { HiBars3BottomRight } from "react-icons/hi2";

const AdminLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex h-screen bg-neutral-50 font-manrope overflow-hidden">
      {/* Desktop Sidebar */}
      <div className="hidden md:flex fixed left-0 top-0 h-full w-64 bg-[#111827] text-white z-30">
        <AdminSidebar />
      </div>

      {/* Mobile Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-[#111827] text-white z-40 transform 
      ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} 
      transition-transform duration-300 md:hidden`}
      >
        <AdminSidebar />
      </div>

      {/* Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 md:hidden"
          onClick={toggleSidebar}
        ></div>
      )}

      {/* Main Section */}
      <div className="flex-1 flex flex-col md:ml-64">
        {/* ================= TOPBAR ================= */}
        <div className="fixed top-0 left-0 md:left-64 right-0 h-18 bg-white border-b border-neutral-200 flex items-center justify-between px-4 md:px-8 z-20">
          {/* Left */}
          <div className="flex items-center gap-4">
            <button onClick={toggleSidebar} className="md:hidden">
              <HiBars3BottomRight className="text-2xl" />
            </button>
            <div>
              <h1 className="font-semibold text-lg text-heading">Dashboard</h1>
              <p className="text-xs text-neutral-500">Welcome back, Admin</p>
            </div>
          </div>

          {/* Center */}
          <div className="hidden xl:flex flex-1 justify-center px-10">
            <div className="relative w-full max-w-lg">
              <FiSearch
                className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400"
                size={18}
              />
              <input
                type="text"
                placeholder="Search products, orders..."
                className="w-full h-11 rounded-md border border-border bg-neutral-50 pl-11 pr-4 text-sm outline-none transition focus:border-primary-500 focus:bg-white"
              />
            </div>
          </div>

          {/* Right */}
          <div className="flex items-center gap-5">
            {/* Notification */}
            <button className="relative flex h-10 w-10 items-center justify-center rounded-md bg-white cursor-pointer transition">
              <IoNotificationsOutline size={20} />
              <span className="absolute top-2 right-2 h-2.5 w-2.5 rounded-full bg-error"></span>
            </button>

            {/* Admin Profile */}
            <div className="flex items-center gap-3 rounded-md bg-white px-3 py-1.5 cursor-pointer transition">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-100">
                <FiUser className="text-primary-600" size={18} />
              </div>
              <div className="hidden lg:block">
                <h4 className="text-sm font-semibold leading-none">
                  Administrator
                </h4>
                <p className="mt-1 text-xs text-neutral-500">Super Admin</p>
              </div>
              <IoChevronDown className="text-neutral-500" size={18} />
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="mt-18 flex-1 overflow-y-auto px-6 lg:px-8 py-5 md:py-8">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
