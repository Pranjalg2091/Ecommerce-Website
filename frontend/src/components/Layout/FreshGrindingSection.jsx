import React from "react";
import { Link } from "react-router-dom";
import { LuWheat, LuSlidersHorizontal, LuSprout } from "react-icons/lu";

const FreshGrindingSection = () => {
  return (
    <section className="py-16 px-6 bg-neutral-50 font-manrope relative overflow-hidden">
      
      {/* BACKGROUND SHAPE */}
      <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-primary-100 rounded-full blur-3xl opacity-30"></div>

      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">

        {/* LEFT CONTENT */}
        <div>
          {/* TAG */}
          <p className="text-lg text-primary-500 font-medium mb-2">
            Fresh Grinding Service
          </p>

          {/* HEADING */}
          <h2 className="text-3xl md:text-4xl font-dm-serif text-heading mb-5 leading-tight">
            Fresh Flour, <br /> Made Just for You
          </h2>

          {/* DESCRIPTION */}
          <p className="text-body text-base md:text-lg mb-8 max-w-md leading-relaxed">
            Experience the difference of freshly ground flour — prepared only
            after your order. No storage, no preservatives, just pure taste,
            better nutrition, and authentic quality your family deserves.
          </p>

          {/* POINTS */}
          <div className="space-y-5 mb-8">
            
            <div className="flex items-start gap-4">
              <LuWheat className="text-xl text-primary-500 mt-1" />
              <div>
                <h4 className="font-semibold text-heading">
                  Freshly Ground
                </h4>
                <p className="text-base text-body">
                  Your flour is processed only after your order, ensuring peak freshness and aroma.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <LuSlidersHorizontal className="text-xl text-primary-500 mt-1" />
              <div>
                <h4 className="font-semibold text-heading">
                  Custom Texture
                </h4>
                <p className="text-base text-body">
                  Choose grinding texture that perfectly matches your cooking needs.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <LuSprout className="text-xl text-primary-500 mt-1" />
              <div>
                <h4 className="font-semibold text-heading">
                  100% Natural
                </h4>
                <p className="text-base text-body">
                  Clean grains with no additives — just pure, wholesome nutrition.
                </p>
              </div>
            </div>

          </div>

          {/* CTA */}
          <Link
            to="/grinding-slots"
            className="inline-block bg-primary-500 text-white px-7 py-3 rounded-sm font-medium hover:bg-primary-600 transition-all"
          >
            Book Grinding Slot
          </Link>
        </div>

        {/* RIGHT IMAGE */}
        <div className="relative">
          <img
            src="https://images.unsplash.com/photo-1606787366850-de6330128bfc?q=80&w=1200&auto=format&fit=crop"
            alt="Fresh Grinding"
            className="w-full h-[480px] object-cover rounded-2xl shadow-lg"
          />

          {/* FLOATING CARD */}
          <div className="absolute -bottom-6 -left-6 bg-white p-5 rounded-xl shadow-md max-w-xs">
            <p className="text-sm text-body mb-1">
              Freshness Guarantee
            </p>
            <h4 className="text-lg font-semibold text-heading">
              100% Freshly Ground
            </h4>
            <p className="text-base text-body mt-1">
              Prepared only after your order — no pre-packed flour.
            </p>
          </div>

          {/* TOP BADGE */}
          <div className="absolute top-5 right-5 bg-black/70 text-white text-xs px-3 py-1.5 rounded-full backdrop-blur">
            No Preservatives
          </div>
        </div>

      </div>
    </section>
  );
};

export default FreshGrindingSection;