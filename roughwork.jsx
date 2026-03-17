import React from "react";

const selectedProduct = {
  name: "Sharbati Wheat",
  category: "Wheat",
  description:
    "Sharbati Wheat is a premium variety of wheat known for its rich taste and excellent grain quality. It is widely used in Indian households for preparing soft and fluffy rotis. The grains are carefully selected from trusted farms in Madhya Pradesh to ensure purity, freshness, and consistent quality in every batch.",
  origin: "Madhya Pradesh, India",
  variety: "Sharbati Wheat",
  sizes: [
    {
      weight: "5kg",
      price: 250,
    },
    {
      weight: "10kg",
      price: 500,
    },
    {
      weight: "25kg",
      price: 1250,
    },
  ],
  images: [
    {
      url: "https://picsum.photos/500/500?random=1",
      altText: "Sharbati Wheat",
    },
    {
      url: "https://picsum.photos/500/500?random=2",
      altText: "Sharbati Wheat",
    },
  ],
  shelfLife: "6 months when stored properly in a cool and dry place",
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
  usage:
    "Perfect for making soft rotis, chapatis, parathas, and other traditional Indian breads commonly prepared in Indian households.",
};

const ProductDetails = () => {
  return (
    <div className="p-6">
      <div className="max-w-6xl mx-auto bg-white p-8 rounded-lg">
        <div className="flex flex-col md:flex-row">
          {/* Left Thumbnails */}
          <div className="hidden md:flex flex-col space-y-4 mr-6">
            {selectedProduct.images.map((image, index) => (
              <img
                key={index}
                src={image.url}
                alt={image.altText || `Thumbnail ${index}`}
                className="w-20 h-20 object-cover rounded-lg cursor-pointer border"
              />
            ))}
          </div>

          {/* Main Image */}
          <div className="md:w-1/2 ">
            <div className="mb-4">
              <img
                src={selectedProduct.images[0]?.url}
                alt="Main Product"
                className="w-full h-auto object-cover rounded-lg"
              />
            </div>
          </div>

          {/* Mobile Thumbnail */}
          <div className="md:hidden flex overscroll-x-scroll space-x-4 mb-4">
            {selectedProduct.images.map((image, index) => (
              <img
                key={index}
                src={image.url}
                alt={image.altText || `Thumbnail ${index}`}
                className="w-20 h-20 object-cover rounded-lg cursor-pointer border"
              />
            ))}
          </div>

          {/* Right Side Content */}
          <div className="md:w-1/2 md:ml-10">
            <h1 className="text-2xl font-dm-serif md:text-3xl mb-2">
              {selectedProduct.name}
            </h1>

            <p className="text-lg font-manrope text-bodymb-1 line-through">
                {selectedProduct.sizes}
            </p>
          </div>


        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
