import React from "react";
import { FiUsers } from "react-icons/fi";
import { LuPackageOpen } from "react-icons/lu";
import { LuPackage2 } from "react-icons/lu";
import { LuPackageCheck } from "react-icons/lu";
import { LuWheat } from "react-icons/lu";
import { BiStar } from "react-icons/bi";

const TrustStatsSection = () => {
  return (
    <section className="py-16 px-4 bg-secondary-50">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-6 text-center">
        {/* Feature Section starts here  */}
        <div className="flex flex-col items-center">
          <div className="w-24 h-24 flex items-center justify-center rounded-full mb-4 bg-[#e4b2d6]">
            {/* Border Wrapper */}
            <div className="p-4 border-2 border-white/40 rounded-full">
              <FiUsers className="text-4xl text-white" />
            </div>
          </div>
          <h4 className="font-manrope font-bold mb-2">500+ Happy Customers</h4>
          <p className="font-manrope text-body text-sm">
            Trusted by local families
          </p>
        </div>

        {/* Feature Section starts here  */}
        <div className="flex flex-col items-center">
          <div className="w-24 h-24 flex items-center justify-center rounded-full mb-4 bg-[#dcc698]">
            {/* Border Wrapper */}
            <div className="p-4 border-2 border-white/40 rounded-full">
              <LuPackageCheck className="text-4xl text-white" />
            </div>
          </div>
          <h4 className="font-manrope font-bold mb-2">2,000+ Orders Completed</h4>
          <p className="font-manrope text-body text-sm">
            Consistent & reliable service
          </p>
        </div>

        {/* Feature Section starts here  */}
        <div className="flex flex-col items-center">
          <div className="w-24 h-24 flex items-center justify-center rounded-full mb-4 bg-[#a2d1e1]">
            {/* Border Wrapper */}
            <div className="p-4 border-2 border-white/40 rounded-full">
              <LuWheat className="text-4xl text-white" />
            </div>
          </div>
          <h4 className="font-manrope font-bold mb-2">Fresh Grinding Available Daily</h4>
          <p className="font-manrope text-body text-sm">Flour made on demand</p>
        </div>

        {/* Feature Section starts here  */}
        <div className="flex flex-col items-center">
          <div className="w-24 h-24 flex items-center justify-center rounded-full mb-4 bg-[#dcd691]">
            {/* Border Wrapper */}
            <div className="p-4 border-2 border-white/40 rounded-full">
              <BiStar className="text-4xl text-white" />
            </div>
          </div>
          <h4 className="font-manrope font-bold mb-2">4.8 Average Customer Rating</h4>
          <p className="font-manrope text-body text-sm">Loved by customers</p>
        </div>
      </div>
    </section>
  );
};

export default TrustStatsSection;
