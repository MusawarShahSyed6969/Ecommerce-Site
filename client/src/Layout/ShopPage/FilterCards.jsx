import React, { useState } from 'react'
const FilterCards = ({name}) => {
      const [price, setPrice] = useState(2500);
  const [hoverThumb, setHoverThumb] = useState(false);

  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-4 w-64 h-36 flex flex-col justify-between relative" style={{padding:8}}>
      

      <div className="w-full border-b-2 border-y-gray-200">
        <h2 className="text-lg font-semibold text-gray-800">{name}</h2>
      </div>

      {/* Slider container */}
      <div className="relative w-full flex items-center justify-center">
        {/* Tooltip — only visible when hovering thumb */}
        {hoverThumb && (
          <div
            className="absolute -top-7 text-xs font-semibold text-white bg-blue-500 px-2 py-1 rounded"
            style={{
              left: `${((price - 1) / (5000 - 1)) * 100}%`,
              transform: "translateX(-50%)",
            }}
          >
            ${price}
          </div>
        )}

        {/* Slider */}
        <input
          type="range"
          min="1"
          max="5000"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          onMouseEnter={() => setHoverThumb(true)}
          onMouseLeave={() => setHoverThumb(false)}
          className="w-full accent-blue-500 h-2 rounded-lg appearance-none cursor-pointer bg-gray-200
                     [&::-webkit-slider-thumb]:appearance-none 
                     [&::-webkit-slider-thumb]:w-5 
                     [&::-webkit-slider-thumb]:h-5 
                     [&::-webkit-slider-thumb]:rounded-full 
                     [&::-webkit-slider-thumb]:bg-white 
                     [&::-webkit-slider-thumb]:border-2 
                     [&::-webkit-slider-thumb]:border-blue-500 
                     [&::-webkit-slider-thumb]:cursor-pointer"
        />
      </div>

      {/* Price labels */}
      <div className="flex justify-between text-sm font-medium text-gray-800">
        <span>$1</span>
        <span>$5000</span>
      </div>
    </div>
  )
}

export default FilterCards