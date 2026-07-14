import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateProfile } from "../../redux/slices/authSlice.js";
import { FiUser, FiPhone } from "react-icons/fi";
import { TbMail } from "react-icons/tb";
import { HiOutlineCalendar } from "react-icons/hi2";
import { AiOutlineEdit } from "react-icons/ai";

const PersonalInfoCard = () => {
  const { user } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  const [showEditModal, setShowEditModal] = useState(false);

  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phonenumber: user?.phonenumber || "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleProfileUpdate = async () => {
    const result = await dispatch(updateProfile(formData));
    if (!result.error) {
      setShowEditModal(false);
    }
  };

  const actionBtn =
    "inline-flex items-center justify-center gap-2 rounded-lg border border-border bg-white px-4 py-2.5 text-sm font-semibold transition hover:bg-neutral-50";

  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-white shadow-sm">
      {/* Header */}
      <div className="flex flex-col gap-4 border-b border-border px-5 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <div>
          <h2 className="text-lg lg:text-xl font-semibold text-heading">
            Personal Information
          </h2>
          <p className="mt-1 text-sm text-body">
            Your personal account details.
          </p>
        </div>
        <button
          onClick={() => {
            setFormData({
              name: user?.name || "",
              email: user?.email || "",
              phonenumber: user?.phonenumber || "",
            });

            setShowEditModal(true);
          }}
          className="inline-flex items-center gap-2 rounded-sm px-4 py-2 text-sm font-semibold text-white bg-secondary-500 hover:bg-secondary-600"
        >
          <AiOutlineEdit />
          Edit
        </button>
      </div>

      {/* Body */}
      <div className="grid grid-cols-1 lg:grid-cols-2">
        {/* Name */}
        <div className="flex items-start gap-4 border-b border-border p-5 sm:p-6">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-neutral-200 bg-neutral-50">
            <FiUser className="text-body text-xl" />
          </div>
          <div>
            <p className="text-sm text-neutral-500">Full Name</p>
            <p className="mt-1 font-semibold text-heading">{user?.name}</p>
          </div>
        </div>

        {/* Email */}
        <div className="flex items-start gap-4 border-b border-border p-5 sm:p-6 md:border-l">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-neutral-200 bg-neutral-50">
            <TbMail className="text-body text-xl" />
          </div>
          <div>
            <p className="text-sm text-neutral-500">Email Address</p>
            <p className="mt-1 font-semibold text-heading break-all">
              {user?.email}
            </p>
          </div>
        </div>

        {/* Phone */}
        <div className="flex items-start gap-4 p-5 sm:p-6">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-neutral-200 bg-neutral-50">
            <FiPhone className="text-body text-xl" />
          </div>
          <div>
            <p className="text-sm text-neutral-500">Phone Number</p>
            <p className="mt-1 font-semibold text-heading">
              {user?.phonenumber || "Not Added"}
            </p>
          </div>
        </div>

        {/* Member Since */}
        <div className="flex items-start gap-4 p-5 sm:p-6 md:border-l">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-neutral-200 bg-neutral-50">
            <HiOutlineCalendar className="text-body text-xl" />
          </div>
          <div>
            <p className="text-sm text-neutral-500">Member Since</p>
            <p className="mt-1 font-semibold text-heading">
              {user?.createdAt
                ? new Date(user.createdAt).toLocaleDateString("en-IN", {
                    month: "long",
                    year: "numeric",
                  })
                : "Recently Joined"}
            </p>
          </div>
        </div>
        {/* Member Since Ends Here */}
      </div>

      {/* ---------------------- Edit Modal ---------------------- */}
      {showEditModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="w-full max-w-md rounded-2xl bg-white shadow-lg">
            <div className="border-b border-border px-5 py-4">
              <h2 className="text-lg font-semibold">
                Edit Personal Information
              </h2>
            </div>
            <div className="space-y-4 px-5 py-4">
              {/* Full Name */}
              <div>
                <label className="mb-1 block text-sm font-medium">
                  Full Name
                </label>
                <input
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full h-11 rounded-md border border-border px-4 outline-none focus:border-primary"
                />
              </div>

              {/* Email */}
              <div>
                <label className="mb-1 block text-sm font-medium">Email</label>
                <input
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full h-11 rounded-md border border-border px-4 outline-none focus:border-primary"
                />
              </div>

              {/* Phone Number */}
              <div>
                <label className="mb-1 block text-sm font-medium">
                  Phone Number
                </label>
                <input
                  name="phonenumber"
                  value={formData.phonenumber}
                  onChange={handleChange}
                  className="w-full h-11 rounded-md border border-border px-4 outline-none focus:border-primary"
                />
              </div>
            </div>
            {/* Buttons */}
            <div className="flex justify-end gap-3 border-t border-border px-5 py-4">
              <button
                onClick={() => setShowEditModal(false)}
                className="h-10 rounded-md px-5 text-sm font-medium bg-error text-white hover:bg-error-hover transition"
              >
                Cancel
              </button>
              <button
                onClick={handleProfileUpdate}
                className="h-10 rounded-md bg-primary-500 px-5 text-sm font-medium text-white hover:bg-primary-600 transition"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PersonalInfoCard;
