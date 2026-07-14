import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changePassword } from "../../redux/slices/authSlice.js";
import { FiCheckCircle } from "react-icons/fi";
import { IoShieldCheckmarkOutline } from "react-icons/io5";
import { MdLockOutline } from "react-icons/md";
import { AiOutlineEdit } from "react-icons/ai";
import ChangePasswordModal from "./ChangePasswordModal.jsx";

const SecurityCard = () => {
  const { user, loading } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const [passwordModalOpen, setPasswordModalOpen] = useState(false);

  const handlePasswordChange = async (data) => {
    const result = await dispatch(changePassword(data));
    if (!result.error) {
      setPasswordModalOpen(false);
      alert("Password changed successfully");
    } else {
      alert(result.payload);
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
            Security
          </h2>
          <p className="mt-1 text-sm text-body">
            Keep your account safe and secure.
          </p>
        </div>
        <button
          onClick={() => setPasswordModalOpen(true)}
          className={actionBtn}
        >
          <AiOutlineEdit />
          Change Password
        </button>
      </div>

      {/* Body */}
      <div className="grid grid-cols-1 lg:grid-cols-2">
        {/* Password */}
        <div className="flex items-start gap-4 border-b border-border p-6">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-neutral-200 bg-neutral-50">
            <MdLockOutline className="text-body text-xl" />
          </div>
          <div>
            <p className="text-sm text-neutral-500">Password</p>
            <p className="mt-1 font-semibold tracking-widest text-heading">
              ••••••••••••
            </p>
            <p className="mt-2 text-xs text-neutral-500">
              Last updated recently
            </p>
          </div>
        </div>

        {/* Account Status */}
        <div className="flex items-start gap-4 p-5 sm:p-6 lg:border-l">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-neutral-200 bg-neutral-50">
            <IoShieldCheckmarkOutline className="text-body text-xl" />
          </div>
          <div>
            <p className="text-sm text-neutral-500">Account Status</p>
            <div className="mt-2 flex items-center gap-2">
              <FiCheckCircle className="text-success" />

              <span className="font-semibold text-success">Protected</span>
            </div>
            <p className="mt-2 text-xs text-neutral-500">
              Your account is secured with password authentication.
            </p>
          </div>
        </div>
      </div>

      {/* ---------------------- Change Password Modal ---------------------- */}
      <ChangePasswordModal
        isOpen={passwordModalOpen}
        onClose={() => setPasswordModalOpen(false)}
        onSubmit={handlePasswordChange}
        loading={loading}
      />
    </div>
  );
};

export default SecurityCard;
