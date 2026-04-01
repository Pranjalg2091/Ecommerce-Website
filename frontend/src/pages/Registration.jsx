import React, { useState } from "react";
import { Link } from "react-router-dom";
import loginImage from "../assets/login-image.jpg";

const Registration = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phonenumber, setPhonenumber] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle registration logic here
    console.log("User Registered:", { name, email, phonenumber, password });
  };

  return (
    <div className="flex">
      <div className="w-full md:w-1/2 flex flex-col justify-center items-center p-8 md:p-12">
        <form
          action=""
          className="w-full max-w-md bg-white p-8 rounded-sm border shadow-sm"
          onSubmit={handleSubmit}
        >
          <h2 className="text-4xl text-heading font-dm-serif text-center mb-6">
            Welcome back!
          </h2>
          <p className="text-center text-body mb-6">
            Please enter your details to Login.
          </p>

          {/* Name Section */}
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block font-manrope font-semibold mb-2"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 border border-border rounded-sm focus:outline-none focus:ring-1 focus:ring-secondary-500"
              placeholder="Enter your name"
            />
          </div>
          {/* Email Section */}
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block font-manrope font-semibold mb-2"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border border-border rounded-sm focus:outline-none focus:ring-1 focus:ring-secondary-500"
              placeholder="Enter your email address"
            />
          </div>

          {/* Email Section */}
          <div className="mb-4">
            <label
              htmlFor="phonenumber"
              className="block font-manrope font-semibold mb-2"
            >
              Phone Number
            </label>
            <input
              type="tel"
              id="phonenumber"
              value={phonenumber}
              onChange={(e) => setPhonenumber(e.target.value)}
              className="w-full px-3 py-2 border border-border rounded-sm focus:outline-none focus:ring-1 focus:ring-secondary-500"
              placeholder="Enter your phone number"
            />
          </div>

          {/* Password section */}
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block font-manrope font-semibold mb-2"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border border-border rounded-sm focus:outline-none focus:ring-1 focus:ring-secondary-500"
              placeholder="Enter your password"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-primary-500 text-white py-2 px-4 rounded-sm hover:bg-primary-600 focus:outline-none"
          >
            Register
          </button>
          <p className="text-center text-body mt-4">
            Already have an account?{" "}
            <Link to="/login" className="text-secondary-600 hover:underline">
              Login
            </Link>
          </p>
        </form>
      </div>

      {/* Right Side Section */}
      <div className="hidden md:block w-1/2 bg-neutral-700">
        <div className="h-full flex flex-col justify-center items-center">
          <img
            src={loginImage}
            alt="Login to Account"
            className="h-[600px] w-full object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default Registration;
