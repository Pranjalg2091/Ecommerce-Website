import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { AiOutlineEdit } from "react-icons/ai";
import { AiOutlineDelete } from "react-icons/ai";
import { LuPlus } from "react-icons/lu";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteProduct,
  fetchAdminProducts,
} from "../../redux/slices/adminProductSlice";
import Pagination from "../Common/Pagination";
import { IoArrowBack } from "react-icons/io5";

const ProductManagement = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { products, loading, error } = useSelector(
    (state) => state.adminProducts,
  );

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const currentProducts = products.slice(indexOfFirst, indexOfLast);

  useEffect(() => {
    dispatch(fetchAdminProducts());
  }, [dispatch]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentPage]);

  const location = useLocation();

  const [selectedVariants, setSelectedVariants] = useState({});

  const handleVariantSelect = (productId, index) => {
    setSelectedVariants((prev) => ({
      ...prev,
      [productId]: index,
    }));
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete the Product")) {
      dispatch(deleteProduct(id));
    }
  };

  if (loading) return <p>Loading...</p>;

  if (error) return <p>Error: {error}</p>;

  return (
    <div className="max-w-7xl mx-auto p-6 font-manrope">
      
       {/* 🔙 HEADER WITH BACK */}
      <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
        
        <div className="flex items-center gap-3">
          <button
            onClick={() => window.history.back()}
            className="p-2 rounded-md hover:bg-gray-100 transition"
          >
            <IoArrowBack className="text-xl" />
          </button>

          <h2 className="text-xl md:text-2xl font-dm-serif">
            Product Management
          </h2>
        </div>
      </div>

      <div className="flex justify-end mb-4">
        <Link
          to="/admin/products/create"
          className="flex items-center gap-2 bg-secondary-500 hover:bg-secondary-600 text-white px-5 py-2 rounded transition"
        >
          <LuPlus className="text-lg text-white" />
          <span>Add Product</span>
        </Link>
      </div>

      <div className="overflow-x-auto shadow-md sm:rounded-lg">
        <table className="min-w-full text-left text-sm  bg-white text-body">
          <thead className="bg-neutral-100 uppercase text-heading">
            <tr>
              <th className="px-4 py-3">Image</th>
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">SKU</th>
              <th className="px-4 py-3">Created</th>
              <th className="px-4 py-3">Price</th>
              <th className="px-4 py-3">Variants</th>
              <th className="px-4 py-3">Stock</th>
              <th className="px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.length > 0 ? (
              currentProducts.map((product) => (
                <tr
                  key={product._id}
                  onClick={() => navigate(`/admin/products/${product._id}`)}
                  className="cursor-pointer"
                >
                  {/* IMAGE */}
                  <td className="p-4">
                    <img
                      src={product.images?.[0]?.url || "/placeholder.png"}
                      alt={product.name}
                      className="w-14 h-14 object-cover rounded-md border border-border"
                    />
                  </td>

                  {/* NAME */}
                  <td className="p-4 font-medium">{product.name}</td>

                  {/* SKU */}
                  <td className="p-4">{product.sku}</td>

                  {/* CREATED */}
                  <td className="p-4 text-body">
                    {new Date(product.createdAt).toLocaleString()}
                  </td>

                  {/* PRICE */}
                  <td className="p-4">
                    {(() => {
                      const selectedIndex =
                        selectedVariants[product._id] !== undefined
                          ? selectedVariants[product._id]
                          : 0;

                      // ✅ YAHI ADD KARNA THA
                      const selected =
                        product.sizes[selectedIndex] || product.sizes[0];

                      return (
                        <span className="text-body">₹{selected.price}</span>
                      );
                    })()}
                  </td>

                  {/* VARIANTS */}
                  <td className="p-4">
                    <select
                      value={
                        selectedVariants[product._id] !== undefined
                          ? selectedVariants[product._id]
                          : 0
                      }
                      onChange={(e) =>
                        setSelectedVariants((prev) => ({
                          ...prev,
                          [product._id]: Number(e.target.value),
                        }))
                      }
                      className="border border-border rounded px-2 py-1 bg-white"
                    >
                      {product.sizes.map((size, index) => (
                        <option key={index} value={index}>
                          {size.weight}
                        </option>
                      ))}
                    </select>
                  </td>

                  {/* STOCK */}
                  <td className="p-4">
                    <span
                      className={`px-3 py-1 rounded text-sm font-medium whitespace-nowrap 
                        ${
                          product.countInStock > 0
                            ? "bg-green-100 text-success"
                            : "bg-red-100 text-error"
                        }`}
                    >
                      {product.countInStock > 0
                        ? `${product.countInStock} in stock`
                        : "Out of stock"}
                    </span>
                  </td>

                  {/* Action Buttons */}
                  <td className="p-4 flex items-center gap-3">
                    {/* Edit */}
                    <div className="relative group inline-block">
                      <Link
                        to={`/admin/products/${product._id}/edit`}
                        className="w-10 h-10 flex items-center justify-center rounded-full 
                 border border-border text-body
                 hover:bg-warning hover:text-white transition-all duration-200"
                      >
                        <AiOutlineEdit className="text-lg" />
                      </Link>

                      {/* Tooltip */}
                      <div
                        className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2
                 opacity-0 group-hover:opacity-100
                 transition-all duration-200 pointer-events-none"
                      >
                        <div className="bg-gray-800 text-white text-xs px-3 py-1.5 rounded-md shadow-md">
                          Edit
                        </div>
                        <div className="w-2 h-2 bg-gray-800 rotate-45 mx-auto -mt-1"></div>
                      </div>
                    </div>

                    {/* Delete */}
                    <div className="relative group inline-block">
                      <button
                        onClick={() => handleDelete(product._id)}
                        className="w-10 h-10 flex items-center justify-center rounded-full 
                                     border border-border text-body 
                                     hover:bg-error hover:text-white transition-all duration-200"
                      >
                        <AiOutlineDelete className="text-lg" />
                      </button>

                      {/* Tooltip */}
                      <div
                        className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2
                 opacity-0 group-hover:opacity-100
                 transition-all duration-200 pointer-events-none"
                      >
                        <div className="bg-gray-800 text-white text-xs px-3 py-1.5 rounded-md shadow-md">
                          Delete
                        </div>
                        <div className="w-2 h-2 bg-gray-800 rotate-45 mx-auto -mt-1"></div>
                      </div>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className="px-4 py-3 text-center">
                  No products found.
                </td>
              </tr>
            )}
          </tbody>
        </table>

        <div className="mt-4 px-2">
          <Pagination
            currentPage={currentPage}
            totalItems={products.length}
            itemsPerPage={itemsPerPage}
            onPageChange={(page) => setCurrentPage(page)}
            onLimitChange={(limit) => {
              setItemsPerPage(limit);
              setCurrentPage(1); // reset page
            }}
          />
        </div>

      </div>
    </div>
  );
};

export default ProductManagement;
