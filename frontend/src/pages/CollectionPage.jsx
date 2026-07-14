import React, { useEffect, useRef, useState } from "react";
import { FiFilter } from "react-icons/fi";
import FilterSidebar from "../components/Products/FilterSidebar";
import SortOptions from "../components/Products/SortOptions.jsx";
import ProductGrid from "../components/Products/ProductGrid";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useSearchParams } from "react-router-dom";
import { fetchProductsByFilters } from "../redux/slices/productSlice.js";
import Breadcrumbs from "../components/Common/Breadcrumbs.jsx";

const CollectionPage = () => {
  const { collection } = useParams();
  const [searchParams] = useSearchParams();
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector((state) => state.products);

  const queryParams = {
    category: searchParams.get("category") || "",
    size: searchParams.get("size") || "",
    grindingSlots: searchParams.get("grindingSlots") || "",
    sortBy: searchParams.get("sortBy") || "",
  };

  const sidebarRef = useRef(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    dispatch(fetchProductsByFilters({ collection, ...queryParams }));
  }, [dispatch, collection, searchParams.toString()]);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleClickOutside = (event) => {
    if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
      setIsSidebarOpen(false);
    }
  };

  useEffect(() => {
    // Add event listener to close sidebar when clicking outside
    document.addEventListener("mousedown", handleClickOutside);
    //Cleanup the event listener
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="flex flex-col lg:flex-row">
      {/* Mobile Filter Button */}
      <button
        onClick={toggleSidebar}
        className="lg:hidden border p-2 flex justify-center items-center mb-4"
      >
        <FiFilter className="mr-2" />
      </button>

      {/* Filter Sidebar (hidden on mobile)  */}
      <div
        ref={sidebarRef}
        className={`${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } fixed inset-y-0 left-0 z-50 w-64 overflow-y-auto bg-white lg:static lg:translate-x-0 mb-4 lg:mb-0 transition-transform duration-300`}
      >
        <FilterSidebar />
      </div>
      <div className="flex-grow p-4">
        {/* Breadcrumbs */}

        <Breadcrumbs
          className="mb-4"
          variant="light"
          items={[
            {
              label: "All Products",
            },
          ]}
        />

        <h2 className="text-2xl font-dm-serif mb-4">All Products</h2>

        {/* Sort Options */}
        <SortOptions />

        {/* Product Grid */}

        <ProductGrid products={products} loading={loading} error={error} />
      </div>
    </div>
  );
};

export default CollectionPage;
