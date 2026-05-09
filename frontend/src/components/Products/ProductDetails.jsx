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
    if (selectedProduct?.images?.length > 0) {
      setMainImage(selectedProduct?.images[0].url);
    }
  }, [selectedProduct]);

  const handleQuantityChange = (action) => {
    if (action === "plus") setQuantity((prev) => prev + 1);
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
      {selectedProduct && (
        <div className="max-w-6xl mx-auto px-6 py-10">
          <div className="grid md:grid-cols-2 gap-12">
            {/* IMAGE SECTION */}
            <div>
              {/* MAIN IMAGE */}
              <div className="border rounded-xl overflow-hidden group">
                {mainImage && (
                  <img
                    src={mainImage}
                    alt="Main Image"
                    className="w-full h-auto transition duration-500 group-hover:scale-110"
                  />
                )}
              </div>

              {/* DESKTOP THUMBNAILS */}
              <div className="hidden md:flex gap-3 mt-4">
                {selectedProduct?.images.map((image, index) => (
                  <img
                    key={index}
                    src={image.url}
                    alt={image.altText || `Thumbnail ${index}`}
                    onClick={() => setMainImage(image.url)}
                    className={`w-20 h-20 object-cover cursor-pointer rounded border ${
                      mainImage === image.url
                        ? "border-black"
                        : "border-neutral-300"
                    }`}
                  />
                ))}
              </div>

              {/* MOBILE THUMBNAILS */}
              <div className="md:hidden flex overflow-x-auto gap-3 mt-4">
                {selectedProduct.images.map((image, index) => (
                  <img
                    key={index}
                    src={image.url}
                    alt={image.altText || `Thumbnail ${index}`}
                    onClick={() => setMainImage(image.url)}
                    className={`w-20 h-20 object-cover cursor-pointer rounded border ${
                      mainImage === image.url
                        ? "border-black"
                        : "border-neutral-300"
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* PRODUCT INFO */}
            <div>
              {/* TITLE */}
              <h1 className="text-3xl text-heading font-dm-serif mb-2">
                {selectedProduct.name}
              </h1>

              <p className="text-body mb-2">Origin: {selectedProduct.origin}</p>

              {/* RATING */}
              <div className="flex items-center gap-2 mb-4">
                <div className="text-yellow-500">
                  {"★".repeat(Math.floor(selectedProduct.rating))}
                  {"☆".repeat(5 - Math.floor(selectedProduct.rating))}
                </div>

                <span className="text-neutral-500 text-sm">
                  ({selectedProduct.reviews} reviews)
                </span>
              </div>

              {/* PRICE */}
              <div className="flex items-center gap-4 mb-6">
                <span className="text-3xl font-manrope font-bold text-primary-500">
                  ₹{size?.price}
                </span>

                <span className="line-through text-neutral-500">
                  ₹{size?.originalPrice}
                </span>

                <span className="text-secondary-600 font-manrope font-medium">
                  {discount}% OFF
                </span>
              </div>

              {/* SIZE SELECTOR */}
              <div className="mb-6">
                <p className="font-manrope font-medium mb-2">Select Variant:</p>

                <div className="flex gap-3 font-manrope text-sm">
                  {selectedProduct?.sizes.map((s, i) => (
                    <button
                      key={i}
                      onClick={() => setSize(s)}
                      className={`px-4 py-2 border border-neutral-300 rounded-sm ${
                        size?.weight === s.weight
                          ? "bg-secondary-600 text-white border-none"
                          : "hover:bg-neutral-100"
                      }`}
                    >
                      {s.weight}
                    </button>
                  ))}
                </div>
              </div>

              {/* QUANTITY */}
              <div className="mb-6">
                <p className="font-manrope font-medium mb-2">Quantity:</p>

                <div className="flex items-center text-sm border border-border w-fit rounded">
                  <button
                    onClick={() => handleQuantityChange("minus")}
                    className="px-4 py-2"
                  >
                    -
                  </button>
                  <span className="px-6">{quantity}</span>
                  <button
                    onClick={() => handleQuantityChange("plus")}
                    className="px-4 py-2"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* TOTAL */}
              <p className="mb-6 font-manrope font-medium text-lg">
                Total: ₹{total}
              </p>

              {/* GRINDING SLOT */}
              {isGrindingRequired && (
                <div className="mb-6">
                  <p className="font-manrope font-medium mb-2">
                    Select Wheat Grinding Time Slot:
                  </p>

                  <div className="flex flex-wrap gap-3 text-sm">
                    {selectedProduct?.grindingSlots.map((s, i) => (
                      <button
                        key={i}
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
                </div>
              )}

              {/* ADD TO CART */}
              <button
                onClick={handleAddToCart}
                disabled={isButtonDisabled}
                className={`w-full font-manrope bg-primary-500 text-white py-3 rounded-sm 
    ${isButtonDisabled ? "cursor-not-allowed opacity-50" : "hover:bg-primary-600"}`}
              >
                {isButtonDisabled ? "Adding..." : "Add to Cart"}
              </button>
            </div>
          </div>

          {/* PRODUCT DESCRIPTION TABS */}
          <div className="mt-16">
            {/* TAB HEADERS */}
            <div className="overflow-x-auto">
              <div className="flex gap-6 border-b border-border pb-0 font-manrope whitespace-nowrap min-w-max">
                {[
                  "overview",
                  "key-benefits",
                  "nutrition-info",
                  "storage-guide",
                ].map((item) => (
                  <button
                    key={item}
                    onClick={() => setTab(item)}
                    className={`pb-2 capitalize transition ${
                      tab === item
                        ? "font-manrope font-semibold border-b-2 border-primary-500 text-primary-500"
                        : "text-neutral-500"
                    }`}
                  >
                    {item}
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
            <div className="mt-20 text-center">
              <h2 className="text-3xl font-dm-serif mb-6">You May Also Like</h2>
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
