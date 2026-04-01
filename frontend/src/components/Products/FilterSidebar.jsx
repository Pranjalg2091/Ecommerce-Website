import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

const FilterSidebar = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const [filters, setFilters] = useState({
    category: "",
    sizes: [],
    grindingSlots: [],
  });

  const categories = ["Wheat", "Wheat Flour", "Organic Grains"];

  const sizes = ["1kg", "5kg", "10kg", "25kg"];

  const grindingSlots = [
    "9:00 AM - 10:00 AM",
    "10:00 AM - 11:00 AM",
    "11:00 AM - 12:00 PM",
    "4:00 PM - 5:00 PM",
    "5:00 PM - 6:00 PM",
    "6:00 PM - 7:00 PM",
    "7:00 PM - 8:00 PM",
    "8:00 PM - 9:00 PM",
  ];

//   useEffect(() => {
//     const params = Object.fromEntries([...searchParams]);
//     setFilters({
//       category: params.category || "",
//       sizes: params.size || [],
//       grindingSlots: params.grindingSlots || [],
//     });
//   }, [searchParams]);

  useEffect(() => {
    setSearchParams({}); // URL clean
  }, []);

  //   Handle filter changes and update URL search params
  const handleFilterChange = (e) => {
    const { name, value, checked, type } = e.target;
    let newFilters = { ...filters };

    if (type === "checkbox") {
      if (checked) {
        newFilters[name] = [...(newFilters[name] || []), value];
      } else {
        newFilters[name] = newFilters[name].filter((item) => item !== value);
      }
    } else {
      newFilters[name] = value;
    }
    setFilters(newFilters);
    updateURLParams(newFilters);
  };

  const updateURLParams = (newFilters) => {
    const params = new URLSearchParams();

    Object.keys(newFilters).forEach((key) => {
      if (Array.isArray(newFilters[key]) && newFilters[key].length > 0) {
        params.set(key, newFilters[key].join(","));
      } else if (newFilters[key]) {
        params.set(key, newFilters[key]);
      }
    });
    setSearchParams(params);
    // navigate(`?${params.toString()}`);
  };

  return (
    <div className="p-4 font-manrope">
      <h3 className="text-xl font-dm-serif text-heading mb-4">Filter</h3>

      {/* Category Filter */}
      <div className="mb-6 font-manrope">
        <label className="block text-sm font-medium text-heading mb-2">
          Category
        </label>
        {categories.map((category) => (
          <div key={category} className="flex items-center mb-2">
            <input
              type="radio"
              id={category}
              name="category"
              value={category}
              checked={filters.category === category}
              onChange={handleFilterChange}
              className="mr-2 w-4 h-4 accent-info focus:ring-0 focus:ring-info-hover transition-all"
            />
            <span className="text-sm text-body">{category}</span>
          </div>
        ))}
      </div>

      {/* Size Filter */}
      <div className="mb-6 font-manrope">
        <label className="block text-sm font-medium text-heading mb-2">
          Size
        </label>
        {sizes.map((size) => (
          <div key={size} className="flex items-center mb-2">
            <input
              type="checkbox"
              id={size}
              name="sizes"
              value={size}
              checked={filters.sizes.includes(size)}
              onChange={handleFilterChange}
              className="mr-2 w-4 h-4 accent-info focus:ring-0 focus:ring-info-hover transition-all"
            />
            <span className="text-sm text-body">{size}</span>
          </div>
        ))}
      </div>

      {/* Grinding Slots Filter */}

      <div className="mb-6 font-manrope">
        <label className="block text-sm font-medium text-heading mb-2">
          Grinding Slots
        </label>
        {grindingSlots.map((slot) => (
          <div key={slot} className="flex items-center mb-2">
            <input
              type="checkbox"
              id={slot}
              name="grindingSlots"
              value={slot}
              checked={filters.grindingSlots.includes(slot)}
              onChange={handleFilterChange}
              className="mr-2 w-4 h-4 accent-info focus:ring-0 focus:ring-info-hover transition-all"
            />
            <span className="text-sm text-body">{slot}</span>
          </div>
        ))}
      </div>
      {/* Filter Sidebar Closed */}
    </div>
  );
};

export default FilterSidebar;
