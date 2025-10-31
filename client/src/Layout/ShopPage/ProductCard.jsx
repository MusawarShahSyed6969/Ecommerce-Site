import React from "react";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux"; // 🟢 add this
import { MdAddShoppingCart } from "react-icons/md";
import { FaStar } from "react-icons/fa6";
import { addToCart } from "../../redux/slices/cartSlice";

const ProductCard = ({
  isOnSale,
  isOutOfStock,
  discountPercent,
  discountedPrice,
  Name,
  brand,
  price,
  image,
  rating,
  p_ID,
}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch(); // 🟢 initialize Redux dispatcher

  // 🟢 Add to Cart button handler
  const addToCartHandler = () => {
    const product = {
      _id: p_ID,
      name: Name,
      price: discountedPrice || price,
      image,
      brand,
      quantity: 1, // default 1
    };

    dispatch(addToCart(product)); // 🔥 dispatch Redux action
  };

  return (
    <div
      className="bg-white flex relative flex-col justify-between rounded-lg shadow-md cursor-pointer transition-transform duration-200 hover:scale-105"
      style={{
        padding: 16,
        height: 360,
        width: "100%",
      }}
    >
      {/* --- Badges --- */}
      {isOnSale && (
        <div
          className="absolute top-2 left-2 bg-btn-primary text-white text-sm rounded-md font-medium"
          style={{ padding: 4 }}
        >
          {discountPercent}% OFF
        </div>
      )}

      {isOutOfStock && (
        <div
          className="absolute top-2 right-2 bg-btn-danger text-white text-sm rounded-md font-medium"
          style={{ padding: 4 }}
        >
          Out of Stock
        </div>
      )}

      {/* --- Product Image --- */}
      <div
        onClick={() => navigate(`/productdetails/${p_ID}`)}
        className="flex justify-center items-center w-full overflow-hidden rounded-md"
        style={{
          height: 180,
          marginBottom: 8,
        }}
      >
        <img src={image} alt={Name} className="object-contain w-full h-full" />
      </div>

      {/* --- Product Info --- */}
      <div className="flex flex-col flex-grow justify-between gap-2" style={{ flex: 1 }}>
        <div>
          <h2 className="font-semibold text-lg truncate">{Name}</h2>

          <div className="flex justify-between items-center" style={{ marginTop: 4 }}>
            <p className="text-muted text-sm">By {brand}</p>
            <MdAddShoppingCart
              onClick={addToCartHandler}
              className="text-btn-primary w-5 h-5 transition-transform duration-200 hover:scale-125"
            />
          </div>
        </div>

        {/* --- Price & Rating --- */}
        <div
          onClick={() => navigate(`/productdetails/${p_ID}`)}
          className="flex justify-between items-center"
          style={{ marginTop: 8 }}
        >
          <div className="flex flex-col min-h-[40px] justify-center">
            {isOnSale ? (
              <>
                <span className="text-btn-primary font-bold text-lg">${discountedPrice}</span>
                <span className="text-gray-500 text-sm line-through" style={{ marginTop: 2 }}>
                  ${price}
                </span>
              </>
            ) : (
              <>
                <span className="font-bold text-lg">${price}</span>
                <span className="invisible text-sm">$0</span>
              </>
            )}
          </div>

          <div className="flex items-center gap-1">
            <p className="font-medium text-gray-700">{rating}</p>
            <FaStar color="#ffc107" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
