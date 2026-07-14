import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductDetails } from "../../redux/slices/productSlice.js";
import { deleteProduct } from "../../redux/slices/adminProductSlice.js";
import { toast } from "sonner";
import {
  IoArrowBack,
  IoCalendarNumberOutline,
  IoCheckmarkDone,
} from "react-icons/io5";
import { AiOutlineEdit, AiOutlineDelete } from "react-icons/ai";
import { FiPackage } from "react-icons/fi";
import { LuWheat, LuPackageSearch } from "react-icons/lu";
import { MdContentCopy } from "react-icons/md";
import Skeleton from "../Common/Skeleton.jsx";
import Breadcrumbs from "../Common/Breadcrumbs.jsx";

const AdminProductDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { selectedProduct, loading, error } = useSelector(
    (state) => state.products,
  );

  const [mainImage, setMainImage] = useState("");
  const [copied, setCopied] = useState(false);
  const [zoomImage, setZoomImage] = useState(null);
  const [deleteModal, setDeleteModal] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");
  const [deleting, setDeleting] = useState(false);

  const stockStatus =
    selectedProduct?.countInStock > 20
      ? {
          label: "In Stock",
          bg: "bg-green-50",
          border: "border-green-200",
          text: "text-success",
        }
      : selectedProduct?.countInStock > 0
        ? {
            label: "Low Stock",
            bg: "bg-yellow-50",
            border: "border-yellow-200",
            text: "text-warning",
          }
        : {
            label: "Out of Stock",
            bg: "bg-red-50",
            border: "border-red-200",
            text: "text-error",
          };

  useEffect(() => {
    if (id) dispatch(fetchProductDetails(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (selectedProduct?.images?.length > 0) {
      setMainImage(selectedProduct.images[0].url);
    }
  }, [selectedProduct]);

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") {
        setZoomImage(null);
        setDeleteModal(false);
      }
    };
    window.addEventListener("keydown", handleEsc);
    return () => {
      window.removeEventListener("keydown", handleEsc);
    };
  }, []);
  const handleDelete = async () => {
    setDeleting(true);
    await dispatch(deleteProduct(id));
    toast.success("Product deleted");
    setDeleting(false);
    navigate("/admin/products");
  };

  const copySKU = async () => {
    await navigator.clipboard.writeText(selectedProduct.sku);
    setCopied(true);
    toast.success("SKU copied");
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  if (loading) {
    return <Skeleton />;
  }

  if (error) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="max-w-md rounded-2xl border border-red-200 bg-red-50 p-8 text-center">
          <h2 className="text-xl font-semibold text-error">
            Unable to load product
          </h2>
          <p className="mt-3 text-sm text-error">{error}</p>
          <button
            onClick={() => dispatch(fetchProductDetails(id))}
            className="mt-6 rounded-xl bg-primary-500 px-6 py-3 text-white"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-[1500px] px-6 py-8 font-manrope">
      {/* ================= BREADCRUMBS ================= */}
      <Breadcrumbs
        showHome={false}
        variant="light"
        className="mb-6"
        items={[
          {
            label: "Dashboard",
            href: "/admin",
          },
          {
            label: "Products",
            href: "/admin/products",
          },
          {
            label: selectedProduct?.name || "Product Details",
          },
        ]}
      />
      {selectedProduct && (
        <>
          {/* HEADER */}
          {/* ================= HEADER ================= */}
          {/* <div className="mb-8 flex items-center justify-between">
            <div className="flex items-center gap-4"></div> */}

          {/* Edit and Delete Button */}
          {/* <div className="flex gap-4">
              <button
                onClick={() => navigate(`/admin/products/${id}/edit`)}
                className="flex items-center gap-2 rounded-md bg-secondary-500 text-white font-medium px-5 py-2.5 hover:bg-secondary-600"
              >
                <AiOutlineEdit className="text-lg font-medium" />
                Edit
              </button>
              <button
                onClick={() => setDeleteModal(true)}
                className="flex items-center gap-2 rounded-md bg-error px-5 py-2.5 text-white font-medium hover:bg-error-hover"
              >
                <AiOutlineDelete className="text-lg font-medium" />
                Delete
              </button>
            </div>
          </div> */}

          {/* ================= HERO HEADER ================= */}
          <div className="mb-8 overflow-hidden rounded-xl border border-border bg-gradient-to-br from-white via-white to-primary-50 shadow-sm">
            <div className="flex flex-col justify-between gap-8 p-8 xl:flex-row xl:items-start">
              {/* LEFT */}
              <div className="flex items-start gap-5">
                {/* <button
                  onClick={() => window.history.back()}
                  className="mt-1 flex h-11 w-11 items-center justify-center rounded-xl border border-border hover:bg-neutral-100 transition"
                >
                  <IoArrowBack />
                </button> */}
                <div>
                  <h1 className="font-dm-serif text-3xl leading-tight tracking-tight text-heading">
                    {selectedProduct.name}
                  </h1>
                  <div className="mt-3 flex flex-wrap items-center gap-3">
                    <span className="rounded-full bg-secondary-100 px-3 py-1 text-xs font-semibold text-secondary-600">
                      {selectedProduct.category}
                    </span>
                    {selectedProduct.countInStock > 20 && (
                      <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-success">
                        In Stock
                      </span>
                    )}
                    {selectedProduct.countInStock > 0 &&
                      selectedProduct.countInStock <= 20 && (
                        <span className="rounded-full bg-yellow-100 px-3 py-1 text-xs font-semibold text-warning">
                          Low Stock
                        </span>
                      )}
                    {selectedProduct.countInStock <= 0 && (
                      <span className="rounded-full bg-red-100 px-3 py-1 text-xs font-semibold text-error">
                        Out of Stock
                      </span>
                    )}
                  </div>

                  {/* Description */}
                  {selectedProduct.description && (
                    <p className="mt-5 max-w-3xl text-[15px] leading-7 text-body line-clamp-2">
                      {selectedProduct.description ||
                        "No description available for this product."}
                    </p>
                  )}
                </div>
              </div>

              {/* Edit and Delete Button */}
              <div className="flex gap-4">
                <button
                  onClick={() => navigate(`/admin/products/${id}/edit`)}
                  className="flex items-center gap-2 rounded-md bg-secondary-500 text-white font-medium px-5 py-2.5 hover:bg-secondary-600"
                >
                  <AiOutlineEdit className="text-lg font-medium" />
                  Edit
                </button>
                <button
                  onClick={() => setDeleteModal(true)}
                  className="flex items-center gap-2 rounded-md bg-error px-5 py-2.5 text-white font-medium hover:bg-error-hover"
                >
                  <AiOutlineDelete className="text-lg font-medium" />
                  Delete
                </button>
              </div>

              {/* Edit and Delete Buttons */}
              {/* <div className="flex flex-col gap-4 xl:min-w-[220px]">
                <button
                  title="Edit Product"
                  onClick={() => navigate(`/admin/products/${id}/edit`)}
                  className="flex w-full items-center justify-center h-12 gap-2 rounded-md bg-secondary-500 font-semibold text-white hover:bg-secondary-600"
                >
                  <AiOutlineEdit className="text-lg font-medium" />
                  Edit
                </button>
                <button
                  title="Delete Product"
                  onClick={() => setDeleteModal(true)}
                  className="flex w-full items-center justify-center h-12 gap-2 rounded-md bg-error font-semibold text-white hover:bg-error-hover"
                >
                  <AiOutlineDelete className="text-lg font-medium" />
                  Delete
                </button>
              </div> */}
            </div>
          </div>

          {/* ================= QUICK STATS ================= */}
          {/* <div className="mb-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <div className="rounded-2xl border border-border bg-white p-5 shadow-sm">
              <p className="text-xs uppercase tracking-wider text-body">
                Stock
              </p>
              <p className="mt-3 text-3xl font-bold text-heading">
                {selectedProduct.countInStock}
              </p>
              <p className="mt-1 text-sm text-body">Units Available</p>
            </div>
            <div className="rounded-2xl border border-border bg-white p-5 shadow-sm">
              <p className="text-xs uppercase tracking-wider text-body">
                Variants
              </p>
              <p className="mt-3 text-3xl font-bold text-heading">
                {selectedProduct.sizes?.length || 0}
              </p>
              <p className="mt-1 text-sm text-body">Weight Options</p>
            </div>
            <div className="rounded-2xl border border-border bg-white p-5 shadow-sm">
              <p className="text-xs uppercase tracking-wider text-body">
                Images
              </p>
              <p className="mt-3 text-3xl font-bold text-heading">
                {selectedProduct.images?.length || 0}
              </p>
              <p className="mt-1 text-sm text-body">Gallery Images</p>
            </div>
            <div className="rounded-2xl border border-border bg-white p-5 shadow-sm">
              <p className="text-xs uppercase tracking-wider text-body">
                Features
              </p>
              <p className="mt-3 text-3xl font-bold text-heading">
                {selectedProduct.features?.length || 0}
              </p>
              <p className="mt-1 text-sm text-body">Product Benefits</p>
            </div>
          </div> */}

          {/* TOP GRID */}
          <div className="grid gap-8 xl:grid-cols-[480px_minmax(0,1fr)] items-start">
            {/* LEFT: IMAGES */}
            <div className="overflow-hidden rounded-xl border border-border bg-white shadow-sm transition-all duration-300">
              <div className="">
                {mainImage ? (
                  <img
                    src={mainImage}
                    alt="product"
                    onClick={() => setZoomImage(mainImage)}
                    className="h-[340px] md:h-[560px] w-full cursor-zoom-in rounded-t-xl object-cover transition duration-500 hover:scale-[1.04]"
                  />
                ) : (
                  <div className="flex h-[340px] md:h-[560px] items-center justify-center bg-neutral-100">
                    <p className="text-body">No Image Available</p>
                  </div>
                )}
              </div>
              {/* Thumbnail Images */}
              <div className="grid grid-cols-5 gap-3 border-t border-border px-5 py-5">
                {selectedProduct.images.map((img, i) => (
                  <img
                    key={i}
                    src={img.url}
                    onClick={() => setMainImage(img.url)}
                    onDoubleClick={() => setZoomImage(img.url)}
                    className={`aspect-square w-full cursor-pointer rounded-lg object-cover border transition-all duration-300
                      ${
                        mainImage === img.url
                          ? "border-primary-500 ring-2 ring-primary-100"
                          : "border-border hover:border-primary-300 hover:shadow-md"
                      }`}
                  />
                ))}
              </div>
              {/* Images Footer */}
              <div className="flex items-center justify-between border-t border-border bg-neutral-50 px-6 py-4">
                <div>
                  <p className="font-semibold text-heading">
                    {selectedProduct.images.length} Images
                  </p>
                  <p className="text-xs text-body mt-1">
                    Click thumbnail to preview image
                  </p>
                </div>
                <div className="flex gap-2">
                  {selectedProduct.images.map((_, i) => (
                    <span
                      key={i}
                      className={`h-2.5 w-2.5 rounded-full transition
                        ${
                          i ===
                          selectedProduct.images.findIndex(
                            (img) => img.url === mainImage,
                          )
                            ? "bg-primary-500"
                            : "bg-neutral-300"
                        }`}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* RIGHT: INFO */}
            <div className="space-y-6">
              {/* BASIC INFO */}
              {/* ================= PRODUCT INFORMATION ================= */}
              <div className="overflow-hidden rounded-xl border border-border bg-white shadow-sm">
                {/* Heading */}
                <div className="border-b border-border px-6 py-5">
                  <h2 className="text-lg font-semibold tracking-tight text-heading">
                    Product Information
                  </h2>
                  <p className="mt-1 text-sm text-body">
                    Everything an administrator needs to manage this product.
                  </p>
                </div>

                {/* Body */}
                <div className="grid md:grid-cols-2">
                  {/* SKU */}
                  <div className="border-b border-r border-border p-5 md:p-6">
                    <p className="text-xs uppercase tracking-wider text-body">
                      SKU
                    </p>
                    <div className="mt-2 flex items-center gap-2">
                      <span className="font-medium text-lg text-heading mr-8">
                        {selectedProduct.sku}
                      </span>
                      <button
                        title="Copy SKU"
                        onClick={copySKU}
                        className="rounded-md border border-border p-2 transition hover:bg-neutral-100"
                      >
                        {copied ? (
                          <IoCheckmarkDone className="text-success text-xl" />
                        ) : (
                          <MdContentCopy className="text-xl" />
                        )}
                      </button>
                    </div>
                  </div>
                  {/* CATEGORY */}
                  <div className="border-b border-border p-5 md:p-6">
                    <p className="text-xs uppercase tracking-wider text-body">
                      Category
                    </p>
                    <p className="mt-2 text-lg font-medium text-heading">
                      {selectedProduct.category}
                    </p>
                  </div>
                  {/* STOCK */}
                  <div className="border-b border-r border-border p-5 md:p-6">
                    <p className="text-xs uppercase tracking-wider text-body">
                      Available Stock
                    </p>
                    <p className="mt-2 text-lg font-medium text-heading">
                      {selectedProduct.countInStock} in stock
                    </p>
                  </div>
                  {/* IMAGES */}
                  <div className="border-b border-border p-5 md:p-6">
                    <p className="text-xs uppercase tracking-wider text-body">
                      Images
                    </p>
                    <p className="mt-2 text-lg font-medium text-heading">
                      {selectedProduct.images?.length || 0} images
                    </p>
                  </div>
                  {/* CREATED */}
                  <div className="border-r border-border p-5 md:p-6">
                    <p className="text-xs uppercase tracking-wider text-body">
                      Created On
                    </p>
                    <p className="mt-2 text-lg font-medium text-heading">
                      {new Date(selectedProduct.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  {/* UPDATED */}
                  <div className="p-5 md:p-6">
                    <p className="text-xs uppercase tracking-wider text-body">
                      Last Updated
                    </p>
                    <p className="mt-2 text-lg font-medium text-heading">
                      {selectedProduct.updatedAt
                        ? new Date(
                            selectedProduct.updatedAt,
                          ).toLocaleDateString()
                        : "--"}
                    </p>
                  </div>
                </div>
              </div>

              {/* VARIANTS */}
              {/* ================= VARIANTS ================= */}
              <div className="overflow-hidden rounded-xl border border-border bg-white shadow-sm">
                <div className="flex items-center justify-between border-b border-border px-6 py-5">
                  <div>
                    <h2 className="text-lg font-semibold text-heading">
                      Product Variants
                    </h2>
                    <p className="mt-1 text-sm text-body">
                      Pricing and weight options.
                    </p>
                  </div>
                  <div className="rounded-full bg-primary-50 border border-primary-200 px-3 py-1 text-xs font-semibold text-primary-700">
                    {selectedProduct.sizes.length} Variants
                  </div>
                </div>
                <div className="divide-y divide-border">
                  {selectedProduct.sizes?.length > 0 ? (
                    selectedProduct.sizes.map((size, index) => {
                      const discount =
                        size.originalPrice > 0
                          ? Math.round(
                              ((size.originalPrice - size.price) /
                                size.originalPrice) *
                                100,
                            )
                          : 0;

                      return (
                        <div
                          key={index}
                          className="flex flex-wrap items-center justify-between gap-6 p-5 md:p-6 transition hover:bg-neutral-50"
                        >
                          <div>
                            <p className="text-xs uppercase tracking-wider text-body">
                              Weight
                            </p>
                            <h3 className="mt-2 text-lg font-medium text-heading">
                              {size.weight}
                            </h3>
                          </div>

                          <div>
                            <p className="text-xs uppercase tracking-wider text-body">
                              Selling Price
                            </p>
                            <p className="mt-2 text-lg font-medium text-heading">
                              ₹{size.price}
                            </p>
                          </div>

                          <div>
                            <p className="text-xs uppercase tracking-wider text-body">
                              Original
                            </p>
                            <p className="mt-2 text-lg line-through text-body">
                              ₹{size.originalPrice}
                            </p>
                          </div>

                          <div>
                            {discount > 0 ? (
                              <span className="rounded-full border border-green-200 bg-green-50 px-3 py-1 text-sm font-semibold text-green-700">
                                {discount}% OFF
                              </span>
                            ) : (
                              <span className="text-body">--</span>
                            )}
                          </div>
                        </div>
                      );
                    })
                  ) : (
                    <div className="p-10 text-center">
                      <p className="text-body">No variants available.</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* ================= PRODUCT TAB DETAILS ================= */}
          <div className="mt-10 overflow-hidden rounded-xl border border-border bg-white shadow-sm">
            {/* HEADER */}
            <div className="border-b border-border px-8 py-6">
              <h2 className="text-lg font-semibold text-heading">
                Product Details
              </h2>
              <p className="mt-1 text-sm text-body">
                View complete product information.
              </p>
            </div>

            {/* TABS */}
            <div className="flex flex-wrap gap-3 border-b border-border px-8 py-4">
              {["overview", "features", "nutrition", "storage", "grinding"].map(
                (tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`rounded-xl px-5 py-2.5 text-sm font-semibold transition-all duration-300
                      ${
                        activeTab === tab
                          ? "bg-primary-500 text-white shadow"
                          : "border border-border bg-white hover:bg-neutral-50"
                      }`}
                  >
                    {tab.charAt(0).toUpperCase() + tab.slice(1)}
                  </button>
                ),
              )}
            </div>

            {/* BODY */}
            <div className="p-6 md:p-8">
              {/* OVERVIEW */}
              {activeTab === "overview" && (
                <p className="leading-8 text-body">
                  {selectedProduct.description}
                </p>
              )}
              {/* FEATURES */}
              {activeTab === "features" && (
                <div className="flex flex-wrap gap-3">
                  {selectedProduct.features?.length ? (
                    selectedProduct.features.map((feature, index) => (
                      <span
                        key={index}
                        className="rounded-full border border-primary-200 bg-primary-50 px-4 py-2 text-sm font-medium text-primary-700"
                      >
                        {feature}
                      </span>
                    ))
                  ) : (
                    <p className="text-body">No features available.</p>
                  )}
                </div>
              )}
              {/* NUTRITION */}
              {activeTab === "nutrition" && (
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                  {Object.entries(selectedProduct.nutrition || {}).map(
                    ([key, value]) => (
                      <div
                        key={key}
                        className="rounded-xl border border-border bg-neutral-50 p-5"
                      >
                        <p className="text-xs uppercase tracking-wide text-body">
                          {key}
                        </p>
                        <p className="mt-3 text-lg font-semibold text-heading">
                          {value}
                        </p>
                      </div>
                    ),
                  )}
                </div>
              )}
              {/* STORAGE */}
              {activeTab === "storage" && (
                <div className="rounded-xl bg-neutral-50 p-5 md:p-6">
                  <p className="leading-8 text-body">
                    {selectedProduct.storage ||
                      "Storage information unavailable."}
                  </p>
                </div>
              )}
              {/* GRINDING SLOTS */}
              {activeTab === "grinding" && (
                <div className="flex flex-wrap gap-3">
                  {selectedProduct.grindingSlots?.length ? (
                    selectedProduct.grindingSlots.map((slot, index) => (
                      <span
                        key={index}
                        className="rounded-full border border-secondary-200 bg-secondary-50 px-4 py-2 text-sm font-medium text-secondary-700"
                      >
                        {slot}
                      </span>
                    ))
                  ) : (
                    <p className="text-body">No grinding slots available.</p>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* ================= Zoom Image ================= */}
          {zoomImage && (
            <div
              onClick={() => setZoomImage(null)}
              className="fixed inset-0 z-[999] flex items-center justify-center bg-black/90 p-10 backdrop-blur-sm transition-all duration-300"
            >
              <img
                src={zoomImage}
                onDoubleClick={() => setZoomImage(null)}
                className="max-h-[90vh] max-w-[90vw] rounded-2xl shadow-2xl transition-all duration-300 scale-100"
              />
            </div>
          )}

          {/* ================= Delete Modal ================= */}
          {deleteModal && (
            <div
              onClick={() => setDeleteModal(false)}
              className="fixed inset-0 z-[999] flex items-center justify-center bg-black/60 p-5 md:p-6 backdrop-blur-sm"
            >
              <div
                onClick={(e) => e.stopPropagation()}
                className="w-full max-w-lg overflow-hidden rounded-3xl bg-white shadow-2xl"
              >
                {/* Header */}
                <div className="border-b border-border px-8 py-6">
                  <div className="flex items-center gap-4">
                    <div className="flex h-14 w-14 items-center justify-center rounded-full bg-red-100">
                      <AiOutlineDelete className="text-2xl text-error" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-semibold text-heading">
                        Delete Product
                      </h2>
                      <p className="mt-1 text-sm text-body">
                        This action cannot be undone.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Body */}
                <div className="px-8 py-6">
                  <p className="leading-7 text-body">
                    Are you sure you want to permanently delete
                    <span className="font-semibold text-heading">
                      {" "}
                      {selectedProduct.name}
                    </span>
                    ?
                  </p>
                </div>

                {/* Footer */}
                <div className="flex justify-end gap-3 border-t border-border bg-neutral-50 px-8 py-5">
                  <button
                    onClick={() => setDeleteModal(false)}
                    className="rounded-xl border border-border px-6 py-3 font-medium hover:bg-neutral-100"
                  >
                    Cancel
                  </button>
                  <button
                    disabled={deleting}
                    onClick={handleDelete}
                    className="rounded-xl bg-error px-6 py-3 font-medium text-white hover:bg-error-hover"
                  >
                    {deleting ? "Deleting..." : "Delete Product"}
                  </button>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default AdminProductDetails;
