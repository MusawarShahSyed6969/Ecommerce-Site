import React, { useState } from "react";
import { FaFilter } from "react-icons/fa6";
import { useNavigate } from "react-router";
import ProductCard from "./ProductCard";
import ShopFilterMobile from "./ShopFilterMobile";

const ShopProductCards = () => {
  const [ResponsiveFilterMenu, setResponsiveFilterMenu] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  // Example product data
  const allProducts = Array.from({ length: 30 }, (_, i) => ({
    id: i + 1,
    isOnSale: i % 3 === 0,
    isOutOfStock: i % 5 === 0,
  }));

  const totalPages = Math.ceil(allProducts.length / itemsPerPage);

  const currentProducts = allProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const goToPage = (page) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  const ProductSortby = () => {
    const start = (currentPage - 1) * itemsPerPage + 1;
    const end = Math.min(currentPage * itemsPerPage, allProducts.length);

    return (
      <div
        style={{ padding: "12px" }}
        className="bg-bg-secondary h-auto flex flex-col gap-4 justify-between rounded-t-lg md:flex-row"
      >
        <div className="hidden md:block">
          <p className="text-muted">
            <span className="font-semibold text-black">Showing</span> : {start}–{end} products of{" "}
            {allProducts.length}
          </p>
        </div>

        <div className="flex justify-evenly">
          <div className="flex gap-4">
            <p className="text-muted hidden md:block">Sort by:</p>
            <select
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

        <div>
          <ShopFilterMobile
            ResponsiveFilterMenu={ResponsiveFilterMenu}
            setResponsiveFilterMenu={setResponsiveFilterMenu}
          />
        </div>
      </div>
    );
  };

  return (
    <div className="flex flex-col gap-6" style={{ padding: "32px" }}>
      <ProductSortby />

      {/* Product Grid */}
      <div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 justify-center items-center"
        style={{ marginTop: "20px" }}
      >
        {currentProducts.map((p) => (
          <ProductCard
            key={p.id}
            IsonSale={p.isOnSale}
            isoutofStock={p.isOutOfStock}
          />
        ))}
      </div>

      {/* Pagination Controls */}
      <div
        className="flex justify-center items-center gap-4"
        style={{ marginTop: "24px" }}
      >
        <button
          onClick={() => goToPage(currentPage - 1)}
          disabled={currentPage === 1}
          style={{ padding: "8px 12px" }}
          className="bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Prev
        </button>

        <div className="flex gap-2">
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              onClick={() => goToPage(i + 1)}
              style={{ padding: "8px 12px" }}
              className={`rounded ${
                currentPage === i + 1
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 hover:bg-gray-300"
              }`}
            >
              {i + 1}
            </button>
          ))}
        </div>

        <button
          onClick={() => goToPage(currentPage + 1)}
          disabled={currentPage === totalPages}
          style={{ padding: "8px 12px" }}
          className="bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default ShopProductCards;
