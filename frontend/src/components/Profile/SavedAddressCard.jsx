import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addAddress,
  fetchAddresses,
  updateAddress,
} from "../../redux/slices/authSlice.js";
import { FiPhone, FiPlus } from "react-icons/fi";
import { AiOutlineEdit, AiOutlineHome } from "react-icons/ai";
import { HiOutlineLocationMarker } from "react-icons/hi";
import AddressModal from "./AddressModal.jsx";

const SavedAddressCard = () => {
  const { user, addresses } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);
  const [editingAddress, setEditingAddress] = useState(null);

  const handleAddAddress = () => {
    setEditingAddress(null);
    setIsAddressModalOpen(true);
  };

  const handleEditAddress = (address) => {
    setEditingAddress(address);
    setIsAddressModalOpen(true);
  };

  const handleCloseAddressModal = () => {
    setEditingAddress(null);
    setIsAddressModalOpen(false);
  };

  const handleSaveAddress = async (addressData) => {
    if (editingAddress) {
      await dispatch(
        updateAddress({
          id: editingAddress._id,
          addressData,
        }),
      );
    } else {
      await dispatch(addAddress(addressData));
    }
    dispatch(fetchAddresses());
    handleCloseAddressModal();
  };
  
  const actionBtn =
    "inline-flex items-center justify-center gap-2 rounded-lg border border-border bg-white px-4 py-2.5 text-sm font-semibold transition hover:bg-neutral-50";


  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-white shadow-sm">
      {/* Header */}
      <div className="flex flex-col gap-4 border-b border-border px-5 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <div>
          <h2 className="text-lg lg:text-xl font-semibold text-heading">
            Saved Addresses
          </h2>
          <p className="mt-1 text-sm text-body">
            Manage your delivery locations.
          </p>
        </div>
        <button onClick={handleAddAddress} className={actionBtn}>
          <FiPlus />
          Add New
        </button>
      </div>

      {/* Address Card */}
      <div className="p-6">
        {addresses.length === 0 ? (
          <div className="rounded-xl border border-dashed border-border p-10 text-center">
            <AiOutlineHome className="mx-auto text-5xl text-neutral-300" />
            <h3 className="mt-4 text-lg font-semibold text-heading">
              No Address Added
            </h3>
            <p className="mt-2 text-body">Add your first delivery address.</p>
            <button className={actionBtn}>
              <FiPlus />
              Add Address
            </button>
          </div>
        ) : (
          <div className="space-y-5">
            {addresses.map((address) => (
              <div
                key={address._id}
                className="rounded-xl border border-border p-5 transition hover:border-primary/30 hover:shadow-sm"
              >
                {/* Top */}
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-neutral-200 bg-neutral-50">
                      <AiOutlineHome className="text-body text-xl" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-heading">
                        {address.label}
                      </h3>
                      {address.isDefault && (
                        <span className="mt-1 inline-flex rounded-full bg-green-100 px-2.5 py-1 text-xs font-semibold text-success">
                          Default
                        </span>
                      )}
                    </div>
                  </div>
                  <button
                    onClick={() => handleEditAddress(address)}
                    className={actionBtn}
                  >
                    <AiOutlineEdit />
                    Edit Address
                  </button>
                </div>

                {/* Address Info */}
                <div className="mt-5 space-y-2 text-sm text-body">
                  <p className="font-semibold text-heading">
                    {address.fullName}
                  </p>
                  <div className="flex items-start gap-2">
                    <HiOutlineLocationMarker className="mt-1 shrink-0 text-neutral-500" />
                    <p>
                      {address.address}, {address.city}, {address.state} -{" "}
                      {address.pincode}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <FiPhone className="text-neutral-500" />
                    <p>{address.phonenumber}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ---------------------- Address Modal ---------------------- */}
      <AddressModal
        isOpen={isAddressModalOpen}
        onClose={handleCloseAddressModal}
        onSubmit={handleSaveAddress}
        initialData={editingAddress}
      />
    </div>
  );
};

export default SavedAddressCard;
