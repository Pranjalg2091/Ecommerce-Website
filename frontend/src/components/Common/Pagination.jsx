import React from "react";
import { LuChevronFirst, LuChevronLast } from "react-icons/lu";
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";

const Pagination = ({
  currentPage,
  totalItems,
  itemsPerPage,
  onPageChange,
  onLimitChange,
}) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const start = totalItems === 0 ? 0 : (currentPage - 1) * itemsPerPage + 1;
  const end = Math.min(currentPage * itemsPerPage, totalItems);

  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage === totalPages;

  return (
    <div
      className="flex items-center justify-end gap-10 
                    px-4 py-4 mt-2 
                    text-sm text-gray-600 bg-white"
    >
      {/* Rows per page */}
      <div className="flex items-center gap-2">
        <span className="whitespace-nowrap">Rows per page:</span>

        <select
          value={itemsPerPage}
          onChange={(e) => onLimitChange(Number(e.target.value))}
          className="bg-transparent outline-none cursor-pointer"
        >
          {[5, 10, 20, 50].map((num) => (
            <option key={num} value={num}>
              {num}
            </option>
          ))}
        </select>
      </div>

      {/* Range */}
      <span className="whitespace-nowrap">
        {start}-{end} of {totalItems}
      </span>

      {/* Controls */}
      <div className="flex items-center gap-1">
        {/* FIRST */}
        <button
          onClick={() => onPageChange(1)}
          disabled={isFirstPage}
          className={`p-1.5 rounded-md transition-all duration-200
            ${
              isFirstPage
                ? "opacity-30 cursor-not-allowed"
                : "hover:bg-gray-100 active:scale-95"
            }`}
        >
          <LuChevronFirst size={18} />
        </button>

        {/* PREVIOUS */}
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={isFirstPage}
          className={`p-1.5 rounded-md transition-all duration-200
            ${
              isFirstPage
                ? "opacity-30 cursor-not-allowed"
                : "hover:bg-gray-100 active:scale-95"
            }`}
        >
          <IoIosArrowBack size={18} />
        </button>

        {/* NEXT */}
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={isLastPage}
          className={`p-1.5 rounded-md transition-all duration-200
            ${
              isLastPage
                ? "opacity-30 cursor-not-allowed"
                : "hover:bg-gray-100 active:scale-95"
            }`}
        >
          <IoIosArrowForward size={18} />
        </button>

        {/* LAST */}
        <button
          onClick={() => onPageChange(totalPages)}
          disabled={isLastPage}
          className={`p-1.5 rounded-md transition-all duration-200
            ${
              isLastPage
                ? "opacity-30 cursor-not-allowed"
                : "hover:bg-gray-100 active:scale-95"
            }`}
        >
          <LuChevronLast size={18} />
        </button>
      </div>
    </div>
  );
};

export default Pagination;
