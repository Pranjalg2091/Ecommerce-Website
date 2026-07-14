import React, { useEffect, useState, useRef } from "react";
import { LuPlus } from "react-icons/lu";
import { IoClose } from "react-icons/io5";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductDetails } from "../../redux/slices/productSlice.js";
import axios from "axios";
import { toast } from "sonner";
import {
  createProduct,
  updateProduct,
} from "../../redux/slices/adminProductSlice.js";
import { IoArrowBack } from "react-icons/io5";
import { FiUploadCloud } from "react-icons/fi";
import { DndContext, closestCenter } from "@dnd-kit/core";
import {
  SortableContext,
  rectSortingStrategy,
  arrayMove,
  useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

function SortableImage({ id, image, index, handleRemoveImage }) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="group relative h-24 w-24 overflow-hidden rounded-lg border border-border bg-neutral-50 cursor-grab active:cursor-grabbing"
    >
      {index === 0 && (
        <div className="absolute left-2 top-2 rounded bg-primary-500 px-2 py-1 text-[10px] font-semibold text-white">
          COVER
        </div>
      )}
      <img src={image.url} alt="" className="h-full w-full object-cover" />

      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          handleRemoveImage(index);
        }}
        className="absolute right-2 top-2 flex h-7 w-7 items-center justify-center rounded-full bg-black/70 text-white opacity-0 transition group-hover:opacity-100"
      >
        <IoClose />
      </button>
    </div>
  );
}

