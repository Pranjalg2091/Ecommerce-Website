import React, { useState } from "react";

const selectedProduct = {
  name: "Sharbati Wheat",
  rating: 4.5,
  reviews: 124,
  category: "Wheat",
  description:
    "Sharbati Wheat is a premium variety of wheat known for its rich taste and excellent grain quality. It is widely used in Indian households for preparing soft and fluffy rotis. The grains are carefully selected from trusted farms in Madhya Pradesh to ensure purity, freshness, and consistent quality in every batch.",
  origin: "Sehore, Madhya Pradesh, India",
  sizes: [
    { weight: "5kg", price: 250, originalPrice: 300 },
    { weight: "10kg", price: 500, originalPrice: 600 },
    { weight: "25kg", price: 1250, originalPrice: 1500 },
  ],

  images: [
    { url: "https://picsum.photos/600/600?random=1" },
    { url: "https://picsum.photos/600/600?random=2" },
    { url: "https://picsum.photos/600/600?random=3" },
  ],

  features: [
    "Premium quality wheat grains carefully sourced from trusted farms to maintain purity and natural taste.",
    "Known for making soft, fluffy, and delicious rotis that stay fresh for longer.",
    "Naturally rich in essential nutrients that support a balanced and healthy diet.",
    "Cleaned and sorted using hygienic processes to remove impurities and ensure consistent quality.",
    "Ideal for everyday cooking including rotis, chapatis, parathas, and other traditional Indian breads.",
  ],

  nutrition: {
    energy: "Approx. 340 kcal per 100g",
    protein: "Around 12 g per 100g",
    carbs: "Approximately 72 g per 100g",
    fiber: "About 10 g per 100g",
  },
  storage:
    "Store in an airtight container in a cool and dry place away from moisture to maintain freshness and quality.",

  grindingSlots: [
    "9:00 AM - 10:00 AM",
    "10:00 AM - 11:00 AM",
    "11:00 AM - 12:00 PM",
    "4:00 PM - 5:00 PM",
    "5:00 PM - 6:00 PM",
    "6:00 PM - 7:00 PM",
    "7:00 PM - 8:00 PM",
    "8:00 PM - 9:00 PM",
  ],
};

const ProductDetails = () => {
  const [mainImage, setMainImage] = useState(selectedProduct.images[0].url);
  const [size, setSize] = useState(selectedProduct.sizes[0]);
  const [quantity, setQuantity] = useState(1);
  const [timeSlot, setTimeSlot] = useState("");
  const [tab, setTab] = useState("description");

  const total = size.price * quantity;
  const discount = Math.round(((size.originalPrice - size.price) / size.originalPrice) * 100);

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      <div className="grid md:grid-cols-2 gap-12">
        {/* IMAGE SECTION */}
        <div>
          {/* MAIN IMAGE */}
          <div className="border rounded-xl overflow-hidden group">
            <img
              src={mainImage}
              className="w-full transition duration-500 group-hover:scale-110"
            />
          </div>

          {/* DESKTOP THUMBNAILS */}
          <div className="hidden md:flex gap-3 mt-4">
            {selectedProduct.images.map((image, index) => (
              <img
                key={index}
                src={image.url}
                onClick={() => setMainImage(image.url)}
                className={`w-20 h-20 object-cover cursor-pointer rounded border ${
                  mainImage === image.url ? "border-black" : ""
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
                onClick={() => setMainImage(image.url)}
                className="w-20 h-20 rounded cursor-pointer border"
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
              ₹{size.price}
            </span>

            <span className="line-through text-neutral-500">₹{size.originalPrice}</span>

            <span className="text-secondary-600 font-manrope font-medium">{discount}% OFF</span>
          </div>

          {/* SIZE SELECTOR */}
          <div className="mb-6">
            <p className="font-manrope font-medium mb-2">Select Variant:</p>

            <div className="flex gap-3 font-manrope text-sm">
              {selectedProduct.sizes.map((s, i) => (
                <button
                  key={i}
                  onClick={() => setSize(s)}
                  className={`px-4 py-2 border border-neutral-300 rounded-sm ${
                    size.weight === s.weight
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

            <div className="flex items-center text-sm border border-neutral-300 w-fit rounded">
              <button
                onClick={() => quantity > 1 && setQuantity(quantity - 1)}
                className="px-4 py-2"
              >
                -
              </button>
              <span className="px-6">{quantity}</span>
              <button onClick={() => setQuantity(quantity + 1)} className="px-4 py-2">
                +
              </button>
            </div>
          </div>

          {/* TOTAL */}
          <p className="mb-6 font-manrope font-medium text-lg">Total: ₹{total}</p>

          {/* GRINDING SLOT */}
          <div className="mb-6">
            <p className="font-manrope font-medium mb-2">Select Wheat Grinding Time Slot:</p>

            <div className="flex flex-wrap gap-3 text-sm">
              {selectedProduct.grindingSlots.map((s, i) => (
                <button
                  key={i}
                  onClick={() => setTimeSlot(s)}
                  className={`px-4 py-2 font-manrope font-medium border border-neutral-300 rounded ${
                    timeSlot === s ? "bg-secondary-600 text-white border-none" : "hover:bg-neutral-100"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* ADD TO CART */}
          <button className="w-full font-manrope bg-primary-500 text-white py-3 rounded-sm hover:bg-primary-600">
            Add to Cart
          </button>
        </div>
      </div>

      {/* PRODUCT TABS */}
      <div className="mt-16">
        <div className="flex gap-6 border-b pb-3 font-manrope font-normal">
          <button
            onClick={() => setTab("description")}
            className={tab === "description" ? "font-semibold" : ""}
          >
            Description
          </button>

          <button
            onClick={() => setTab("features")}
            className={tab === "features" ? "font-semibold" : ""}
          >
            Features
          </button>

          <button
            onClick={() => setTab("nutrition")}
            className={tab === "nutrition" ? "font-semibold" : ""}
          >
            Nutrition
          </button>

          <button
            onClick={() => setTab("storage")}
            className={tab === "storage" ? "font-semibold" : ""}
          >
            Storage
          </button>
        </div>

        <div className="mt-6 text-body font-manrope leading-relaxed">
          {tab === "description" && <p>{selectedProduct.description}</p>}

          {tab === "features" && (
            <ul className="list-disc ml-6">
              {selectedProduct.features.map((f, i) => (
                <li key={i}>{f}</li>
              ))}
            </ul>
          )}

          {tab === "nutrition" && (
            <div className="grid grid-cols-2 gap-4">
              {Object.entries(selectedProduct.nutrition).map(([k, v]) => (
                <div key={k} className="border p-3 rounded">
                  <p className="font-semibold capitalize">{k}</p>
                  <p>{v}</p>
                </div>
              ))}
            </div>
          )}

          {tab === "storage" && <p>{selectedProduct.storage}</p>}
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
