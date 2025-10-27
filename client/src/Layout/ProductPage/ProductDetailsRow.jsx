import React, { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";
import { RiSecurePaymentFill } from "react-icons/ri";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Thumbs } from "swiper/modules";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/slices/cartSlice";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/thumbs";

const ProductDetailsRow = ({ product, loading, error }) => {
  const dispatch = useDispatch();

  // ✅ Manage thumb swiper separately and only after mount
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true); // Prevent SSR hydration / premature Swiper load
  }, []);

  const addToCartHandler = () => {
    dispatch(
      addToCart({
        _id: product._id,
        name: product.name,
        price: product.discountedPrice || product.price,
        image: product.images?.[0]?.url,
        quantity: 1,
        countInStock: product.countInStock,
      })
    );
  };

  if (loading) return <p style={{ padding: 20, textAlign: "center" }}>Loading...</p>;
  if (error) return <p style={{ padding: 20, textAlign: "center", color: "red" }}>{error}</p>;
  if (!product) return <p style={{ padding: 20, textAlign: "center" }}>No product found</p>;

  // ✅ Calculate sale
  const discountPercent =
    product.discountedPrice && product.discountedPrice < product.price
      ? Math.round(((product.price - product.discountedPrice) / product.price) * 100)
      : 0;

  const isOnSale = discountPercent > 0;
  const isOutOfStock = product.countInStock <= 0;

  const MetaInfo = ({ isOnSale, isOutOfStock, discountPercent }) => (
    <div className="flex items-center gap-3">
      {isOnSale && (
        <div
          className="bg-green-600 text-white rounded-md text-sm font-medium"
          style={{ padding: "4px 8px" }}
        >
          {discountPercent}% OFF
        </div>
      )}
      {isOutOfStock && (
        <div
          className="bg-red-500 text-white rounded-md text-sm font-medium"
          style={{ padding: "4px 8px" }}
        >
          Out of Stock
        </div>
      )}
    </div>
  );

  return (
    <div className="flex justify-center w-full" style={{ padding: "40px 20px" }}>
      <div
        className="w-full max-w-6xl bg-white rounded-lg shadow-md flex flex-col md:flex-row gap-10 transition-all duration-300"
        style={{ padding: 24 }}
      >
        {/* ✅ Product Gallery */}
        <div className="flex flex-col justify-center items-center md:w-1/2">
          {isClient && (
            <>
              {/* Main Swiper */}
              <Swiper
                modules={[Navigation, Pagination, Thumbs]}
                navigation
                pagination={{ clickable: true }}
                spaceBetween={10}
                slidesPerView={1}
                thumbs={{ swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null }}
                className="w-full max-w-md rounded-md"
              >
                {product.images?.map((img, index) => (
                  <SwiperSlide key={index}>
                    <img
                      src={img.url}
                      alt={`${product.name}-${index}`}
                      className="w-full h-auto object-contain rounded-md transition-transform duration-300 hover:scale-105"
                    />
                  </SwiperSlide>
                ))}
              </Swiper>

              {/* Thumbnail Swiper */}
              <Swiper
                onSwiper={setThumbsSwiper}
                modules={[Thumbs]}
                spaceBetween={10}
                slidesPerView={4}
                watchSlidesProgress
                className="w-full max-w-md mt-4"
              >
                {product.images?.map((img, index) => (
                  <SwiperSlide key={index}>
                    <img
                      src={img.url}
                      alt={`thumb-${index}`}
                      className="w-full h-20 object-cover rounded-md cursor-pointer border border-gray-200 hover:border-blue-600 transition-all"
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
            </>
          )}
        </div>

        {/* ✅ Product Info Section */}
        <div className="flex flex-col justify-between gap-6 md:w-1/2" style={{ padding: 8 }}>
          <div className="flex flex-col gap-3">
            <MetaInfo
              isOnSale={isOnSale}
              isOutOfStock={isOutOfStock}
              discountPercent={discountPercent}
            />

            <p className="text-blue-600 font-semibold text-sm uppercase">{product.brand}</p>

            <div
              className="flex flex-col md:flex-row md:items-center justify-between gap-2"
              style={{ paddingTop: 4, paddingBottom: 4 }}
            >
              <h1 className="text-2xl md:text-3xl font-bold text-gray-800">{product.name}</h1>

              <div className="flex items-center gap-1 text-yellow-500 text-sm">
                {[...Array(5)].map((_, i) => (
                  <FaStar
                    key={i}
                    className={i < product.rating ? "text-yellow-500" : "text-gray-300"}
                  />
                ))}
                <span className="text-gray-500 ml-1">({product.rating})</span>
              </div>
            </div>

            {/* Price Section */}
            <div className="flex items-center gap-3">
              {isOnSale ? (
                <>
                  <p className="text-gray-400 line-through text-lg">
                    ${product.price.toLocaleString()}
                  </p>
                  <p className="text-2xl font-bold text-gray-900">
                    ${product.discountedPrice.toLocaleString()}
                  </p>
                  <span className="text-green-600 font-semibold">
                    Save ${product.price - product.discountedPrice}
                  </span>
                </>
              ) : (
                <p className="text-2xl font-bold text-gray-900">
                  ${product.price.toLocaleString()}
                </p>
              )}
            </div>

            {/* Description */}
            <p className="text-gray-700 leading-relaxed text-sm sm:text-base">
              {product.description ||
                "No detailed description available for this product."}
            </p>
          </div>

          {/* Add to Cart */}
          <div
            className="flex flex-col sm:flex-row gap-4 items-start sm:items-center"
            style={{ marginTop: 12 }}
          >
            <input
              type="number"
              min={1}
              max={product.countInStock || 10}
              defaultValue={1}
              className="border border-gray-300 rounded-md w-24 text-center"
              style={{ padding: "8px" }}
            />
            <button
              onClick={addToCartHandler}
              disabled={isOutOfStock}
              className={`w-full sm:w-40 rounded-md text-white font-semibold transition-colors duration-300 ${
                isOutOfStock
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700"
              }`}
              style={{ padding: "10px 0" }}
            >
              {isOutOfStock ? "Out of Stock" : "Add to Cart"}
            </button>
          </div>

          <div className="border-t border-gray-300" style={{ marginTop: 16, marginBottom: 16 }}></div>

          <div className="flex flex-col sm:flex-row justify-between text-sm text-gray-600 gap-3">
            <div>
              <p>
                Category:{" "}
                <span className="text-blue-600 font-medium">
                  {product.category?.name || "Uncategorized"}
                </span>
              </p>
              <p>
                Tags:{" "}
                <span className="text-blue-600 font-medium">
                  {product.name}, {product.brand}
                </span>
              </p>
            </div>

            <div className="flex items-center gap-2 text-blue-600 font-medium">
              <RiSecurePaymentFill className="w-5 h-5" /> 100% Secure Payment
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsRow;
