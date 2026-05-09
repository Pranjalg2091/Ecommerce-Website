import React, { use, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import loginImage from "../assets/login-image.jpg";
import { loginUser } from "../redux/slices/authSlice.js";
import { useDispatch, useSelector } from "react-redux";
import { mergeCart } from "../redux/slices/cartSlice.js";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { user, guestId, loading } = useSelector((state) => state.auth);
  const { cart } = useSelector((state) => state.cart);

  // get redirect parameter and check if it checkout or something
  const redirect = new URLSearchParams(location.search).get("redirect") || "/";
  const isCheckoutRedirect = redirect.includes("checkout");

  useEffect(() => {
    if (user) {
      if (cart?.products.length > 0 && guestId) {
        dispatch(mergeCart({ guestId, user })).then(() => {
          navigate(isCheckoutRedirect ? "/checkout" : "/");
        });
      } else {
        navigate(isCheckoutRedirect ? "/checkout" : "/");
      }
    }
  }, [user, guestId, navigate, isCheckoutRedirect, cart, dispatch]);


  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle login logic here
    dispatch(loginUser({ email, password }));
  };

  return (
    <div className="flex">
      <div className="w-full md:w-1/2 flex flex-col justify-center items-center p-8 md:p-12">
        <form
          action=""
          className="w-full max-w-md bg-white p-8 rounded-sm border border-border shadow-sm"
          onSubmit={handleSubmit}
        >
          <h2 className="text-4xl text-heading font-dm-serif text-center mb-6">
            Welcome back!
          </h2>
          <p className="text-center text-body mb-6">
            Please enter your details to Login.
          </p>
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
            {loading ? "Loading..." : "Login"}
          </button>
          <p className="text-center text-body mt-4">
            Don't have an account?{" "}
            <Link
              to={`/registration?redirect=${encodeURIComponent(redirect)}`}
              className="text-secondary-600 hover:underline"
            >
              Register
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

export default Login;
