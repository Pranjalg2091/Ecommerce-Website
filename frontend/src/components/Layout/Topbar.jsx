<<<<<<< HEAD
import React from "react";
import { FiPhone } from "react-icons/fi";
import { FiTruck } from "react-icons/fi";
import { LuWheat } from "react-icons/lu";

const Topbar = () => {
  return (
    <div className=" bg-primary-500 text-white">
      <div className="container mx-auto px-4 py-2 flex items-center justify-between">
       
        {/* Left - Hide on mobile */}
        <div className="hidden md:flex items-center gap-2 text-sm">
          <FiTruck className="text-sm" />
          <span>Free Delivery above ₹999</span>
        </div>

        {/* Center - Show on all screens */}
        <div className="flex items-center gap-2 text-sm">
          <LuWheat className="text-sm" />
          <span>100% Organic Grains from Trusted Farmers</span>
        </div>

        {/* Right - Hide on mobile */}
        <div className="hidden md:flex items-center gap-2 text-sm">
          <a href="tel:+919876543210" className="flex items-center gap-2">
            <FiPhone className="text-sm" />
            <span>+91 98765 43210</span>
          </a>
        </div>
        
      </div>
    </div>
  );
};

=======
import React from "react";
import { FiPhone } from "react-icons/fi";
import { FiTruck } from "react-icons/fi";
import { LuWheat } from "react-icons/lu";

const Topbar = () => {
  return (
    <div className=" bg-primary-500 text-white">
      <div className="container mx-auto px-4 py-2 flex items-center justify-between">
       
        {/* Left - Hide on mobile */}
        <div className="hidden md:flex items-center gap-2 text-sm">
          <FiTruck className="text-sm" />
          <span>Free Delivery above ₹999</span>
        </div>

        {/* Center - Show on all screens */}
        <div className="flex items-center gap-2 text-sm">
          <LuWheat className="text-sm" />
          <span>100% Organic Grains from Trusted Farmers</span>
        </div>

        {/* Right - Hide on mobile */}
        <div className="hidden md:flex items-center gap-2 text-sm">
          <a href="tel:+919876543210" className="flex items-center gap-2">
            <FiPhone className="text-sm" />
            <span>+91 98765 43210</span>
          </a>
        </div>
        
      </div>
    </div>
  );
};

>>>>>>> 49adca05e163e43d1355b25344acb566a70eac8b
export default Topbar;