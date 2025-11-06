import React, { useEffect, useState } from "react";
import { FaFilter } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { getProducts, setFilters } from "../../redux/slices/productSlice";
import ProductCard from "./ProductCard";
import ShopFilterMobile from "./ShopFilterMobile";
import Pagination from "../../Components/common/Pagination";

const ShopProductCards = () => {
  const dispatch = useDispatch();
  const { items, loading, error, filters } = useSelector((state) => state.products);

  const [Sort, SetSort] = useState();
  const [ResponsiveFilterMenu, setResponsiveFilterMenu] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);


  // ✅ Fetch products when filters change
  useEffect(() => {
    dispatch(getProducts(filters));
    console.log(items);

  }, [dispatch, filters]);

  // ✅ Pagination logic
  const itemsPerPage = 8;

  const totalPages = Math.ceil(items.length / itemsPerPage);

  const currentProducts = items.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  // PAGINATION LOGIC ENDS HERER */ 


 
  const handleSort = (e) => {
    const value = e.target.value;
    SetSort(value);
    dispatch(setFilters({ sort: value }));
  };

  // ✅ Sort/Filter header component
  const ProductSortby = () => {
    const start = (currentPage - 1) * itemsPerPage + 1;
    const end = Math.min(currentPage * itemsPerPage, items.length);

    return (
      <div
        className="bg-bg-secondary h-auto flex flex-col gap-4 justify-between rounded-t-lg md:flex-row"
        style={{ padding: "12px" }}
      >
        <div className="hidden md:block">
          <p className="text-muted">
            <span className="font-semibold text-black">Showing</span> :{" "}
            {items.length ? `${start}–${end} products of ${items.length}` : "No products"}
          </p>
        </div>

        <div className="flex justify-evenly">
          <div className="flex gap-4">
            <p className="text-muted hidden md:block">Sort by:</p>
            <select
              value={Sort}
              onChange={handleSort}
              style={{ padding: "8px" }}
              className="border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-btn-primary"
            >
              <option value="relevance">Relevance</option>
              <option value="price-low-high">Price: Low to High</option>
              <option value="price-high-low">Price: High to Low</option>
              <option value="newest">Newest Arrivals</option>
            </select>
          </div>

          <div className="md:hidden">
            <FaFilter onClick={() => setResponsiveFilterMenu(!ResponsiveFilterMenu)} />
          </div>
        </div>

        <ShopFilterMobile
          ResponsiveFilterMenu={ResponsiveFilterMenu}
          setResponsiveFilterMenu={setResponsiveFilterMenu}
        />
      </div>
    );
  };

  // ✅ Handle loading/error/empty states
  if (loading)
    return (
      <div className="flex justify-center items-center w-full" style={{ marginTop: "40px" }}>
        <p className="text-gray-500 text-lg">Loading products...</p>
      </div>
    );

  if (error)
    return (
      <div>
        <ProductSortby />
        <div
          className="min-h-screen flex justify-center items-start w-full"
          style={{ marginTop: "40px" }}
        >
          <p className="text-red-500 text-lg">Error: {error}</p>
        </div>
      </div>
    );

  if (!items.length)
    return (
      <div className="flex min-h-screen flex-col gap-6" style={{ padding: "32px" }}>
        <ProductSortby />
        <div className="flex justify-center items-center w-full" style={{ marginTop: "40px" }}>
          <p className="text-gray-500 text-lg">No products found</p>
        </div>
      </div>
    );

  // ✅ Main product grid
  return (
    <div className="flex flex-col gap-6" style={{ padding: "32px" }}>
      <ProductSortby />

      {/* Product Grid */}
      <div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 justify-center items-center"
        style={{ marginTop: "20px" }}
      >
        {currentProducts.map((product) => {
          // ✅ SAME CALCULATION as ProductDetailsRow
          const discountPercent =
            product.discountedPrice && product.discountedPrice < product.price
              ? Math.round(((product.price - product.discountedPrice) / product.price) * 100)
              : 0;

          const isOnSale = discountPercent > 0;
          const isOutOfStock = product.countInStock <= 0;

          console.log(product);


          return (
            <ProductCard
              key={product._id}
              Name={product.name}
              brand={product.brand?.name || "No Brand"}  // only pass name
              price={product.price}
              discountedPrice={product.discountedPrice}
              discountPercent={discountPercent}
              isOnSale={isOnSale}
              isOutOfStock={isOutOfStock}
              image={product.images?.[0]?.url}
              rating={product.rating}
              p_ID={product._id}
            />

          );
        })}

              {/* Pagination */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
        className="mt-12"
      />
      </div>

    </div>
  );
};

export default ShopProductCards;
