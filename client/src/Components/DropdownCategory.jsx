import React from "react";
import { NavLink } from "react-router";

const DropdownCategory = () => {
  const brands = [
    "Sony",
    "Nvidia",
    "ASUS",
    "AMD",
    "Microsoft",
    "Games",
    "Apple",
  
  ];

  return (
    <div style={{padding:8}}
      className="
        absolute left-1/2 top-full 
        -translate-x-1/2 
        mt-3 
        w-[500px] 
        bg-white shadow-xl rounded-xl 
        p-8 grid grid-cols-2 gap-x-12 gap-y-2 
        z-50
      "
    >
      {/* Header */}
      <div className="col-span-2 flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-800 tracking-wide">
          SHOP BY BRAND
        </h2>
        <NavLink
          to="/brands"
          className="text-blue-600 hover:underline text-sm font-medium"
        >
          See All
        </NavLink>
      </div>

      {/* Divider */}
      <div className="col-span-2 border-t border-gray-200 mb-4"></div>

      {/* Brand list */}
      {brands.map((brand, i) => (
        <NavLink
          key={i}
          to={`/shop?brand=${brand.toLowerCase()}`}
          className="text-gray-700 hover:text-blue-600 text-base py-1"
        >
          {brand}
        </NavLink>
      ))}
    </div>
  );
};

export default DropdownCategory;
