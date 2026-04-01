import React, { useEffect, useRef, useState } from "react";
import { FiFilter } from "react-icons/fi";
import FilterSidebar from "../components/Products/FilterSidebar";
import SortOptions from "../components/Products/SortOptions.jsx";
import ProductGrid from "../components/Products/ProductGrid";

const CollectionPage = () => {
  const [products, setProducts] = useState([]);
  const sidebarRef = useRef(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

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

  useEffect(() => {
    // Simulate fetching products for the collection

    setTimeout(() => {
      const fetchedProducts = [
        {
          _id: "1",
          name: "Sharbati Wheat",
          price: 250,
          images: [
            {
              url: "https://picsum.photos/500/500?random=1",
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
              url: "https://picsum.photos/500/500?random=2",
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
              url: "https://picsum.photos/500/500?random=3",
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
              url: "https://picsum.photos/500/500?random=4",
              altText: "Sharbati Wheat",
            },
          ],
        },
        {
          _id: "5",
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
          _id: "6",
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
          _id: "7",
          name: "Sharbati Wheat",
          price: 250,
          images: [
            {
              url: "https://picsum.photos/500/500?random=7",
              altText: "Sharbati Wheat",
            },
          ],
        },
        {
          _id: "8",
          name: "Sharbati Wheat",
          price: 250,
          images: [
            {
              url: "https://picsum.photos/500/500?random=8",
              altText: "Sharbati Wheat",
            },
          ],
        },
      ];
      setProducts(fetchedProducts);
    }, 1000);
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
        <h2 className="text-2xl font-dm-serif mb-4">All Products</h2>

        {/* Sort Options */}
        <SortOptions />

        {/* Product Grid */}
        <ProductGrid products={products} />
      </div>
    </div>
  );
};

export default CollectionPage;
