import React, { useEffect, useState } from "react";
import { LuPlus } from "react-icons/lu";
import { IoClose } from "react-icons/io5";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductDetails } from "../../redux/slices/productSlice";
import axios from "axios";
import { toast } from "sonner";
import {
  createProduct,
  updateProduct,
} from "../../redux/slices/adminProductSlice";
import { IoArrowBack } from "react-icons/io5";

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

  useEffect(() => {
    if (id) {
      dispatch(fetchProductDetails(id));
    }
  }, [dispatch, id]);

  useEffect(() => {
    if (selectedProduct) {
      setProductData(selectedProduct);
    } else {
      setProductData(defaultData);
    }
  }, [selectedProduct]);

  const [productData, setProductData] = useState(defaultData);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    if (isEdit) {
      dispatch(updateProduct({ id, productData }));
    } else {
      dispatch(createProduct(productData)); // 👈 ADD THIS
    }

    navigate("/admin/products");
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

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div className="max-w-5xl mx-auto p-6 shadow-sm rounded-md font-manrope bg-white">
      <div className="flex items-center gap-3 mb-6">
        <button
          type="button"
          onClick={() => window.history.back()}
          className="p-2 rounded-md hover:bg-gray-100 transition"
        >
          <IoArrowBack className="text-lg" />
        </button>

        <h2 className="text-xl md:text-2xl font-dm-serif text-heading">
          {isEdit ? "Edit Product" : "Add Product"}
        </h2>
      </div>

      <form action="" onSubmit={handleSubmit}>
        {/* Name */}
        <div className="mb-6">
          <label className="block font-semibold mb-2">Product Name</label>
          <input
            type="text"
            name="name"
            value={productData.name}
            onChange={handleChange}
            className="w-full border border-border rounded-sm p-2"
            required
          />
        </div>

        {/* Description */}
        <div className="mb-6">
          <label className="block font-semibold mb-2">
            Product Description
          </label>
          <textarea
            name="description"
            value={productData.description}
            onChange={handleChange}
            className="w-full border border-border rounded-sm p-2"
            required
            rows={4}
          />
        </div>

        {/* Category */}
        <div className="mb-6">
          <label className="block font-semibold mb-2">Product Category</label>
          <input
            type="text"
            name="category"
            value={productData.category}
            onChange={handleChange}
            className="w-full border border-border rounded-sm p-2"
            required
          />
        </div>

        {/* Count In Stock */}
        <div className="mb-6">
          <label className="block font-semibold mb-2">Count In Stock</label>
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
            className="w-full border border-border rounded-sm p-2"
            required
          />
        </div>

        {/* SKU */}
        <div className="mb-6">
          <label className="block font-semibold mb-2">SKU</label>
          <input
            type="text"
            name="sku"
            value={productData.sku}
            onChange={handleChange}
            className="w-full border border-border rounded-sm p-2"
            required
          />
        </div>

        {/* Sizes */}
        <div className="mb-6">
          <label className="block font-semibold mb-3">Pricing & Variants</label>

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
                className="border border-border rounded-lg p-4 mb-4 bg-white"
              >
                {/* Row 1 */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {/* Weight */}
                  <div>
                    <label className="text-sm text-neutral-600">Weight</label>
                    <input
                      type="text"
                      placeholder="e.g. 5kg"
                      value={size.weight}
                      onChange={(e) =>
                        handleSizeChange(index, "weight", e.target.value)
                      }
                      className="w-full border border-border rounded p-2 mt-1"
                    />
                  </div>

                  {/* Price */}
                  <div>
                    <label className="text-sm text-neutral-600">
                      Selling Price
                    </label>
                    <input
                      type="number"
                      placeholder="₹"
                      value={size.price}
                      onChange={(e) =>
                        handleSizeChange(index, "price", Number(e.target.value))
                      }
                      className="w-full border border-border rounded p-2 mt-1"
                    />
                  </div>

                  {/* Original Price */}
                  <div>
                    <label className="text-sm text-neutral-600">
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
                      className="w-full border border-border rounded p-2 mt-1"
                    />
                  </div>

                  {/* Discount */}
                  <div>
                    <label className="text-sm text-neutral-600">Discount</label>
                    <div className="w-full border border-border rounded p-2 mt-1 bg-neutral-100">
                      {discount > 0 ? `${discount}% OFF` : "—"}
                    </div>
                  </div>
                </div>

                {/* Remove Variant */}
                <div className="flex justify-end mt-3">
                  <button
                    type="button"
                    onClick={() => handleRemoveSize(index)}
                    className="text-sm text-error hover:underline"
                  >
                    Remove
                  </button>
                </div>
              </div>
            );
          })}

          {/* Add Variant Button */}
          <button
            type="button"
            onClick={addSize}
            className="mt-2 px-4 py-2 bg-secondary-500 hover:bg-secondary-600 text-white rounded flex items-center gap-2"
          >
            <LuPlus className="text-lg" />
            <span>Add Variant</span>
          </button>
        </div>

        {/* Images Upload*/}
        <div className="mb-6">
          <label className="block font-semibold mb-2">Upload Images</label>

          {/* Upload Box */}
          <label className="w-full border-2 border-dashed border-border rounded-xl flex flex-col items-center justify-center py-10 cursor-pointer hover:bg-neutral-50 transition">
            <input
              type="file"
              multiple
              onChange={handleImageUpload}
              className="hidden"
            />

            <div className="text-center">
              <p className="text-lg font-medium">Drop or select files</p>
              <p className="text-sm text-neutral-500">
                Drag files here, or{" "}
                <span className="text-primary-500">browse</span>
              </p>
            </div>
          </label>

          {/* Preview Images */}
          <div className="flex flex-wrap gap-4 mt-4">
            {productData.images.map((image, index) => (
              <div
                key={index}
                className="relative w-24 h-24 rounded-lg overflow-hidden group"
              >
                <img
                  src={image.url}
                  alt="product"
                  className="w-full h-full object-cover"
                />

                {/* Remove Button */}
                <button
                  type="button"
                  onClick={() => handleRemoveImage(index)}
                  className="absolute top-1 right-1 bg-black/60 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs opacity-0 group-hover:opacity-100 transition"
                >
                  <IoClose />
                </button>
              </div>
            ))}
          </div>

          {/* Remove All */}
          {productData.images.length > 0 && (
            <button
              type="button"
              onClick={handleRemoveAllImages}
              className="mt-3 text-sm text-error hover:underline"
            >
              Remove All
            </button>
          )}
        </div>

        {/* Features */}
        <div className="mb-6">
          <div className="mb-6">
            <label className="block font-semibold mb-2">Features</label>

            {productData.features.map((feature, index) => (
              <input
                key={index}
                type="text"
                placeholder={`Feature ${index + 1}`}
                value={feature}
                onChange={(e) => handleFeatureChange(index, e.target.value)}
                className="w-full border border-border rounded-sm p-2 mb-2"
              />
            ))}

            <button
              type="button"
              onClick={addFeature}
              className="mt-2 px-4 py-2 bg-secondary-500 hover:bg-secondary-600 text-white rounded flex items-center gap-2 transition"
            >
              <LuPlus className="text-lg" />
              <span>Add Feature</span>
            </button>
          </div>
        </div>

        {/* Nutrition */}
        <div className="mb-6">
          <label className="block font-semibold mb-2">Nutrition</label>

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
              className="w-full border border-border rounded-sm p-2 mb-2"
            />
          ))}
        </div>

        {/* Storage */}
        <div className="mb-6">
          <label className="block font-semibold mb-2">Storage Guide</label>
          <textarea
            name="storage"
            value={productData.storage}
            onChange={handleChange}
            className="w-full border border-border rounded-sm p-2"
            rows={3}
          />
        </div>

        {/* Grinding Slots */}
        {(productData.name?.toLowerCase().includes("wheat") ||
          productData.category?.toLowerCase().includes("wheat")) && (
          <div className="mb-6">
            <label className="block font-semibold mb-2">Grinding Slots</label>

            {productData.grindingSlots.map((slot, index) => (
              <input
                key={index}
                type="text"
                placeholder="e.g. 9:00 AM - 10:00 AM"
                value={slot}
                onChange={(e) => handleSlotChange(index, e.target.value)}
                className="w-full border border-border rounded-sm p-2 mb-2"
              />
            ))}

            <button
              type="button"
              onClick={addSlot}
              className="mt-2 px-4 py-2 bg-secondary-500 hover:bg-secondary-600 text-white rounded flex items-center gap-2 transition"
            >
              <LuPlus className="text-lg" />
              <span>Add Slot</span>
            </button>
          </div>
        )}

        {/* ACTION BUTTONS */}
        <div className="flex items-center justify-end gap-4 mt-8">
          {/* Cancel Button */}
          <button
            type="button"
            onClick={() => window.history.back()}
            className="px-6 py-2 rounded text-white bg-error hover:bg-error-hover transition"
          >
            Cancel
          </button>

          {/* Save / Update Button */}
          <button
            type="submit"
            className="px-6 py-2 bg-primary-500 text-white rounded hover:bg-primary-600 transition"
          >
            {isEdit ? "Update Product" : "Add Product"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProductFormPage;
