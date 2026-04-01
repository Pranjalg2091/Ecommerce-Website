import React from 'react'
import { useSearchParams } from 'react-router-dom';

const SortOptions = () => {
    const[searchParams, setSearchParams] = useSearchParams();

    const handleSortChange = (e) => {
        const sortBy = e.target.value;
        searchParams.set("sortBy", sortBy);
        setSearchParams(searchParams);
    };

  return (
    <div className='mb-4 flex items-center justify-end'>
        <select name="sort" id="sort" 
        onChange={handleSortChange}
        value={searchParams.get("sortBy") || ""}
        className='border border-border p-2 rounded-sm focus:outline-none'>
            <option value="">Sort By</option>
            <option value="priceAsc">Price: Low to High</option>
            <option value="priceDesc">Price: High to Low</option>
            <option value="popularity">Popularity</option>
        </select>
    </div>
  )
}

export default SortOptions