const ProductFormPage = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const navigate = useNavigate();

  const { selectedProduct, loading, error } = useSelector(
    (state) => state.products,
  );

  const isEdit = Boolean(id);

  const defaultData = {
    name: "",
    description: "",
    category: "",
    countInStock: 0,
    sku: "",
    sizes: [
      {
        weight: "",
        price: 0,
        originalPrice: 0,
      },
    ],
    images: [],
    features: [""],
    grindingSlots: [""],
    nutrition: {
      energy: "",
      protein: "",
      carbs: "",
      fiber: "",
    },
    storage: "",
  };

  const [uploading, setUploading] = useState(false);

  const [saving, setSaving] = useState(false);

  const [productData, setProductData] = useState(defaultData);

  const [deleteModal, setDeleteModal] = useState({
    open: false,
    type: "",
    index: null,
  });

  useEffect(() => {
    if (isEdit) {
      dispatch(fetchProductDetails(id));
    }
  }, [dispatch, id, isEdit]);

  useEffect(() => {
    if (isEdit && selectedProduct) {
      setProductData(selectedProduct);
    } else {
      setProductData(defaultData);
    }
  }, [isEdit, selectedProduct]);

  const initialData = useRef(defaultData);
  const hasChanges =
    JSON.stringify(productData) !== JSON.stringify(initialData.current);

  useEffect(() => {
    const handleBeforeUnload = (e) => {
      if (!hasChanges) return;
      e.preventDefault();
      e.returnValue = "";
    };
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [hasChanges]);

  const generateSKU = () => {
    if (!productData.name.trim()) {
      toast.error("Enter product name first");
      return;
    }
    const sku =
      productData.name
        .toUpperCase()
        .replace(/[^A-Z0-9]/g, "")
        .slice(0, 6) +
      "-" +
      Math.floor(1000 + Math.random() * 9000);

    setProductData((prev) => ({
      ...prev,
      sku,
    }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      if (isEdit) {
        await dispatch(updateProduct({ id, productData }));
      } else {
        await dispatch(createProduct(productData));
      }
      navigate("/admin/products");
    } finally {
      setSaving(false);
    }
  };

  // ✅ Sizes handler
  const handleSizeChange = (index, field, value) => {
    const updatedSizes = [...productData.sizes];
    updatedSizes[index][field] = value;
    setProductData((prev) => ({
      ...prev,
      sizes: updatedSizes,
    }));
  };

  const addSize = () => {
    setProductData((prev) => ({
      ...prev,
      sizes: [...prev.sizes, { weight: "", price: 0, originalPrice: 0 }],
    }));
  };

  const handleRemoveSize = (index) => {
    const updated = [...productData.sizes];
    updated.splice(index, 1);
    setProductData((prev) => ({
      ...prev,
      sizes: updated,
    }));
  };

  // ✅ Features handlers
  const handleFeatureChange = (index, value) => {
    const updated = [...productData.features];
    updated[index] = value;
    setProductData((prev) => ({
      ...prev,
      features: updated,
    }));
  };

  const addFeature = () => {
    setProductData((prev) => ({
      ...prev,
      features: [...prev.features, ""],
    }));
  };

  // ✅ Grinding slot handlers
  const handleSlotChange = (index, value) => {
    const updated = [...productData.grindingSlots];
    updated[index] = value;
    setProductData((prev) => ({
      ...prev,
      grindingSlots: updated,
    }));
  };

  const addSlot = () => {
    setProductData((prev) => ({
      ...prev,
      grindingSlots: [...prev.grindingSlots, ""],
    }));
  };

  // ✅ Image handlers
  const handleImageUpload = async (e) => {
    const files = Array.from(e.target.files);
    try {
      setUploading(true);
      for (let file of files) {
        const formData = new FormData();
        formData.append("image", file);
        const { data } = await axios.post(
          `${import.meta.env.VITE_BACKEND_URL}/api/upload`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          },
        );
        setProductData((prev) => ({
          ...prev,
          images: [...prev.images, { url: data.imageUrl, altText: "" }],
        }));
      }
      setUploading(false);
    } catch (error) {
      console.error(error);
      setUploading(false);
    }
  };

  // Remove image handlers
  const handleRemoveImage = (index) => {
    const updated = [...productData.images];
    updated.splice(index, 1);
    setProductData((prev) => ({
      ...prev,
      images: updated,
    }));
  };

  // Remove all images
  const handleRemoveAllImages = () => {
    setProductData((prev) => ({
      ...prev,
      images: [],
    }));
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (!over) return;

    if (active.id !== over.id) {
      setProductData((prev) => {
        const oldIndex = prev.images.findIndex((_, i) => i === active.id);

        const newIndex = prev.images.findIndex((_, i) => i === over.id);

        return {
          ...prev,
          images: arrayMove(prev.images, oldIndex, newIndex),
        };
      });
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div className="mx-auto max-w-5xl px-6 py-8 font-manrope">
      {/* Header */}
      <div className="mb-4 flex items-center justify-between pb-2">
        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={() => window.history.back()}
            className="flex h-10 w-10 items-center justify-center rounded-lg border border-border transition hover:bg-neutral-100"
          >
            <IoArrowBack className="text-lg" />
          </button>
          <div>
            <h1 className="font-dm-serif text-3xl text-heading">
              {isEdit ? "Edit Product" : "Add Product"}
            </h1>
            <p className="mt-1 text-sm text-body">
              {isEdit
                ? "Update product information, pricing and inventory."
                : "Create a new product for your catalog."}
            </p>
          </div>
        </div>
      </div>

      {/* Form */}
      <form action="" onSubmit={handleSubmit}>
        {/* ================= Basic Information ================= */}
        <div className="mb-5 rounded-xl border border-border bg-white p-6 shadow-sm">
          <h2 className="mb-6 text-lg font-medium text-heading">
            Basic Information
          </h2>

          {/* Product Information */}
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            {/* Name */}
            <div className="mb-4">
              <label className="mb-2 block font-medium text-base text-neutral-500">
                Product Name
                <span className="ml-1 text-error">*</span>
              </label>
              <input
                type="text"
                name="name"
                value={productData.name}
                onChange={handleChange}
                className="w-full rounded-md border border-border bg-white px-4 py-2.5 transition focus:border-primary-500 focus:outline-none"
                required
              />
              {!productData.name.trim() && (
                <p className="mt-2 text-xs text-error">
                  Product name is required.
                </p>
              )}
            </div>

            {/* Category */}
            <div className="mb-4">
              <label className="mb-2 block font-medium text-base text-neutral-500">
                Product Category
                <span className="ml-1 text-error">*</span>
              </label>
              <select
                name="category"
                value={productData.category}
                onChange={handleChange}
                className="w-full rounded-md border border-border bg-white px-4 py-2.5 focus:border-primary-500 focus:outline-none"
                required
              >
                <option value="">Select Category</option>
                <option value="Wheat">Wheat</option>
                <option value="Wheat Flour">Wheat Flour</option>
                <option value="Organic Grains">Organic Grains</option>
                <option value="Grinding Service">Grinding Service</option>
              </select>
              {!productData.category && (
                <p className="mt-2 text-xs text-error">
                  Please select a category.
                </p>
              )}
            </div>

            {/* SKU */}
            <div className="mb-4">
              <label className="mb-2 block font-medium text-base text-neutral-500">
                SKU
                <span className="ml-1 text-error">*</span>
              </label>
              <div className="flex gap-3">
                <input
                  type="text"
                  name="sku"
                  value={productData.sku}
                  onChange={handleChange}
                  className="flex-1 rounded-md border border-border px-4 py-2.5 focus:border-primary-500 focus:outline-none"
                />
                <button
                  type="button"
                  onClick={generateSKU}
                  className="rounded-md border border-primary-500 px-4 text-primary-600 transition hover:bg-primary-50"
                >
                  Generate
                </button>
              </div>
            </div>

            {/* Stock */}
            <div className="mb-4">
              <label className="mb-2 block font-medium text-base text-neutral-500">
                Count In Stock
                <span className="ml-1 text-error">*</span>
              </label>
              <input
                type="number"
                name="countInStock"
                value={productData.countInStock}
                onChange={(e) =>
                  setProductData((prev) => ({
                    ...prev,
                    countInStock: Number(e.target.value),
                  }))
                }
                className="w-full rounded-md border border-border bg-white px-4 py-2.5 transition focus:border-primary-500 focus:outline-none"
                required
              />
              <div className="mt-3">
                {productData.countInStock > 20 && (
                  <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-700">
                    In Stock
                  </span>
                )}
                {productData.countInStock > 0 &&
                  productData.countInStock <= 20 && (
                    <span className="rounded-full bg-yellow-100 px-3 py-1 text-xs font-medium text-yellow-700">
                      Low Stock
                    </span>
                  )}
                {productData.countInStock <= 0 && (
                  <span className="rounded-full bg-red-100 px-3 py-1 text-xs font-medium text-red-700">
                    Out of Stock
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="mb-4">
            <label className="mb-2 block font-medium text-base text-neutral-500">
              Product Description
              <span className="ml-1 text-error">*</span>
            </label>
            <textarea
              name="description"
              value={productData.description}
              onChange={handleChange}
              className="w-full rounded-md border border-border bg-white px-4 py-2.5 transition focus:border-primary-500 focus:outline-none"
              required
              rows={3}
            />
            {!productData.description.trim() && (
              <p className="mt-2 text-xs text-error">
                Description is required.
              </p>
            )}
          </div>
        </div>

        {/* Sizes */}
        {/* ================= Pricing & Variants ================= */}
        <div className="mb-6 rounded-xl border border-border bg-white p-7 shadow-sm">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h2 className="text-lg font-medium text-heading">
                Pricing & Variants
              </h2>
              <p className="mt-1 text-sm text-body">
                Add different weights with their pricing.
              </p>
            </div>

            <button
              type="button"
              onClick={addSize}
              className="inline-flex items-center gap-2 rounded-md bg-secondary-500 px-4 py-2 text-sm font-medium text-white transition hover:bg-secondary-600"
            >
              <LuPlus className="text-lg" />
              Add Variant
            </button>
          </div>

          {productData.sizes.map((size, index) => {
            const discount =
              size.originalPrice > 0
                ? Math.round(
                    ((size.originalPrice - size.price) / size.originalPrice) *
                      100,
                  )
                : 0;

            return (
              <div
                key={index}
                className="mb-5 rounded-lg border border-border p-4"
              >
                <div className="mb-4 flex items-center justify-between">
                  <h3 className="font-semibold text-heading">
                    Variant #{index + 1}
                  </h3>
                </div>
                {/* Row 1 */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {/* Weight */}
                  <div>
                    <label className="mb-2 block font-medium text-sm text-neutral-500">
                      Weight
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. 5kg"
                      value={size.weight}
                      onChange={(e) =>
                        handleSizeChange(index, "weight", e.target.value)
                      }
                      className="w-full border border-border rounded-md p-2 mt-1"
                    />
                  </div>

                  {/* Price */}
                  <div>
                    <label className="mb-2 block font-medium text-sm text-neutral-500">
                      Selling Price
                    </label>
                    <input
                      type="number"
                      placeholder="₹"
                      value={size.price}
                      onChange={(e) =>
                        handleSizeChange(index, "price", Number(e.target.value))
                      }
                      className="w-full border border-border rounded-md p-2 mt-1"
                    />
                  </div>

                  {/* Original Price */}
                  <div>
                    <label className="mb-2 block font-medium text-sm text-neutral-500">
                      Original Price
                    </label>
                    <input
                      type="number"
                      placeholder="₹"
                      value={size.originalPrice}
                      onChange={(e) =>
                        handleSizeChange(
                          index,
                          "originalPrice",
                          Number(e.target.value),
                        )
                      }
                      className="w-full border border-border rounded-md p-2 mt-1"
                    />
                  </div>

                  {/* Discount */}
                  <div>
                    <label className="mb-2 block font-medium text-sm text-neutral-500">
                      Discount
                    </label>
                    <div className="mt-3 flex h-[42px] items-center rounded-md border border-border bg-white px-3 font-medium text-primary-600">
                      {discount > 0 ? `${discount}% OFF` : "—"}
                    </div>
                  </div>
                </div>

                {/* Remove Variant */}
                <div className="flex justify-end mt-2">
                  <button
                    type="button"
                    onClick={() =>
                      setDeleteModal({
                        open: true,
                        type: "variant",
                        index,
                      })
                    }
                    className="rounded-md border border-error px-3 py-2 text-sm font-medium text-error transition hover:bg-error hover:text-white"
                  >
                    Remove
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Images Upload*/}
        {/* ================= Product Images ================= */}
        <div className="mb-6 rounded-xl border border-border bg-white p-7 shadow-sm">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-lg font-medium text-heading">Product Images</h2>
            <p className="mt-1 text-sm text-body">
              Upload high-quality product images. The first image will be used
              as the cover image.
            </p>
          </div>

          {/* Upload Box */}
          <label className="flex min-h-[180px] w-full cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-primary-200 bg-primary-50/40 px-6 text-center transition-all duration-200 hover:border-primary-500 hover:bg-primary-50">
            <input
              type="file"
              multiple
              onChange={handleImageUpload}
              className="hidden"
            />
            <div className="space-y-3">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary-100">
                <FiUploadCloud className="text-xl text-primary-500" />
              </div>
              <h3 className="text-lg font-semibold text-heading">
                Upload Product Images
              </h3>
              <p className="text-sm text-body">
                Drag & drop your images here or click to browse.
              </p>
              {/* <span className="inline-flex rounded-md bg-primary-500 px-4 py-2 text-sm font-medium text-white">
                Choose Images
              </span> */}
              <p className="text-xs text-neutral-500">
                PNG, JPG, JPEG • Max 5MB each
              </p>
            </div>
          </label>

          {/* Preview Images */}
          <div className="flex flex-wrap gap-4 mt-4">
            {productData.images.map((image, index) => (
              <div
                key={index}
                className="group relative h-24 w-24 overflow-hidden rounded-lg border border-border bg-neutral-50"
              >
                {index === 0 && (
                  <div className="absolute left-2 top-2 rounded bg-primary-500 px-2 py-1 text-[10px] font-semibold text-white">
                    COVER
                  </div>
                )}
                <img
                  src={image.url}
                  alt="product"
                  className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                />

                {/* Remove Button */}
                <button
                  type="button"
                  onClick={() =>
                    setDeleteModal({
                      open: true,
                      type: "image",
                      index,
                    })
                  }
                  className="absolute right-2 top-2 flex h-7 w-7 items-center justify-center rounded-full bg-black/70 text-white opacity-0 transition group-hover:opacity-100"
                >
                  <IoClose />
                </button>
              </div>
            ))}
          </div>

          {/* <DndContext
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
          >
            <SortableContext
              items={productData.images.map((_, i) => i)}
              strategy={rectSortingStrategy}
            >
              <div className="mt-4 flex flex-wrap gap-4">
                {productData.images.map((image, index) => (
                  <SortableImage
                    key={index}
                    id={index}
                    index={index}
                    image={image}
                    handleRemoveImage={handleRemoveImage}
                  />
                ))}
              </div>
            </SortableContext>
          </DndContext> */}

          {uploading && (
            <div className="mt-4 rounded-md bg-gray-50 px-4 py-2.5 text-sm font-medium text-body">
              Uploading images...
            </div>
          )}

          {/* Remove All */}
          {productData.images.length > 0 && (
            <button
              type="button"
              onClick={handleRemoveAllImages}
              className="mt-5 rounded-md border border-error px-4 py-2 text-sm font-medium text-error transition hover:bg-error hover:text-white"
            >
              Remove All
            </button>
          )}
        </div>

        {/* Features */}
        {/* ================= Product Features ================= */}
        <div className="mb-6 rounded-xl border border-border bg-white p-7 shadow-sm">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h2 className="text-lg font-medium text-heading">
                Product Features
              </h2>
              <p className="mt-1 text-sm text-body">
                Highlight the key selling points of your product.
              </p>
            </div>
          </div>
          {productData.features.map((feature, index) => (
            <div key={index} className="mb-3 flex items-center gap-3">
              <input
                key={index}
                type="text"
                placeholder={`Feature ${index + 1}`}
                value={feature}
                onChange={(e) => handleFeatureChange(index, e.target.value)}
                className="flex-1 rounded-md border border-border px-4 py-2.5 transition focus:border-primary-500 focus:outline-none"
              />
              <button
                type="button"
                onClick={() =>
                  setDeleteModal({
                    open: true,
                    type: "feature",
                    index,
                  })
                }
                className="rounded-md border border-error px-4 py-2.5 text-error transition hover:bg-error hover:text-white"
              >
                Remove
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={addFeature}
            className="inline-flex items-center gap-2 rounded-md bg-secondary-500 px-5 py-2.5 text-white transition hover:bg-secondary-600"
          >
            <LuPlus className="text-lg" />
            <span>Add Feature</span>
          </button>
        </div>

        {/* Nutrition */}
        {/* ================= Nutrition ================= */}
        <div className="mb-6 rounded-xl border border-border bg-white p-7 shadow-sm">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h2 className="text-lg font-medium text-heading">
                Nutrition Information
              </h2>
              <p className="mt-1 text-sm text-body">
                Highlight the key selling points of your product.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            {["energy", "protein", "carbs", "fiber"].map((field) => (
              <input
                key={field}
                type="text"
                placeholder={field}
                value={productData.nutrition[field]}
                onChange={(e) =>
                  setProductData((prev) => ({
                    ...prev,
                    nutrition: {
                      ...prev.nutrition,
                      [field]: e.target.value,
                    },
                  }))
                }
                className="w-full rounded-md border border-border px-4 py-2.5 focus:border-primary-500 focus:outline-none"
              />
            ))}
          </div>
        </div>

        {/* Storage */}
        <div className="mb-6 rounded-xl border border-border bg-white p-7 shadow-sm">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h2 className="text-lg font-medium text-heading">
                Storage Guide
              </h2>
              <p className="mt-1 text-sm text-body">
                Highlight the key selling points of your product.
              </p>
            </div>
          </div>
          <textarea
            name="storage"
            value={productData.storage}
            onChange={handleChange}
            className="w-full rounded-md border border-border px-4 py-2.5 focus:border-primary-500 focus:outline-none"
            rows={3}
          />
        </div>

        {/* Grinding Slots */}
        {(productData.name?.toLowerCase().includes("wheat") ||
          productData.category?.toLowerCase().includes("wheat")) && (
          <div className="mb-6 rounded-xl border border-border bg-white p-7 shadow-sm">
            <div className="mb-6 flex items-center justify-between">
              <div>
                <h2 className="text-lg font-medium text-heading">
                  Grinding Slots
                </h2>
                <p className="mt-1 text-sm text-body">
                  Configure available grinding time slots.
                </p>
              </div>
            </div>

            {productData.grindingSlots.map((slot, index) => (
              <div key={index} className="mb-3 flex items-center gap-3">
                <input
                  key={index}
                  type="text"
                  placeholder="e.g. 9:00 AM - 10:00 AM"
                  value={slot}
                  onChange={(e) => handleSlotChange(index, e.target.value)}
                  className="flex-1 rounded-md border border-border px-4 py-2.5 focus:border-primary-500 focus:outline-none"
                />
                <button
                  type="button"
                  onClick={() =>
                    setDeleteModal({
                      open: true,
                      type: "slot",
                      index,
                    })
                  }
                  className="rounded-md border border-error px-4 py-2.5 text-error transition hover:bg-error hover:text-white"
                >
                  Remove
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={addSlot}
              className="inline-flex items-center gap-2 rounded-md bg-secondary-500 px-5 py-2.5 text-white transition hover:bg-secondary-600"
            >
              <LuPlus className="text-lg" />
              <span>Add Slot</span>
            </button>
          </div>
        )}

        {/* ACTION BUTTONS */}
        {/* ================= Action Bar ================= */}
        <div className="mt-10 flex items-center justify-between rounded-lg border-t border-border bg-white px-8 py-5 shadow-[0_-8px_30px_rgba(0,0,0,0.06)]">
          <div>
            <p className="font-medium text-heading">
              {isEdit ? "Editing Product" : "New Product"}
            </p>
            <p className="text-sm text-body">
              Make sure all information is correct before saving.
            </p>
          </div>

          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={() => {
                if (
                  hasChanges &&
                  !window.confirm("Discard all unsaved changes?")
                ) {
                  return;
                }
                window.history.back();
              }}
              className="rounded-md bg-error font-medium text-sm text-white px-6 py-2.5 transition hover:bg-error-hover"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving || uploading}
              className="rounded-md bg-primary-500 px-7 py-3 text-sm font-medium text-white transition hover:bg-primary-600 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {saving
                ? "Saving..."
                : isEdit
                  ? "Update Product"
                  : "Create Product"}
            </button>
          </div>
        </div>

        {/* ================= Delete Modal ================= */}
        {deleteModal.open && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
            <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl">
              <h3 className="text-lg font-semibold text-heading">
                Delete Item
              </h3>
              <p className="mt-3 text-sm text-body">
                Are you sure you want to remove this item?
              </p>
              <div className="mt-6 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() =>
                    setDeleteModal({
                      open: false,
                      type: "",
                      index: null,
                    })
                  }
                  className="rounded-md border border-border px-5 py-2"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={() => {
                    if (deleteModal.type === "image") {
                      handleRemoveImage(deleteModal.index);
                    }
                    if (deleteModal.type === "variant") {
                      handleRemoveSize(deleteModal.index);
                    }
                    if (deleteModal.type === "feature") {
                      const updated = [...productData.features];
                      updated.splice(deleteModal.index, 1);
                      setProductData((prev) => ({
                        ...prev,
                        features: updated,
                      }));
                    }
                    if (deleteModal.type === "slot") {
                      const updated = [...productData.grindingSlots];
                      updated.splice(deleteModal.index, 1);
                      setProductData((prev) => ({
                        ...prev,
                        grindingSlots: updated,
                      }));
                    }
                    setDeleteModal({
                      open: false,
                      type: "",
                      index: null,
                    });
                  }}
                  className="rounded-md bg-error px-5 py-2 text-white hover:bg-error-hover"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}
      </form>
    </div>
  );
};

export default ProductFormPage;
