import React from "react";
import { Link } from "react-router-dom";
import Breadcrumbs from "../Common/Breadcrumbs.jsx";

const similarProducts = [];

const ProductGrid = ({ products, loading, error, similarProducts }) => {
  // const getPrice = (product) => {
  //   if (product.basePrice) return product.basePrice;

  //   if (product?.sizes?.length) {
  //     return Math.min(...product.sizes.map((s) => s.price));
  //   }

  //   return 0;
  // };

  const getLowestVariant = (product) => {
    if (!product?.sizes?.length) return null;

    return product.sizes.reduce((lowest, current) =>
      current.price < lowest.price ? current : lowest,
    );
  };

  if (loading) {
    return <p className="text-center">Loading products...</p>;
  }

  if (error) {
    return <p className="text-center text-error">Error: {error}</p>;
  }

  // ✅ Lowest price helper

  return (
    <div className="px-4 md:px-8 lg:px-12 py-10">
  
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
      
        
        {products.map((product) => {
          const lowestVariant = getLowestVariant(product);

          const price = lowestVariant?.price || 0;
          const originalPrice = lowestVariant?.originalPrice || price;

          const discount =
            originalPrice > price
              ? Math.round(((originalPrice - price) / originalPrice) * 100)
              : 0;
          return (
            <Link
              key={product._id}
              to={`/products/${product._id}`}
              className="block group"
            >
              <div className="bg-white border border-neutral-200 rounded-xl overflow-hidden hover:shadow-md transition">
                {/* IMAGE */}
                <div className="w-full h-64 overflow-hidden">
                  <img
                    src={product.images?.[0]?.url || "/placeholder.png"}
                    alt={product.images?.[0]?.altText || product.name}
                    className="w-full h-full object-cover transition duration-500 group-hover:scale-110"
                  />
                </div>

                {/* CONTENT */}
                <div className="p-4 text-center">
                  <h3 className="font-dm-serif text-heading text-lg truncate">
                    {product.name}
                  </h3>

                  {/* PRICE */}
                  <div className="mt-2">
                    <div className="flex justify-center items-center gap-2">
                      <span className="text-lg font-bold text-primary-500">
                        ₹{price}
                      </span>

                      {discount > 0 && (
                        <>
                          <span className="text-sm text-gray-400 line-through">
                            ₹{originalPrice}
                          </span>

                          <span className="text-xs bg-green-100 text-primary-700 px-2 py-1 rounded">
                            {discount}% OFF
                          </span>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default ProductGrid;
