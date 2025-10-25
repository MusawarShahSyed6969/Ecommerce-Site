import React, { useState } from "react";
import { FaStar } from "react-icons/fa";

const FilterCards = ({ name, onPriceChange }) => {
  const [price, setPrice] = useState(2500);
  const [hoverThumb, setHoverThumb] = useState(false);

  const handleChange = (e) => {
    const value = e.target.value;
    setPrice(value);
    onPriceChange && onPriceChange(value);
  };

  return (
    <div
      className="bg-white border border-gray-200 rounded-lg shadow-sm flex flex-col justify-between relative w-full"
      style={{ padding: 12 }}
    >
      <div className="w-full border-b border-gray-200">
        <h2 className="text-lg font-semibold text-gray-800">{name}</h2>
      </div>

      <div className="relative flex flex-col items-center justify-center w-full">
        {hoverThumb && (
          <div
            className="absolute text-xs font-semibold text-white bg-blue-500 px-2 py-1 rounded"
            style={{
              top: -24,
              left: `${((price - 1) / (500000 - 1)) * 100}%`,
              transform: "translateX(-50%)",
            }}
          >
            ${price}
          </div>
        )}

        <input
          type="range"
          min="1"
          max="500000"
          value={price}
          onChange={handleChange}
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
          style={{ marginTop: 8 }}
        />
      </div>

      <div
        className="flex justify-between text-sm font-medium text-gray-800 w-full"
        style={{ marginTop: 8 }}
      >
        <span>$1</span>
        <span>$500000</span>
      </div>
    </div>
  );
};

const RatingFilterCard = ({ name, onRatingChange }) => {
  const [rating, setRating] = useState(3);
  const [hoverThumb, setHoverThumb] = useState(false);

  const handleChange = (e) => {
    const value = parseFloat(e.target.value);
    setRating(value);
    onRatingChange && onRatingChange(value);
  };

  return (
    <div
      className="bg-white border border-gray-200 rounded-lg shadow-sm flex flex-col justify-between relative w-full"
      style={{ padding: 12 }}
    >
      <div className="w-full border-b border-gray-200">
        <h2 className="text-lg font-semibold text-gray-800">{name}</h2>
      </div>

      <div className="relative flex flex-col items-center justify-center w-full">
        {hoverThumb && (
          <div
            className="absolute text-xs font-semibold text-white bg-yellow-500 px-2 py-1 rounded"
            style={{
              top: -24,
              left: `${((rating - 1) / (5 - 0)) * 100}%`,
              transform: "translateX(-50%)",
            }}
          >
            {rating.toFixed(1)} ★
          </div>
        )}

        <div className="flex items-center justify-between w-full" style={{ marginTop: 8 }}>
          {Array.from({ length: 5 }, (_, i) => (
            <FaStar
              key={i}
              className={`text-xl ${
                i < Math.round(rating) ? "text-yellow-400" : "text-gray-300"
              }`}
            />
          ))}
        </div>

        <input
          type="range"
          min="0"
          max="5"
          step="0.1"
          value={rating}
          onChange={handleChange}
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
          style={{ marginTop: 8 }}
        />
      </div>

      <div
        className="flex justify-between text-sm font-medium text-gray-800 w-full"
        style={{ marginTop: 8 }}
      >
        <span>0 ★</span>
        <span>5 ★</span>
      </div>
    </div>
  );
};

export { FilterCards, RatingFilterCard };
