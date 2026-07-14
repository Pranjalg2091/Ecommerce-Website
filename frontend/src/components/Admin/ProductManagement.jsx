import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineEdit } from "react-icons/ai";
import { AiOutlineDelete } from "react-icons/ai";
import { LuPlus } from "react-icons/lu";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteProduct,
  fetchAdminProducts,
} from "../../redux/slices/adminProductSlice.js";
import Pagination from "../Common/Pagination.jsx";
import { BsBoxSeam } from "react-icons/bs";
import { FiFilter, FiSearch } from "react-icons/fi";
import Skeleton from "../Common/Skeleton.jsx";

const ProductManagement = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { products, loading, error } = useSelector(
    (state) => state.adminProducts,
  );

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [stockFilter, setStockFilter] = useState("all");
  const [sortBy, setSortBy] = useState("latest");

  const [selectedProducts, setSelectedProducts] = useState([]);

  const categories = ["all", ...new Set(products.map((p) => p.category))];

  const filteredProducts = [...products]
    .filter((product) => {
      const matchesSearch =
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.sku.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesCategory =
        categoryFilter === "all" || product.category === categoryFilter;

      const matchesStock =
        stockFilter === "all"
          ? true
          : stockFilter === "in"
            ? product.countInStock > 0
            : product.countInStock === 0;

      return matchesSearch && matchesCategory && matchesStock;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "latest":
          return new Date(b.createdAt) - new Date(a.createdAt);

        case "oldest":
          return new Date(a.createdAt) - new Date(b.createdAt);

        case "name":
          return a.name.localeCompare(b.name);

        default:
          return 0;
      }
    });

  const indexOfLast = currentPage * itemsPerPage;

  const indexOfFirst = indexOfLast - itemsPerPage;

  const currentProducts = filteredProducts.slice(indexOfFirst, indexOfLast);

  const handleSelectProduct = (id) => {
    setSelectedProducts((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
    );
  };

  const handleSelectAll = () => {
    if (selectedProducts.length === currentProducts.length) {
      setSelectedProducts([]);
    } else {
      setSelectedProducts(currentProducts.map((p) => p._id));
    }
  };

  const handleBulkDelete = () => {
    if (selectedProducts.length === 0) return;
    if (
      window.confirm(`Delete ${selectedProducts.length} selected products?`)
    ) {
      selectedProducts.forEach((id) => dispatch(deleteProduct(id)));
      setSelectedProducts([]);
    }
  };

  useEffect(() => {
    dispatch(fetchAdminProducts());
  }, [dispatch]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentPage]);

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

  if (loading) {
    return (
      <div className="mx-auto max-w-7xl px-6 py-8">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <Skeleton className="h-9 w-48 rounded-lg" />
            <Skeleton className="mt-3 h-4 w-80 rounded-lg" />
          </div>
          <Skeleton className="h-11 w-44 rounded-xl" />
        </div>

        {/* Toolbar */}
        <div className="mb-6 rounded-2xl border border-border bg-white p-5">
          <Skeleton className="h-11 w-full rounded-xl" />
        </div>

        {/* Table */}
        <div className="overflow-hidden rounded-2xl border border-border bg-white">
          {[...Array(10)].map((_, index) => (
            <div
              key={index}
              className="flex items-center gap-6 border-b border-border px-6 py-5"
            >
              <Skeleton className="h-14 w-14 rounded-xl" />
              <div className="flex-1">
                <Skeleton className="h-5 w-52 rounded" />
                <Skeleton className="mt-2 h-4 w-28 rounded" />
              </div>
              <Skeleton className="h-8 w-20 rounded-lg" />
              <Skeleton className="h-8 w-28 rounded-lg" />
              <Skeleton className="h-9 w-24 rounded-lg" />

              <div className="flex gap-3">
                <Skeleton className="h-10 w-10 rounded-full" />
                <Skeleton className="h-10 w-10 rounded-full" />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) return <p>Error: {error}</p>;

  return (
    <div className="space-y-8 font-manrope">
      {/* Products Header */}
      <div className="mb-8 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5">
        {/* Left */}
        <div>
          <h1 className="font-dm-serif text-2xl md:text-3xl text-heading">
            Products
          </h1>
          <p className="mt-2 text-sm text-body">
            Manage your product catalog, inventory, pricing and availability.
          </p>
        </div>

        {/* Right */}
        <div className="flex items-center gap-4">
          {/* Total Products */}
          <div className="flex items-center gap-3 rounded-xl border border-border bg-neutral-50 px-5 py-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-primary-100">
              <BsBoxSeam className="text-xl text-primary-600" />
            </div>
            <div className="flex items-center gap-2 rounded-full bg-neutral-100 px-4 py-2">
              <span className="text-sm text-neutral-600">Total Products</span>
              <span className="rounded-full bg-primary-500 px-3 py-1 text-sm font-semibold text-white">
                {products.length}
              </span>
            </div>
          </div>

          {/* Add Product */}
          <Link
            to="/admin/products/create"
            className="inline-flex h-[45px] items-center gap-2 rounded-md bg-primary-500 px-6 text-sm text-white transition-all duration-200 hover:bg-primary-600 hover:shadow-md"
          >
            <LuPlus className="text-xl" />
            Add Product
          </Link>
        </div>
      </div>

      {/* Filtered Products */}
      <div className="mb-6 rounded-xl border border-border bg-white p-5 shadow-sm">
        <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
          <div className="flex flex-1 flex-wrap items-center gap-3">
            {/* Search */}
            <div className="relative w-full md:w-80">
              <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-lg text-neutral-400" />
              <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="h-11 w-full rounded-md border border-border pl-10 pr-4 outline-none transition focus:border-primary-500"
              />
            </div>

            {/* Category */}
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="h-11 rounded-md border border-border bg-white px-4"
            >
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category === "all" ? "All Categories" : category}
                </option>
              ))}
            </select>

            {/* Stock */}
            <select
              value={stockFilter}
              onChange={(e) => setStockFilter(e.target.value)}
              className="h-11 rounded-md border border-border bg-white px-4"
            >
              <option value="all">All Stock</option>
              <option value="in">In Stock</option>
              <option value="out">Out of Stock</option>
            </select>

            {/* Sort */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="h-11 rounded-md border border-border bg-white px-4"
            >
              <option value="latest">Newest</option>
              <option value="oldest">Oldest</option>
              <option value="name">Name (A-Z)</option>
            </select>
          </div>
        </div>
        <div className="mt-4 flex items-center justify-between border-t border-border pt-4">
          <p className="text-sm text-neutral-500">
            Showing
            <span className="mx-1 font-semibold text-heading">
              {currentProducts.length}
            </span>
            of
            <span className="mx-1 font-semibold text-heading">
              {filteredProducts.length}
            </span>
            products
          </p>
        </div>
      </div>

      {/* Bulk Actions Bar */}
      {selectedProducts.length > 0 && (
        <div className="mb-5 flex items-center justify-between rounded-xl border border-primary-200 bg-primary-50 px-5 py-4">
          <div>
            <p className="font-semibold text-heading">
              {selectedProducts.length} product selected
            </p>
            <p className="text-sm text-body">Choose an action</p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => setSelectedProducts([])}
              className="rounded-lg border border-border bg-white px-5 py-2 text-sm"
            >
              Clear
            </button>
            <button
              onClick={handleBulkDelete}
              className="rounded-lg bg-error px-5 py-2 text-sm font-medium text-white hover:bg-error-hover"
            >
              Delete Selected
            </button>
          </div>
        </div>
      )}

      {/* Products Lists */}
      <div className="overflow-hidden rounded-xl border border-border bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="min-w-full table-fixed text-left">
            <thead className="border-b border-border bg-neutral-100 text-xs uppercase tracking-wider text-neutral-500">
              <tr>
                <th className="w-14 px-4 py-4">
                  <input
                    type="checkbox"
                    checked={
                      currentProducts.length > 0 &&
                      selectedProducts.length === currentProducts.length
                    }
                    onChange={handleSelectAll}
                    className="h-4 w-4 accent-primary-500"
                  />
                </th>
                <th className="px-6 py-4">Product</th>
                <th className="px-4 py-4">SKU</th>
                <th className="px-4 py-4">Added On</th>
                <th className="px-4 py-4">Price</th>
                <th className="px-4 py-4">Variant</th>
                <th className="px-4 py-4">Stock</th>
                <th className="px-4 py-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.length > 0 ? (
                currentProducts.map((product) => (
                  <tr
                    key={product._id}
                    onClick={() => navigate(`/admin/products/${product._id}`)}
                    className="cursor-pointer text-sm text-body border-b border-border transition-all duration-200 hover:bg-primary-50"
                  >
                    {/* Checkbox */}
                    <td
                      className="px-4 py-5"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <input
                        type="checkbox"
                        checked={selectedProducts.includes(product._id)}
                        onChange={() => handleSelectProduct(product._id)}
                        className="h-4 w-4 accent-primary-500"
                      />
                    </td>
                    {/* IMAGE and Name*/}
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-4">
                        <img
                          src={product.images?.[0]?.url || "/placeholder.png"}
                          alt={product.name}
                          className="h-14 w-14 rounded-lg border border-border object-cover"
                        />
                        <div>
                          <h3 className="font-bold leading-5 text-heading">
                            {product.name}
                          </h3>
                          <p className="mt-1">{product.category}</p>
                        </div>
                      </div>
                    </td>

                    {/* SKU */}
                    <td className="px-4 py-5">
                      <span className="rounded-md bg-neutral-100 px-3 py-1 text-xs">
                        {product.sku}
                      </span>
                    </td>

                    {/* CREATED */}
                    <td className="px-4 py-5">
                      <div className="leading-5">
                        <p className="font-medium">
                          {new Date(product.createdAt).toLocaleDateString(
                            "en-GB",
                            {
                              day: "2-digit",
                              month: "short",
                              year: "numeric",
                            },
                          )}
                        </p>
                        <p className="text-xs text-neutral-500">
                          {new Date(product.createdAt).toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </p>
                      </div>
                    </td>

                    {/* PRICE */}
                    <td className="px-4 py-5">
                      {(() => {
                        const selectedIndex =
                          selectedVariants[product._id] ?? 0;
                        const selected =
                          product.sizes[selectedIndex] || product.sizes[0];
                        return (
                          <div>
                            <p className="font-medium text-heading">
                              ₹{selected.price}
                            </p>
                            {selected.originalPrice > selected.price && (
                              <p className="text-xs text-neutral-400 line-through">
                                ₹{selected.originalPrice}
                              </p>
                            )}
                          </div>
                        );
                      })()}
                    </td>

                    {/* VARIANTS */}
                    <td className="px-4 py-5">
                      <select
                        value={
                          selectedVariants[product._id] !== undefined
                            ? selectedVariants[product._id]
                            : 0
                        }
                        onClick={(e) => e.stopPropagation()}
                        onChange={(e) =>
                          setSelectedVariants((prev) => ({
                            ...prev,
                            [product._id]: Number(e.target.value),
                          }))
                        }
                        className="h-10 w-18 rounded-lg border border-border bg-white px-2 text-sm focus:border-primary-500 outline-none transition"
                      >
                        {product.sizes.map((size, index) => (
                          <option key={index} value={index}>
                            {size.weight}
                          </option>
                        ))}
                      </select>
                    </td>

                    {/* STOCK */}
                    <td className="px-4 py-5">
                      <span
                        className={`inline-flex h-8 items-center rounded-md px-3 text-sm font-medium whitespace-nowrap
                          ${
                            product.countInStock > 0
                              ? "bg-green-50 text-success"
                              : "bg-red-50 text-error"
                          }`}
                      >
                        {product.countInStock > 0
                          ? `${product.countInStock} in stock`
                          : "Out of stock"}
                      </span>
                    </td>

                    {/* Action Buttons */}
                    <td className="px-4 py-5">
                      <div className="flex justify-center items-center gap-3">
                        {/* Edit */}
                        <div className="relative group inline-block">
                          <Link
                            to={`/admin/products/${product._id}/edit`}
                            onClick={(e) => e.stopPropagation()}
                            className="w-11 h-11 flex items-center justify-center rounded-xl border border-border text-body hover:bg-warning hover:text-white transition-all duration-200"
                          >
                            <AiOutlineEdit className="text-lg" />
                          </Link>

                          {/* Tooltip */}
                          <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all duration-200 pointer-events-none">
                            <div className="bg-gray-800 text-white text-xs px-3 py-1.5 rounded-md shadow-md">
                              Edit
                            </div>
                            <div className="w-2 h-2 bg-gray-800 rotate-45 mx-auto -mt-1"></div>
                          </div>
                        </div>

                        {/* Delete */}
                        <div className="relative group inline-block">
                          <button
                            onClick={(e) => e.stopPropagation()}
                            onClick={() => handleDelete(product._id)}
                            className="w-11 h-11 flex items-center justify-center rounded-xl border border-border text-body hover:bg-error hover:text-white transition-all duration-200"
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
              totalItems={filteredProducts.length}
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
    </div>
  );
};

export default ProductManagement;
