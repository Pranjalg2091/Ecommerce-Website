import React from "react";
import heroImage from "../../assets/heroImage.jpg";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section className="relative ">
      <img
        src={heroImage}
        alt="GrainMart"
        className="w-full h-[70vh] md:h-[80vh] lg:h-[90vh] object-cover"
      />
      <div className="absolute inset-0 bg-black/0 flex items-center justify-center">
        <div className="text-center text-white p-6">
          <h1 className="text-4xl md:text-7xl font-dm-serif tracking-normal mb-4">
            Fresh Grains, Pure Flour
            <br />
            Direct From Our Shop
          </h1>
          <p className="text-base font-manrope tracking-normal md:text-lg mb-6">
            Buy premium quality wheat and flour with the option to grind fresh
            at our store. Choose your grain, <br />
            book a grinding slot, and enjoy pure homemade flour.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-6">
            <Link
              to="#"
              className="w-full sm:w-auto text-center bg-primary-500 text-white px-6 py-3 rounded-sm text-lg hover:bg-primary-700 transition-all"
            >
              Shop Grains
            </Link>

            <Link
              to="#"
              className="w-full sm:w-auto text-center bg-secondary-500 text-white px-6 py-3 rounded-sm text-lg hover:bg-secondary-700 transition-all"
            >
              Book Grinding Slot
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
