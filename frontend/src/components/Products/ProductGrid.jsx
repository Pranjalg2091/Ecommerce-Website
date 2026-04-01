import React from "react";
import { Link } from "react-router-dom";

const similarProducts = [
  {
    _id: "1",
    name: "Sharbati Wheat",
    price: 250,
    images: [
      {
        url: "https://picsum.photos/500/500?random=4",
        altText: "Sharbati Wheat",
      },
    ],
  },
  {
    _id: "2",
    name: "Sharbati Wheat",
    price: 250,
    images: [
      {
        url: "https://picsum.photos/500/500?random=5",
        altText: "Sharbati Wheat",
      },
    ],
  },
  {
    _id: "3",
    name: "Sharbati Wheat",
    price: 250,
    images: [
      {
        url: "https://picsum.photos/500/500?random=6",
        altText: "Sharbati Wheat",
      },
    ],
  },
  {
    _id: "4",
    name: "Sharbati Wheat",
    price: 250,
    images: [
      {
        url: "https://picsum.photos/500/500?random=7",
        altText: "Sharbati Wheat",
      },
    ],
  },
];

const ProductGrid = ({ products = similarProducts }) => {
  return (
    <div className="px-4 md:px-8 lg:px-12 py-10"> {/* ✅ spacing fix */}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"> {/* ✅ better gap */}
        
        {products.map((product) => (
          <Link
            key={product._id}
            to={`/products/${product._id}`}
            className="block group"
          >
            <div className="bg-white border border-neutral-200 rounded-xl overflow-hidden hover:shadow-md transition">

              {/* IMAGE */}
              <div className="w-full h-64 overflow-hidden"> {/* ✅ fixed height */}
                <img
                  src={product.images[0]?.url}
                  alt={product.images[0]?.altText || product.name}
                  className="w-full h-full object-cover transition duration-500 group-hover:scale-110"
                />
              </div>

              {/* CONTENT */}
              <div className="p-4 text-center"> {/* ✅ padding improve */}
                <h3 className="font-dm-serif text-heading text-lg truncate">
                  {product.name}
                </h3>
                <p className="font-manrope text-body font-semibold mt-1">
                  ₹{product.price}
                </p>
              </div>

            </div>
          </Link>
        ))}

      </div>
    </div>
  );
};

export default ProductGrid;