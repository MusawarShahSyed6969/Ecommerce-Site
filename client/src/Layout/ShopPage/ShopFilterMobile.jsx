import React, { useEffect, useState } from 'react';
import { FaStar } from 'react-icons/fa6';
import { useDispatch, useSelector } from "react-redux";
import { setFilters, clearFilters } from "../../redux/slices/productSlice";
import { getCategories } from "../../redux/slices/categorySlice";


const ShopFilterMobile = ({ setResponsiveFilterMenu, ResponsiveFilterMenu }) => {
  const dispatch = useDispatch();

  const { items: categories, loading } = useSelector((state) => state.categories);


  // 🔹 Fetch categories on mount
  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

  const [maxPrice, setMaxPrice] = useState(500000);
  const [rating, setRating] = useState("any");
  const [category, setCategory] = useState("any");

  // 🔹 Handle category change
  const handleCategory = (e) => {
    setCategory(e.target.value);
  };

  // 🔹 Handle rating change
  const handleRating = (e) => {
    setRating(e.target.value);
  };

  // 🔹 Handle max price input
  const handleMaxPrice = (e) => {
    setMaxPrice(e.target.value);
  };

    const resetFilters = () => {
      
      setCategory("");
      setMaxPrice(1);
      setRating(3);
      dispatch(clearFilters());
    };

  // 🔹 Apply filters when "Apply" button is clicked
  const handleApply = () => {


    const filters = {
      maxPrice: maxPrice !== "" ? Number(maxPrice) : undefined,
      minRating: rating !== "any" ? Number(rating) : undefined,
      category: category !== "any" ? category : undefined,


    };



    dispatch(setFilters(filters));
    setResponsiveFilterMenu(false); // close the menu
  };

  return (
    <div className="relative md:hidden">
      {/* Overlay */}
      {ResponsiveFilterMenu && (
        <div
          className="fixed inset-0 bg-black/30 z-10"
          onClick={() => setResponsiveFilterMenu(false)}
        ></div>
      )}

      {/* Sliding menu */}
      <div
        style={{ padding: 8 }}
        className={`
          fixed top-0 left-0 w-full z-20 bg-bg-secondary border-b-2
          transform transition-transform duration-300 ease-in-out
          ${ResponsiveFilterMenu ? 'translate-y-0' : '-translate-y-full'}
          flex flex-col items-center gap-4 p-4
        `}
      >
        <h3 className="text-xl font-semibold mb-2">Filter Options</h3>

        <div className="w-full flex flex-col gap-4" style={{ padding: 4 }}>
          {/* Max Price */}
          <div>
            <label className="block text-sm text-gray-700 mb-1">Max Price</label>
            <input
              type="number"
              name="maxPrice"
              value={maxPrice}
              onChange={handleMaxPrice}
              className="w-full border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 p-2"
              placeholder="e.g. 100"
            />
          </div>

          {/* Ratings */}
          <div>
            <label className="block text-sm text-gray-700 mb-1">Ratings</label>
            <select
              value={rating}
              onChange={handleRating}
              className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-btn-primary"
            >
              <option value="any">Any</option>
              <option value="1">1 </option>
              <option value="2">2 </option>
              <option value="3">3 </option>
              <option value="4">4 </option>
              <option value="5">5 </option>
            </select>
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm text-gray-700 mb-1">Category</label>
            <select
              value={category}
              onChange={handleCategory}
              className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-btn-primary"
            >
              <option value="any">Any</option>
              {loading && <option>Loading...</option>}
              {!loading && categories.map((cat) => (
                <option key={cat._id} value={cat.name}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>

              {/* 🔄 Reset Button */}
        <button
          onClick={resetFilters}
          className="bg-gray-300 text-black font-medium rounded-md hover:bg-gray-400 transition-all w-full"
          style={{ padding: "10px 20px" }}
        >
          Reset Filters
        </button>

          {/* Buttons */}
          <div className="flex justify-between mt-4 w-full">
            <button
              onClick={() => setResponsiveFilterMenu(false)}
              className="w-24 h-10 rounded-3xl text-btn-danger"
            >
              Cancel
            </button>
            <button
              onClick={handleApply} // 🔹 apply logic here
              className="w-20 h-10 bg-btn-primary rounded-3xl text-white"
            >
              Apply
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShopFilterMobile;
