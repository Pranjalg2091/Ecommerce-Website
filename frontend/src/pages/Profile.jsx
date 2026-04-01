import React from "react";
import MyOrdersPage from "./MyOrdersPage";


const Profile = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-grow container mx-auto p-4 md:p-6">
        <div className="flex flex-col md:flex-row md:space-x-6 space-y-6 md:space-y-0">
          {/* Left Section */}
          <div className="w-full md:w-1/3 lg:w-1/4 shadow-sm rounded-lg p-6">
            <h1 className="text-2xl md:text-3xl font-dm-serif mb-4">
              John Doe
            </h1>
            <p className="text-lg font-manrope text-body mb-4">
              john@example.com
            </p>
            <button className="w-full bg-error hover:bg-error-hover text-white font-manrope font-semibold py-2 px-4 rounded">
              Logout
            </button>
          </div>

          {/* Right section : Orders table */}
          <div className="w-full md:w-2/3 lg:w-3/4">
            <MyOrdersPage />
          </div>

        </div>
      </div>
    </div>
  );
};

export default Profile;
