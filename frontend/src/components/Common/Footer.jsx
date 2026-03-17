import React from "react";
import { Link } from "react-router-dom";
import { FiPhone } from "react-icons/fi";
import { HiOutlineLocationMarker } from "react-icons/hi";

const Footer = () => {
  return (
    <footer className="border-t border-border py-12">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 px-4 lg:px-0">
        <div>
          <h3 className="font-dm-serif text-heading text-lg mb-4">
            Newsletter
          </h3>
          <p className="font-manrope text-body text-sm mb-4">
            Be the first to hear about new products, exclusive events, and
            online offers.
          </p>
          <p className="font-manrope font-medium text-sm text-body mb-6">
            Sign up and get 10% off on your first order.
          </p>

          {/* Newsletter form */}
          <form className="flex">
            <input
              type="email"
              placeholder="Enter your email"
              className="p-3 w-full text-sm border-t border-l border-b border-neutral-300 rounded-l-sm focus:outline-none focus:ring-2 focus:ring-neutral-500 transition-all"
              required
            />
            <button
              type="submit"
              className="bg-primary-500 text-white px-6 py-3 rounded-r-sm text-base hover:bg-primary-700
        transition-all"
            >
              Subscribe
            </button>
          </form>
        </div>

        {/* Shop links */}
        <div>
          <h3 className="font-dm-serif text-heading text-lg mb-4">
            Our Popular Products
          </h3>
          <ul className="space-y-2 text-body text-sm ">
            <li>
              <Link
                to="#"
                className="font-manrope hover:text-primary-500 transition-colors"
              >
                Sharbati Wheat
              </Link>
            </li>
            <li>
              <Link
                to="#"
                className="font-manrope hover:text-primary-500 transition-colors"
              >
                Multi Grain Wheat
              </Link>
            </li>
            <li>
              <Link
                to="#"
                className="font-manrope hover:text-primary-500 transition-colors"
              >
                Aashirwaad Wheat Flour
              </Link>
            </li>
            <li>
              <Link
                to="#"
                className="font-manrope hover:text-primary-500 transition-colors"
              >
                Pisbury Wheat Flour
              </Link>
            </li>
            <li>
              <Link
                to="#"
                className="font-manrope hover:text-primary-500 transition-colors"
              >
                Patanjali Wheat Flour
              </Link>
            </li>
          </ul>
        </div>

        {/* Support links */}
        <div>
          <h3 className="font-dm-serif text-heading text-lg mb-4">
            Support Links
          </h3>
          <ul className="space-y-2 text-body text-sm ">
            <li>
              <Link
                to="#"
                className="font-manrope hover:text-primary-500 transition-colors"
              >
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link
                to="#"
                className="font-manrope hover:text-primary-500 transition-colors"
              >
                Returns & Exchange
              </Link>
            </li>
            <li>
              <Link
                to="#"
                className="font-manrope hover:text-primary-500 transition-colors"
              >
                Terms & Conditions
              </Link>
            </li>
            <li>
              <Link
                to="#"
                className="font-manrope hover:text-primary-500 transition-colors"
              >
                FAQ
              </Link>
            </li>
            <li>
              <Link
                to="#"
                className="font-manrope hover:text-primary-500 transition-colors"
              >
                Contact Us
              </Link>
            </li>
          </ul>
        </div>

        {/* Follow us */}
        <div>
          <h3 className="font-dm-serif text-heading text-lg mb-4">
            Get In Touch
          </h3>
          <p className="mb-6">
            <HiOutlineLocationMarker className="inline-block mr-2 " />
            <span className="text-body text-sm font-manrope">Reg & Corporate Office :- 26, 3/1 Old Palasia Near Navneet Tower, Madhya Pradesh 452001, India</span>
          </p>
          <p className="mb-6">
            <HiOutlineLocationMarker className="inline-block mr-2 " />
            <span className="text-body text-sm font-manrope">Store Address :- 101,102, Shell Tower, Sapna Sangeeta Main Road,, Indore, Madhya Pradesh 452001, India</span>
          </p>
          <p>
            <FiPhone className="inline-block mr-2" />
            <span className="text-body text-sm font-manrope">+91 98765 43210</span>
          </p>
        </div>
      </div>

      {/* Footer Bottom -Copyright section */}
      <div className="container mx-auto mt-12 px-4 lg:px-0 border-t border-border pt-6">
        <p className="text-body text-sm font-manrope tracking-tighter text-center">
          Copyright © 2026, GrainMart - Grain Ecommerce. All Rights Reserved. 
        </p>
      </div>
    </footer>
  );
};

export default Footer;
