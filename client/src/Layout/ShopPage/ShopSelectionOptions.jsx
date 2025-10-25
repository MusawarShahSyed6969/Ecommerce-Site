import React, { useState, useEffect } from "react";
import { LuSearch } from "react-icons/lu";
import { useDispatch, useSelector } from "react-redux";
import { setFilters, clearFilters } from "../../redux/slices/productSlice";
import { getCategories } from "../../redux/slices/categorySlice";
import { FilterCards, RatingFilterCard } from "./FilterCards";

const ShopSelectionOptions = () => {
  const dispatch = useDispatch();
  
  // 🔹 Local state for UI control
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [brand, setBrand] = useState("");
  // const [MinPrice, setMinPrice] = useState(1);
   const [MaxPrice, setMaxPrice] = useState(500000);
  const [rating, setRating] = useState(3);

  // 🔹 Redux categories state
  const { items: categories, loading } = useSelector((state) => state.categories);

  // 🔹 Fetch categories on mount
  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

  // 🔹 Filter Handlers
  const handleSearch = () => dispatch(setFilters({ search }));

  const handleCategory = (e) => {
    const value = e.target.value;
    setCategory(value);
    dispatch(setFilters({ category: value }));
  };

  const handleBrand = (e) => {
    const value = e.target.value;
    setBrand(value);
    dispatch(setFilters({ brand: value }));
  };

  const handlePriceChange = (value) => {
     setMaxPrice(value);
     
     dispatch(setFilters({ maxPrice: value }));
  };

  const handleRatingChange = (value) => {
    setRating(value);
    dispatch(setFilters({ minRating: value }));
  };

  const resetFilters = () => {
    setSearch("");
    setCategory("");
    setBrand("");
    // setMaxPrice(1);
    setRating(3);
    dispatch(clearFilters());
  };

  return (
    <div className="hidden md:block w-full">
      <div className="flex flex-col gap-8 justify-start w-full" style={{ paddingTop: 32 }}>
        {/* 🔍 Search Bar */}
        <div className="flex w-full justify-center" style={{ marginBottom: 24 }}>
          <input
            type="text"
            placeholder="Enter Product Name"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border-2 border-gray-200 rounded-l-md w-full"
            style={{ padding: "10px 20px" }}
          />
          <button
            onClick={handleSearch}
            className="bg-blue-600 text-white rounded-r-md"
            style={{ padding: "13px 20px" }}
          >
            <LuSearch size={20} />
          </button>
        </div>

        {/* 🧩 Category Filter */}
        <div className="flex gap-4 justify-between items-center w-full" style={{ marginBottom: 16 }}>
          <p className="text-gray-600 text-sm font-medium">Category:</p>
          <select
            value={category}
            onChange={handleCategory}
            className="border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 text-sm w-3/4"
            style={{ padding: "8px 12px" }}
          >
            <option value="">All</option>
            {loading && <option>Loading...</option>}
            {!loading && categories.map((cat) => (
              <option key={cat._id} value={cat.name}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>

        {/* 🏷️ Brand Filter */}
        <div className="flex gap-4 justify-between items-center w-full" style={{ marginBottom: 16 }}>
          <p className="text-gray-600 text-sm font-medium">Brand:</p>
          <select
            value={brand}
            onChange={handleBrand}
            className="border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 text-sm w-3/4"
            style={{ padding: "8px 12px" }}
          >
            <option value="">All</option>
            <option value="Apple">Apple</option>
            <option value="Samsung">Samsung</option>
            <option value="Sony">Sony</option>
          </select>
        </div>

        {/* 💰 Price Filter */}
        <div style={{ marginBottom: 16 }} className="w-full">
          <FilterCards name="Price" onPriceChange={handlePriceChange} />
        </div>

        {/* ⭐ Ratings Filter */}
        <div style={{ marginBottom: 16 }} className="w-full">
          <RatingFilterCard name="Ratings" onRatingChange={handleRatingChange} />
        </div>

        {/* 🔄 Reset Button */}
        <button
          onClick={resetFilters}
          className="bg-gray-300 text-black font-medium rounded-md hover:bg-gray-400 transition-all w-full"
          style={{ padding: "10px 20px" }}
        >
          Reset Filters
        </button>
      </div>
    </div>
  );
};

export default ShopSelectionOptions;
