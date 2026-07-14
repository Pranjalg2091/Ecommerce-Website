import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchAddresses, logout } from "../redux/slices/authSlice.js";
import { clearCart } from "../redux/slices/cartSlice.js";
import { FiUser } from "react-icons/fi";
import {
  IoArrowForward,
  IoArrowBack,
  IoShieldCheckmarkOutline,
} from "react-icons/io5";
import { HiOutlineLocationMarker } from "react-icons/hi";
import RecentOrders from "../components/Profile/RecentOrders.jsx";
import PersonalInfoCard from "../components/Profile/PersonalInfoCard.jsx";
import SavedAddressCard from "../components/Profile/SavedAddressCard.jsx";
import SecurityCard from "../components/Profile/SecurityCard.jsx";
import Breadcrumbs from "../components/Common/Breadcrumbs.jsx";

const Profile = () => {
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const personalInfoRef = useRef(null);
  const savedAddressRef = useRef(null);
  const securityRef = useRef(null);

  const [activeSection, setActiveSection] = useState("personal");

  const scrollToSection = (ref) => {
    ref.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }
    dispatch(fetchAddresses());
  }, [dispatch, navigate, user]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          switch (entry.target.dataset.section) {
            case "personal":
              setActiveSection("personal");
              break;

            case "address":
              setActiveSection("address");
              break;

            case "security":
              setActiveSection("security");
              break;

            default:
              break;
          }
        });
      },
      {
        threshold: 0.4,
      },
    );
    const sections = [
      personalInfoRef.current,
      savedAddressRef.current,
      securityRef.current,
    ];
    sections.forEach((section) => {
      if (section) observer.observe(section);
    });
    return () => observer.disconnect();
  }, []);

  const handleLogout = () => {
    dispatch(logout());
    dispatch(clearCart());
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-2 py-4 lg:py-8">
        <Breadcrumbs
          variant="light"
          items={[
            {
              label: "Profile",
            },
          ]}
        />

        {/* Header */}
        <div className="mb-8 mt-4">
          <h1 className="text-xl lg:text-3xl font-dm-serif text-heading">
            My Account
          </h1>

          <p className="mt-2 text-body font-manrope">
            Manage your profile, addresses and orders from one place.
          </p>
        </div>

        {/* ########################## LEFT SECTION ########################## */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-4 xl:col-span-3 lg:self-start">
            <div className="rounded-2xl border border-border bg-white shadow-sm lg:sticky lg:top-28">
              {/* Profile Header */}
              <div className="p-6 text-center border-b border-border">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-neutral-100 text-neutral-400 text-2xl font-semibold">
                  <FiUser className="h-6 w-6 text-primary" />
                </div>

                <h2 className="mt-3 text-2xl font-semibold text-heading">
                  {user?.name}
                </h2>

                <p className="mt-1 text-body">{user?.email}</p>
              </div>

              {/* Menu */}
              <div className="px-3 py-2">
                {/* Personal Information */}
                <button
                  onClick={() => scrollToSection(personalInfoRef)}
                  className={`group flex w-full items-start justify-between rounded-xl px-4 py-4 text-left transition-all duration-200
                    ${
                      activeSection === "personal"
                        ? "bg-primary-50 border-l-4 border-primary pl-3"
                        : "hover:bg-neutral-50"
                    }`}
                >
                  <div className="flex items-start gap-3">
                    <FiUser
                      size={18}
                      className={`mt-1 shrink-0 ${
                        activeSection === "personal"
                          ? "text-primary"
                          : "text-neutral-600"
                      }`}
                    />
                    <div className="flex-1">
                      <p className="text-base font-semibold text-heading">
                        Personal Information
                      </p>
                      <p className="mt-1 text-sm leading-5 text-body">
                        Manage your account details
                      </p>
                    </div>
                  </div>
                  <IoArrowForward
                    size={18}
                    className={`mt-1 transition-transform duration-200 group-hover:translate-x-1 ${
                      activeSection === "personal"
                        ? "text-primary"
                        : "text-neutral-400"
                    }`}
                  />
                </button>

                {/* Saved Addresses */}
                <button
                  onClick={() => scrollToSection(savedAddressRef)}
                  className={`group flex w-full items-start justify-between rounded-xl px-4 py-4 text-left transition-all duration-200
                    ${
                      activeSection === "address"
                        ? "bg-primary-50 border-l-4 border-primary pl-3"
                        : "hover:bg-neutral-50"
                    }`}
                >
                  <div className="flex items-start gap-3">
                    <HiOutlineLocationMarker
                      size={18}
                      className={`mt-1 shrink-0 ${
                        activeSection === "address"
                          ? "text-primary"
                          : "text-neutral-600"
                      }`}
                    />
                    <div className="flex-1">
                      <p className="text-base font-semibold text-heading">
                        Saved Addresses
                      </p>
                      <p className="mt-1 text-sm leading-5 text-body">
                        Manage your saved addresses
                      </p>
                    </div>
                  </div>
                  <IoArrowForward
                    size={18}
                    className={`mt-1 transition-transform duration-200 group-hover:translate-x-1 ${
                      activeSection === "address"
                        ? "text-primary"
                        : "text-neutral-400"
                    }`}
                  />
                </button>

                {/* Security */}
                <button
                  onClick={() => scrollToSection(securityRef)}
                  className={`group flex w-full items-start justify-between rounded-xl px-4 py-4 text-left transition-all duration-200
                    ${
                      activeSection === "security"
                        ? "bg-primary-50 border-l-4 border-primary pl-3"
                        : "hover:bg-neutral-50"
                    }`}
                >
                  <div className="flex items-start gap-3">
                    <IoShieldCheckmarkOutline
                      size={18}
                      className={`mt-1 shrink-0 ${
                        activeSection === "security"
                          ? "text-primary"
                          : "text-neutral-600"
                      }`}
                    />
                    <div className="flex-1">
                      <p className="text-base font-semibold text-heading">
                        Security
                      </p>
                      <p className="mt-1 text-sm leading-5 text-body">
                        Manage your security settings
                      </p>
                    </div>
                  </div>
                  <IoArrowForward
                    size={18}
                    className={`mt-1 transition-transform duration-200 group-hover:translate-x-1 ${
                      activeSection === "security"
                        ? "text-primary"
                        : "text-neutral-400"
                    }`}
                  />
                </button>
              </div>

              <div className="border-t border-border p-5">
                <button
                  onClick={handleLogout}
                  className="w-full bg-error hover:bg-error-hover text-white font-manrope font-semibold py-2 px-4 rounded-lg"
                >
                  Logout
                </button>
              </div>
            </div>
          </div>

          {/* ########################## RIGHT SECTION ########################## */}
          <div className="lg:col-span-8 space-y-8 lg:space-y-8">
            {/* ------------------------------ Personal Information ------------------------------ */}
            <div
              ref={personalInfoRef}
              data-section="personal"
              className="scroll-mt-28"
            >
              <PersonalInfoCard />
            </div>
            {/* ------------------------------ Saved Addresses ------------------------------ */}
            <div
              ref={savedAddressRef}
              data-section="address"
              className="scroll-mt-28"
            >
              <SavedAddressCard />
            </div>

            {/* ------------------------------ Security ------------------------------ */}
            <div
              ref={securityRef}
              data-section="security"
              className="scroll-mt-28"
            >
              <SecurityCard />
            </div>

            {/* ------------------------------- Recent Orders ------------------------------ */}
            <RecentOrders />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
