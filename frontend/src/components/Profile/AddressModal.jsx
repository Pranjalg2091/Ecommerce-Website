import React, { useEffect, useState } from "react";
import { IoClose } from "react-icons/io5";

const AddressModal = ({ isOpen, onClose, onSubmit, initialData = null }) => {
  const [formData, setFormData] = useState({
    label: "Home",
    fullName: "",
    phonenumber: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    country: "India",
    isDefault: false,
  });

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    } else {
      setFormData({
        label: "Home",
        fullName: "",
        phonenumber: "",
        address: "",
        city: "",
        state: "",
        pincode: "",
        country: "India",
        isDefault: false,
      });
    }
  }, [initialData, isOpen]);

  const handleChange = (e) => {
    const { name, value, checked, type } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
      <div className="max-h-[90vh] w-full max-w-md overflow-y-auto rounded-2xl bg-white shadow-2xl">
        {/* Header */}

        <div className="flex items-center justify-between border-b border-border px-5 py-4">
          <h2 className="text-lg font-semibold text-heading">
            {initialData ? "Edit Address" : "Add Address"}
          </h2>
          <button
            onClick={onClose}
            className="rounded-lg p-2 transition hover:bg-neutral-100"
          >
            <IoClose className="text-xl" />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 gap-3 p-5 sm:grid-cols-2">
            {/* ==================================== */}
            {/* Address Label */}
            <div>
              <label className="mb-3 block text-sm font-medium text-heading">
                Address Label
              </label>
              <div className="flex gap-6">
                {["Home", "Work", "Other"].map((item) => (
                  <label
                    key={item}
                    className="group flex cursor-pointer items-center gap-2"
                  >
                    <input
                      type="radio"
                      name="label"
                      value={item}
                      checked={formData.label === item}
                      onChange={handleChange}
                      className="h-4 w-4 accent-primary-500"
                    />
                    <span
                      className={`text-sm transition ${
                        formData.label === item
                          ? "font-semibold text-heading"
                          : "text-body group-hover:text-heading"
                      }`}
                    >
                      {item}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Full Name */}
            <div>
              <label className="mb-2 block text-sm font-medium">
                Full Name
              </label>
              <input
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                className="w-full rounded-lg border border-border bg-white px-3 py-2.5 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/10"
              />
            </div>

            {/* Phone Number */}
            <div>
              <label className="mb-2 block text-sm font-medium">
                Phone Number
              </label>
              <input
                name="phonenumber"
                value={formData.phonenumber}
                onChange={handleChange}
                className="w-full rounded-lg border border-border bg-white px-3 py-2.5 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/10"
              />
            </div>

            {/* Pincode */}
            <div>
              <label className="mb-2 block text-sm font-medium">Pincode</label>
              <input
                name="pincode"
                value={formData.pincode}
                onChange={handleChange}
                className="w-full rounded-lg border border-border bg-white px-3 py-2.5 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/10"
              />
            </div>

            {/* Address */}
            <div>
              <label className="mb-2 block text-sm font-medium">Address</label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="Street address"
                className="w-full rounded-lg border border-border bg-white px-3 py-2.5 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/10"
              />
            </div>

            {/* City */}
            <div>
              <label className="mb-2 block text-sm font-medium">City</label>
              <input
                name="city"
                value={formData.city}
                onChange={handleChange}
                className="w-full rounded-lg border border-border bg-white px-3 py-2.5 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/10"
              />
            </div>

            {/* State */}
            <div>
              <label className="mb-2 block text-sm font-medium">State</label>
              <input
                name="state"
                value={formData.state}
                onChange={handleChange}
                className="w-full rounded-lg border border-border bg-white px-3 py-2.5 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/10"
              />
            </div>

            {/* Country */}
            <div>
              <label className="mb-2 block text-sm font-medium">Country</label>
              <input
                name="country"
                value={formData.country}
                onChange={handleChange}
                className="w-full rounded-lg border border-border bg-white px-3 py-2.5 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/10"
              />
            </div>

            {/* Default Address */}
            <div className="md:col-span-2 flex items-center rounded-lg border border-border bg-neutral-50 px-3 py-3">
              <input
                type="checkbox"
                name="isDefault"
                checked={formData.isDefault}
                onChange={handleChange}
                className="h-4 w-4 accent-primary"
              />
              <span className="ml-3 text-sm font-medium text-heading">
                Set as Default Address
              </span>
            </div>
          </div>

          {/* Save and Cancel Buttons */}
          <div className="flex justify-end gap-3 border-t border-border px-5 py-4">
            <button
              type="button"
              onClick={onClose}
              className="rounded-md bg-error hover:bg-error-hover text-sm text-white px-4 py-2 font-semibold"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="rounded-md bg-primary-500 hover:bg-primary-600 text-sm px-4 py-2 font-semibold text-white"
            >
              {initialData ? "Update Address" : "Save Address"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddressModal;
