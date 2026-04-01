import React, { useState } from "react";
import { HiBars3BottomRight } from "react-icons/hi2";
import AdminSidebar from "./AdminSidebar";
import { Outlet } from "react-router-dom";
import { IoNotificationsOutline } from "react-icons/io5";
import { FiUser } from "react-icons/fi";

const AdminLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex h-screen bg-[#f8f9fc] font-manrope">
      {/* Sidebar */}
      <div className="hidden md:flex fixed left-0 top-0 h-full w-64 bg-gray-950 text-white z-30">
        <AdminSidebar />
      </div>

      {/* Mobile Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-gray-950 text-white z-40 transform 
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
        {/* Topbar */}
        <div className="fixed top-0 left-0 md:left-64 right-0 h-16 bg-white shadow-xs flex items-center justify-between px-6 z-20">
          {/* Left */}
          <div className="flex items-center space-x-4">
            <button onClick={toggleSidebar} className="md:hidden">
              <HiBars3BottomRight className="text-2xl" />
            </button>
            <h1 className="text-lg text-whitefont-semibold">Admin Dashboard</h1>
          </div>

          {/* Right */}
          <div className="flex items-center space-x-6">
            {/* Notification */}
            <span className="text-xl cursor-pointer">
              <IoNotificationsOutline />
            </span>

            {/* Admin */}
            <div className="flex items-center space-x-2 cursor-pointer">
              <div className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center">
                <FiUser className="text-xl"/>
              </div>
              <span className="text-sm font-medium">Admin</span>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="mt-16 p-6 overflow-y-auto">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
