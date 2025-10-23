import React, { useState } from 'react'
import { FaStar } from "react-icons/fa";
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




const RatingFilterCard = ({ name }) => {
  const [rating, setRating] = useState(3); // default rating
  const [hoverThumb, setHoverThumb] = useState(false);

  return (
    <div
      className="bg-white border border-gray-200 rounded-lg shadow-sm flex flex-col justify-between relative"
      style={{ padding: 8, width: "16rem", height: "9rem" }}
    >
      {/* Header */}
      <div
        className="w-full border-b-2 border-gray-200"
        style={{ marginBottom: "8px" }}
      >
        <h2 className="text-lg font-semibold text-gray-800">{name}</h2>
      </div>

      {/* Slider Section */}
      <div className="relative w-full flex flex-col items-center justify-center">
        {/* Tooltip (shows live value on hover) */}
        {hoverThumb && (
          <div
            className="absolute -top-7 text-xs font-semibold text-white bg-blue-500 px-2 py-1 rounded"
            style={{
              left: `${((rating - 1) / (5 - 1)) * 100}%`,
              transform: "translateX(-50%)",
            }}
          >
            {rating.toFixed(1)} ★
          </div>
        )}

        {/* Stars Display */}
        <div
          className="flex items-center justify-center"
          style={{ marginBottom: "10px" }}
        >
          {Array.from({ length: 5 }, (_, i) => (
            <FaStar
              key={i}
              className={`text-2xl ${
                i < Math.round(rating)
                  ? "text-yellow-400"
                  : "text-gray-300"
              }`}
            />
          ))}
        </div>

        {/* Slider */}
        <input
          type="range"
          min="1"
          max="5"
          step="0.1"
          value={rating}
          onChange={(e) => setRating(parseFloat(e.target.value))}
          onMouseEnter={() => setHoverThumb(true)}
          onMouseLeave={() => setHoverThumb(false)}
          className="w-full accent-yellow-400 h-2 rounded-lg appearance-none cursor-pointer bg-gray-200
                     [&::-webkit-slider-thumb]:appearance-none 
                     [&::-webkit-slider-thumb]:w-5 
                     [&::-webkit-slider-thumb]:h-5 
                     [&::-webkit-slider-thumb]:rounded-full 
                     [&::-webkit-slider-thumb]:bg-white 
                     [&::-webkit-slider-thumb]:border-2 
                     [&::-webkit-slider-thumb]:border-yellow-400 
                     [&::-webkit-slider-thumb]:cursor-pointer"
        />
      </div>

      {/* Min–Max Labels */}
      <div
        className="flex justify-between text-sm font-medium text-gray-800"
        style={{ marginTop: "6px" }}
      >
        <span>1 ★</span>
        <span>5 ★</span>
      </div>
    </div>
  );
};


 

export  {FilterCards,RatingFilterCard}