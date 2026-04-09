import React from "react";
import { HiOutlineLocationMarker, HiOutlineMail } from "react-icons/hi";
import { FiPhone } from "react-icons/fi";

const ContactUsPage = () => {
  return (
    <div className="min-h-screen py-16 px-6 font-manrope">
      <div className="max-w-7xl mx-auto">
        {/* Heading */}
        <div className="text-center mb-14">
          <h1 className="text-3xl font-dm-serif text-heading mb-4">
            Contact Us
          </h1>
          <p className="text-body text-base">
            We'd love to hear from you. Reach out anytime.
          </p>
        </div>

        {/* Top Section */}
        <div className="grid md:grid-cols-2 gap-8 items-start mb-16">
          {/* LEFT - Contact Form */}
          <div className="p-8 rounded-lg border border-border">
            <h2 className="text-xl font-bold mb-6 font-manrope text-heading">
              Send a Message
            </h2>

            <form className="space-y-5">
              <input
                type="text"
                placeholder="Your Name"
                className="w-full p-3 border border-border rounded-sm"
              />

              <input
                type="email"
                placeholder="Your Email"
                className="w-full p-3 border border-border rounded-sm"
              />

              <textarea
                rows="5"
                placeholder="Your Message"
                className="w-full p-3 border border-border rounded-sm"
              ></textarea>

              <button className="w-full bg-primary-500 text-white py-3 rounded-sm hover:bg-primary-600 transition">
                Send Message
              </button>
            </form>
          </div>

          {/* RIGHT - Contact Info */}
          <div className="bg-secondary-500/10 p-8 rounded-lg">
            <h3 className=" text-heading font-bold text-xl mb-6">
              Get In Touch
            </h3>

            <div className="space-y-6 text-base font-manrope text-body leading-relaxed">
              <p>
                Got a question? we had love to hear from you. send us a message and we will respond as soon as possible.
              </p>

              <p>
                <HiOutlineLocationMarker className="inline-block mr-2 text-xl" />
                <span className="font-semibold">Reg & Corporate Office :- </span>
                26, 3/1 Old Palasia Near Navneet Tower, Madhya Pradesh 452001,
                India
              </p>

              <p>
                <HiOutlineLocationMarker className="inline-block mr-2 text-xl" />
                <span className="font-semibold">Store Address :- </span>101,102,
                Shell Tower, Sapna Sangeeta Main Road, Indore, Madhya Pradesh
                452001, India
              </p>

              <p>
                <FiPhone className="inline-block mr-2 text-xl" />
                <span className="font-semibold">Call Us :- </span>+91 98765
                43210
              </p>

              <p>
                <HiOutlineMail className="inline-block mr-2 text-xl" />
                <span className="font-semibold">Email :- </span>
                support@grainmart.com
              </p>
            </div>
          </div>
        </div>

        {/* MAP SECTION */}
        <div className="mt-16">
          <div className="rounded-lg overflow-hidden border border-border">
            <iframe
              title="location"
              src="https://www.google.com/maps?q=Sapna%20Sangeeta%20Indore&output=embed"
              className="w-full h-[400px] border-0"
              allowFullScreen=""
              loading="lazy"
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUsPage;
