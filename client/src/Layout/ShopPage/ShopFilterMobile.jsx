import React from 'react';
import { FaStar } from 'react-icons/fa6';

const ShopFilterMobile = ({ setResponsiveFilterMenu, ResponsiveFilterMenu }) => {
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
  <div style={{padding:8}}
    className={`
      fixed top-0 left-0 w-full z-20 bg-bg-secondary border-b-2
      transform transition-transform duration-300 ease-in-out
      ${ResponsiveFilterMenu ? 'translate-y-0' : '-translate-y-full'}
      flex flex-col items-center gap-4 p-4
    `}
  >
    <h3 className="text-xl font-semibold mb-2">Filter Options</h3>

    <div className="w-full flex flex-col gap-4 " style={{padding:4}}>
      <div>
        <label className="block text-sm text-gray-700 mb-1">Min Price</label>
        <input
          type="number"
          name="minPrice"
          className="w-full border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 p-2"
          placeholder="e.g. 10"
        />
      </div>

      <div>
        <label className="block text-sm text-gray-700 mb-1">Max Price</label>
        <input
          type="number"
          name="maxPrice"
          className="w-full border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 p-2"
          placeholder="e.g. 100"
        />
      </div>

      <div>
        <label className="block text-sm text-gray-700 mb-1">Ratings</label>
        <select className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-btn-primary">
          <option value="any">Any <FaStar /></option>
          <option value="1">1 <FaStar /></option>
          <option value="2">2 <FaStar /></option>
          <option value="3">3 <FaStar /></option>
          <option value="4">4 <FaStar /></option>
          <option value="5">5 <FaStar /></option>
        </select>
      </div>

        <div>
        <label className="block text-sm text-gray-700 mb-1">Category</label>
        <select className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-btn-primary">
          <option value="any">Any <FaStar /></option>
          <option value="1">Laptop</option>
          <option value="2">Headset</option>
          <option value="3">Console</option>
          <option value="4">Monitor</option>
        </select>
      </div>

      <div className="flex justify-between mt-4 w-full">
        <button
          onClick={() => setResponsiveFilterMenu(false)}
          className="w-24 h-10 rounded-3xl text-btn-danger"
        >
          Cancel
        </button>
        <button className="w-20 h-10 bg-btn-primary rounded-3xl text-white">
          Apply
        </button>
      </div>
    </div>
  </div>
</div>

  );
};

export default ShopFilterMobile;
