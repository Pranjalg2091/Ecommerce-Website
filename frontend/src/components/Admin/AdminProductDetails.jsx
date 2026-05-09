import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductDetails } from "../../redux/slices/productSlice";
import { deleteProduct } from "../../redux/slices/adminProductSlice";
import { toast } from "sonner";
import { IoArrowBack } from "react-icons/io5";

const AdminProductDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { selectedProduct, loading, error } = useSelector(
    (state) => state.products,
  );

  const [mainImage, setMainImage] = useState("");

  useEffect(() => {
    if (id) dispatch(fetchProductDetails(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (selectedProduct?.images?.length > 0) {
      setMainImage(selectedProduct.images[0].url);
    }
  }, [selectedProduct]);

  const handleDelete = () => {
    if (window.confirm("Delete this product?")) {
      dispatch(deleteProduct(id));
      toast.success("Product deleted");
      navigate("/admin/products");
    }
  };

  if (loading) return <p className="text-center mt-10">Loading...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="max-w-7xl mx-auto p-6 font-manrope">
      {selectedProduct && (
        <>
          {/* HEADER */}
          <div className="flex items-center justify-between mb-8">
            {/* LEFT */}
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => window.history.back()}
                className="p-2 rounded-md hover:bg-gray-100 transition"
              >
                <IoArrowBack className="text-xl" />
              </button>

              <h1 className="text-2xl font-dm-serif">
                {selectedProduct.name}
              </h1>
            </div>

            {/* RIGHT */}
            <div className="flex gap-3">
              <button
                onClick={() => navigate(`/admin/products/${id}/edit`)}
                className="px-5 py-2 bg-secondary-500 text-white rounded-sm hover:bg-secondary-600 transition"
              >
                Edit
              </button>

              <button
                onClick={handleDelete}
                className="px-5 py-2 bg-error text-white rounded-sm hover:bg-error-hover transition"
              >
                Delete
              </button>
            </div>
          </div>

          {/* TOP GRID */}
          <div className="grid lg:grid-cols-3 gap-8">
            {/* LEFT: IMAGES */}
            <div className="lg:col-span-2 bg-white p-6 rounded-lg shadow-sm">
              <div className="rounded-xl overflow-hidden border border-border">
                <img
                  src={mainImage}
                  alt="product"
                  className="w-full h-[400px] object-cover"
                />
              </div>

              <div className="flex gap-3 mt-4">
                {selectedProduct.images.map((img, i) => (
                  <img
                    key={i}
                    src={img.url}
                    onClick={() => setMainImage(img.url)}
                    className={`w-20 h-20 object-cover rounded-lg cursor-pointer border transition ${
                      mainImage === img.url
                        ? "border-primary-500"
                        : "border-transparent"
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* RIGHT: INFO */}
            <div className="space-y-6">
              {/* BASIC INFO */}
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h2 className="text-lg font-semibold mb-4">Details</h2>

                <div className="space-y-2 text-sm">
                  <p>
                    <span className="text-gray-500">SKU:</span>{" "}
                    {selectedProduct.sku}
                  </p>
                  <p>
                    <span className="text-gray-500">Category:</span>{" "}
                    {selectedProduct.category}
                  </p>
                  <p>
                    <span className="text-gray-500">Stock:</span>{" "}
                    <span
                      className={`font-medium ${
                        selectedProduct.countInStock > 0
                          ? "text-success"
                          : "text-error"
                      }`}
                    >
                      {selectedProduct.countInStock > 0
                        ? `${selectedProduct.countInStock} available`
                        : "Out of stock"}
                    </span>
                  </p>
                  <p className="text-xs text-gray-400">
                    Created:{" "}
                    {new Date(selectedProduct.createdAt).toLocaleString()}
                  </p>
                </div>
              </div>

              {/* VARIANTS */}
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h2 className="text-lg font-semibold mb-4">Variants</h2>

                <div className="space-y-3">
                  {selectedProduct.sizes.map((s, i) => {
                    const discount =
                      s.originalPrice > 0
                        ? Math.round(
                            ((s.originalPrice - s.price) / s.originalPrice) *
                              100,
                          )
                        : 0;

                    return (
                      <div
                        key={i}
                        className="flex justify-between items-center border rounded-lg p-3"
                      >
                        <span>{s.weight}</span>

                        <div className="text-right">
                          <p className="font-semibold">₹{s.price}</p>
                          <p className="text-xs text-gray-500 line-through">
                            ₹{s.originalPrice}
                          </p>
                        </div>

                        {discount > 0 && (
                          <span className="text-success text-sm font-medium">
                            {discount}% OFF
                          </span>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* DESCRIPTION + EXTRA */}
          <div className="grid md:grid-cols-2 gap-8 mt-10">
            {/* DESCRIPTION */}
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-lg font-semibold mb-3">Description</h2>
              <p className="text-sm text-gray-600 leading-relaxed">
                {selectedProduct.description}
              </p>
            </div>

            {/* FEATURES */}
            {selectedProduct.features?.length > 0 && (
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h2 className="text-lg font-semibold mb-3">Features</h2>
                <ul className="list-disc ml-5 text-sm text-gray-600 space-y-1">
                  {selectedProduct.features.map((f, i) => (
                    <li key={i}>{f}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* NUTRITION */}
          <div className="bg-white p-6 rounded-lg shadow-sm mt-8">
            <h2 className="text-lg font-semibold mb-4">Nutrition</h2>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {Object.entries(selectedProduct.nutrition || {}).map(([k, v]) => (
                <div
                  key={k}
                  className="border border-border rounded-lg p-4 text-center"
                >
                  <p className="text-base text-heading capitalize">{k}</p>
                  <p className="text-sm text-body">{v}</p>
                </div>
              ))}
            </div>
          </div>

          {/* STORAGE + SLOTS */}
          <div className="grid md:grid-cols-2 gap-8 mt-8">
            {selectedProduct.storage && (
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h2 className="text-lg font-semibold mb-3">Storage Guide</h2>
                <p className="text-sm text-gray-600">
                  {selectedProduct.storage}
                </p>
              </div>
            )}

            {selectedProduct.grindingSlots?.length > 0 && (
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h2 className="text-lg font-semibold mb-3">Grinding Slots</h2>
                <div className="flex flex-wrap gap-2">
                  {selectedProduct.grindingSlots.map((slot, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 text-sm bg-gray-100 rounded-full"
                    >
                      {slot}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default AdminProductDetails;
