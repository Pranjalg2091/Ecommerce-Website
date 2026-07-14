import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import ProductGrid from "./ProductGrid.jsx";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchProductDetails,
  fetchSimilarProducts,
} from "../../redux/slices/productSlice.js";
import { addToCart } from "../../redux/slices/cartSlice.js";
import Breadcrumbs from "../Common/Breadcrumbs.jsx";

const ProductDetails = ({ productId, showSimilar = false }) => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { selectedProduct, products, similarProducts, loading, error } =
    useSelector((state) => state.products);
  const { user, guestId } = useSelector((state) => state.auth);

  const [mainImage, setMainImage] = useState("");
  const [size, setSize] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [timeSlot, setTimeSlot] = useState("");
  const [tab, setTab] = useState("overview");
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  const productFetchId = productId || id;

  useEffect(() => {
    if (productFetchId) {
      dispatch(fetchProductDetails(productFetchId));
      dispatch(fetchSimilarProducts({ id: productFetchId }));
    }
  }, [dispatch, productFetchId]);

  useEffect(() => {
    console.log("Similar Products:", similarProducts);
  }, [similarProducts]);

  useEffect(() => {
    if (selectedProduct?.images?.length > 0) {
      setMainImage(selectedProduct?.images[0].url);
    }
  }, [selectedProduct]);

  const handleQuantityChange = (action) => {
    if (action === "plus" && quantity < selectedProduct.countInStock) {
      setQuantity((prev) => prev + 1);
    }
    if (action === "minus" && quantity > 1) setQuantity((prev) => prev - 1);
  };

  useEffect(() => {
    if (selectedProduct?.sizes?.length > 0) {
      setSize(selectedProduct.sizes[0]);
    }
  }, [selectedProduct]);

  const total = size ? size.price * quantity : 0;

  const discount = size
    ? Math.round(((size.originalPrice - size.price) / size.originalPrice) * 100)
    : 0;

  const isOutOfStock = selectedProduct?.countInStock <= 0;

  const category = selectedProduct?.category?.toLowerCase() || "";

  const isGrindingRequired =
    (category.includes("wheat") || category.includes("organic")) &&
    !category.includes("flour");

  const handleAddToCart = () => {
    if (!size || (isGrindingRequired && !timeSlot)) {
      toast.error(
        isGrindingRequired
          ? "Please select variant and grinding time slot."
          : "Please select a variant.",
        { duration: 1000 },
      );
      return;
    }
    setIsButtonDisabled(true);

    dispatch(
      addToCart({
        userId: user?._id,
        guestId,
        productId: productFetchId,
        size: size.weight,
        timeSlot,
        quantity,
      }),
    )
      .unwrap()
      .then(() => {
        toast.success("Product added to cart!", {
          duration: 1000,
        });
      })
      .catch((error) => {
        toast.error(error);
      })
      .finally(() => {
        setIsButtonDisabled(false);
      });
  };

  if (loading) {
    return <p className="text-center">Loading product details...</p>;
  }

  if (error) {
    return <p className="text-center text-error">Error: {error}</p>;
  }

  return (
    <div className="p-6">
      {/* BREADCRUMBS */}
      <Breadcrumbs
        variant="light"
        items={[
          {
            label: "All Products",
            href: "/products",
          },
          {
            label: selectedProduct?.name,
          },
        ]}
      />
      {selectedProduct && (
        <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-10 py-10 lg:py-14">
          {/* PRODUCT DETAILS SECTION */}
          <div className="grid lg:grid-cols-[1.05fr_0.95fr] gap-10 lg:gap-16 items-start">
            {/* IMAGE SECTION */}
            <div>
              {/* MAIN IMAGE */}
              <div className="rounded-2xl overflow-hidden border border-border bg-white shadow-sm">
                {mainImage && (
                  <img
                    src={mainImage}
                    alt="Main Image"
                    className="w-full aspect-square object-cover transition-transform duration-500 hover:scale-105"
                  />
                )}
              </div>

              {/* DESKTOP THUMBNAILS */}
              <div className="hidden md:flex gap-3 mt-4">
                {selectedProduct?.images?.map((image, index) => (
                  <img
                    key={index}
                    src={image.url}
                    alt={image.altText || `Thumbnail ${index}`}
                    onClick={() => setMainImage(image.url)}
                    className={`w-20 h-20 object-cover cursor-pointer rounded-lg border ${
                      mainImage === image.url
                        ? "border-primary-500 ring-2 ring-primary-100"
                        : "border-border hover:border-primary-300"
                    }`}
                  />
                ))}
              </div>

              {/* MOBILE THUMBNAILS */}
              <div className="md:hidden flex overflow-x-auto gap-3 mt-4">
                {selectedProduct?.images?.map((image, index) => (
                  <img
                    key={index}
                    src={image.url}
                    alt={image.altText || `Thumbnail ${index}`}
                    onClick={() => setMainImage(image.url)}
                    className={`w-20 h-20 object-cover cursor-pointer rounded-lg border ${
                      mainImage === image.url
                        ? "border-primary-500 ring-2 ring-primary-100"
                        : "border-border hover:border-primary-300"
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* PRODUCT INFO */}
            <div>
              {/* TITLE */}
              <h1 className="text-3xl lg:text-4xl text-heading font-dm-serif mb-2 leading-tight tracking-tight">
                {selectedProduct.name}
              </h1>

              {/* Origin */}
              <div className="flex items-center gap-2 mt-4 text-sm">
                <span className="font-semibold text-heading">Origin</span>
                <span className="w-1 h-1 rounded-full bg-neutral-400"></span>
                <span className="text-body">{selectedProduct.origin}</span>
              </div>

              {/* RATING */}
              <div className="flex items-center gap-3 mt-5 mb-5">
                <div className="text-yellow-500 text-xl">
                  {"★".repeat(Math.floor(selectedProduct.rating))}
                  {"☆".repeat(5 - Math.floor(selectedProduct.rating))}
                </div>

                <span className="font-semibold text-heading">
                  {selectedProduct.rating.toFixed(1)}
                </span>

                <span className="text-neutral-500">
                  ({selectedProduct.reviews} Reviews)
                </span>
              </div>

              {/* PRICE */}
              <div className="flex items-center gap-4 mb-6">
                <span className="text-3xl font-manrope font-bold text-primary-500">
                  ₹{size?.price}
                </span>

                {size?.originalPrice > size?.price && (
                  <>
                    <span className="line-through text-neutral-500">
                      ₹{size.originalPrice}
                    </span>

                    <span className="bg-green-100 text-primary-700 px-2 py-1 rounded text-sm font-medium">
                      {discount}% OFF
                    </span>
                  </>
                )}
              </div>

              {/* STOCK STATUS */}
              <div className="mt-4 flex items-center gap-2 mb-6">
                <div
                  className={`h-2.5 w-2.5 rounded-full ${
                    selectedProduct.countInStock > 10
                      ? "bg-success"
                      : selectedProduct.countInStock > 0
                        ? "bg-warning"
                        : "bg-error"
                  }`}
                />
                {selectedProduct.countInStock > 10 ? (
                  <p className="text-success text-sm font-medium">
                    In Stock ({selectedProduct.countInStock} Available)
                  </p>
                ) : selectedProduct.countInStock > 0 ? (
                  <p className="text-warning text-sm font-medium">
                    Only {selectedProduct.countInStock} Left
                  </p>
                ) : (
                  <p className="text-error text-sm font-medium">Out of Stock</p>
                )}
              </div>

              {/* SIZE SELECTOR */}
              <div className="mb-6">
                <p className="font-manrope font-medium mb-2">Choose Weight:</p>

                <div className="flex gap-3 font-manrope text-sm">
                  {selectedProduct?.sizes.map((s, i) => (
                    <button
                      key={i}
                      disabled={isOutOfStock}
                      onClick={() => setSize(s)}
                      className={`px-5 py-3 rounded-xl border text-sm font-medium transition-all duration-200
                        ${
                          size?.weight === s.weight
                            ? "bg-primary-500 text-white border-primary-500 shadow-md scale-[1.02]"
                            : isOutOfStock
                              ? "border-border bg-neutral-100 text-neutral-400 cursor-not-allowed"
                              : "border-border hover:border-primary-400 hover:bg-primary-50"
                        }`}
                    >
                      {s?.weight}
                    </button>
                  ))}
                </div>
                <p className="mt-3 text-base text-body">
                  Selected Weight:
                  <span className="ml-1 font-semibold text-heading">
                    {size?.weight}
                  </span>
                </p>
              </div>

              {/* QUANTITY */}
              <div className="mb-6">
                <div className="mb-3 flex items-center justify-between">
                  <p className="font-medium text-heading font-manrope">
                    Choose Quantity:
                  </p>
                </div>
                <div className="flex w-fit overflow-hidden rounded-xl border border-border">
                  <button
                    disabled={isOutOfStock}
                    onClick={() => handleQuantityChange("minus")}
                    className="px-5 py-3 transition hover:bg-neutral-100"
                  >
                    -
                  </button>
                  <span className="min-w-[60px] text-center text-lg py-3 font-semibold">
                    {quantity}
                  </span>
                  <button
                    disabled={isOutOfStock}
                    onClick={() => handleQuantityChange("plus")}
                    className="px-5 py-3 transition hover:bg-neutral-100"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* TOTAL */}
              <div className="mb-8 rounded-lg border border-primary-100 bg-primary-50 p-4">
                <div className="flex items-center justify-between">
                  <span className="text-heading text-lg">Estimated Total</span>
                  <span className="text-2xl font-bold text-primary-600">
                    ₹{total}
                  </span>
                </div>
              </div>

              {/* GRINDING SLOT */}
              {isGrindingRequired && (
                <div className="mb-6">
                  <p className="font-manrope font-medium mb-2">
                    Choose Grinding Slot:
                  </p>

                  <div className="flex flex-wrap gap-3 text-sm">
                    {selectedProduct?.grindingSlots.map((s, i) => (
                      <button
                        key={i}
                        disabled={isOutOfStock}
                        onClick={() => setTimeSlot(s)}
                        className={`px-4 py-2 font-manrope font-medium border border-neutral-300 rounded ${
                          timeSlot === s
                            ? "bg-secondary-600 text-white border-none"
                            : "hover:bg-neutral-100"
                        }`}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                  {timeSlot && (
                    <p className="mt-3 text-base text-body">
                      Selected :
                      <span className="ml-1 font-semibold text-heading">
                        {timeSlot}
                      </span>
                    </p>
                  )}
                </div>
              )}

              {/* ADD TO CART */}
              <button
                onClick={handleAddToCart}
                disabled={isButtonDisabled || selectedProduct.countInStock <= 0}
                className={`w-full font-manrope bg-primary-500 text-white py-3 rounded-md 
                    ${isButtonDisabled ? "cursor-not-allowed opacity-50" : "hover:bg-primary-600"}`}
              >
                {selectedProduct.countInStock <= 0
                  ? "Out of Stock"
                  : isButtonDisabled
                    ? "Adding..."
                    : "Add to Cart"}
              </button>

              {/* Trust Badges */}
              <div className="mt-6 grid grid-cols-2 gap-3 text-sm">
                <div className="flex items-center gap-2 rounded-xl bg-neutral-50 p-3">
                  ✅<span>Freshly Milled</span>
                </div>
                <div className="flex items-center gap-2 rounded-xl bg-neutral-50 p-3">
                  🔒
                  <span>Secure Payment</span>
                </div>
                <div className="flex items-center gap-2 rounded-xl bg-neutral-50 p-3">
                  🚚
                  <span>Fast Delivery</span>
                </div>
                <div className="flex items-center gap-2 rounded-xl bg-neutral-50 p-3">
                  🌾
                  <span>Premium Quality</span>
                </div>
              </div>
              {/* Trust Badges Ends Here */}

              {/* Delivery Info Card */}
              <div className="mt-6 rounded-lg border border-border p-5">
                <h3 className="font-semibold text-heading mb-3">
                  Delivery Information
                </h3>
                <div className="space-y-4 text-sm text body">
                  <div className="flex items-center gap-3">
                    <span className="text-lg">🚚</span>
                    <span>
                      Delivered within <strong>2–5 business days</strong>.
                    </span>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="text-lg">📦</span>
                    <span>Freshly packed after order confirmation.</span>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="text-lg">🔄</span>
                    <span>Easy replacement for damaged products.</span>
                  </div>
                </div>
              </div>

              {/* Delivery Info Card Ends Here */}
            </div>
          </div>

          {/* Product Description Heading */}
          <div className="mt-16">
            <h2 className="text-3xl font-dm-serif text-heading">
              Product Details
            </h2>
            <p className="mt-2 text-body">
              Everything you need to know before purchasing.
            </p>
          </div>

          {/* PRODUCT DESCRIPTION TABS */}
          <div className="mt-8">
            {/* TAB HEADERS */}
            <div className="overflow-x-auto">
              <div className="flex gap-6 border-b border-border pb-0 font-manrope whitespace-nowrap min-w-max">
                {[
                  {
                    label: "Overview",
                    value: "overview",
                  },
                  {
                    label: "Key Benefits",
                    value: "key-benefits",
                  },
                  {
                    label: "Nutrition Info",
                    value: "nutrition-info",
                  },
                  {
                    label: "Storage Guide",
                    value: "storage-guide",
                  },
                ].map((item) => (
                  <button
                    key={item.value}
                    onClick={() => setTab(item.value)}
                    className={`pb-2 transition ${
                      tab === item.value
                        ? "font-manrope font-semibold border-b-2 border-primary-500 text-primary-500"
                        : "text-neutral-500"
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* TAB CONTENT */}
            <div className="mt-6 text-body font-manrope leading-relaxed">
              {tab === "overview" && <p>{selectedProduct?.description}</p>}

              {tab === "key-benefits" && (
                <ul className="list-disc ml-6">
                  {selectedProduct?.features.map((feature, index) => (
                    <li key={index}>{feature}</li>
                  ))}
                </ul>
              )}

              {tab === "nutrition-info" && (
                <div className="grid grid-cols-2 gap-4">
                  {Object.entries(selectedProduct?.nutrition).map(([k, v]) => (
                    <div key={k} className="border border-border p-3 rounded">
                      <p className="font-semibold text-body capitalize">{k}</p>
                      <p>{v}</p>
                    </div>
                  ))}
                </div>
              )}

              {tab === "storage-guide" && <p>{selectedProduct?.storage}</p>}
            </div>
          </div>

          {showSimilar && similarProducts.length > 0 && (
            <div className="mt-24 text-center">
              <div className="mb-8">
                <h2 className="text-3xl font-dm-serif text-heading">
                  You May Also Like
                </h2>
                <p className="mt-2 text-body">
                  Products similar to this item that other customers also love.
                </p>
              </div>
              <ProductGrid
                products={similarProducts.slice(0, 4)}
                loading={loading}
                error={error}
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ProductDetails;
