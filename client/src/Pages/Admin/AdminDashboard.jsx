import React from "react";
import { useNavigate } from "react-router";
import Navbar from "../../Layout/Navbar";
import Footer from "../../Layout/Footer";

const AdminDashboard = () => {
  const navigate = useNavigate();

  return (
   <div>

    <div><Navbar/></div>


     <div className="min-h-screen bg-gray-50 flex flex-col items-center">
      {/* ✅ Header */}
      <header
        className="bg-btn-primary text-white w-full text-center shadow-md"
        style={{ padding: "20px 0", marginBottom: "40px" }}
      >
        <h1 className="text-3xl font-bold tracking-wide">
          👑 Welcome to <span className="text-yellow-300">Musawar Shop</span>
        </h1>
        <p className="text-sm opacity-90 mt-2">
          Manage your store products, categories, and more from one place
        </p>
      </header>

      {/* ✅ Buttons Container */}
      <div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        style={{ padding: "10px 20px" }}
      >
        {/* 🟢 Add Product */}
        <button
          onClick={() => navigate("/productadd")}
          className="bg-btn-primary hover:bg-btn-primary/80 text-white font-semibold py-3 rounded-2xl shadow-md transition-transform duration-200 hover:scale-105"
          style={{ padding: "12px 24px" }}
        >
          ➕ Add New Product
        </button>

        {/* 🟢 Add Category */}
        <button
          onClick={() => navigate("/categoryadd")}
          className="bg-btn-primary hover:bg-btn-primary/80 text-white font-semibold py-3 rounded-2xl shadow-md transition-transform duration-200 hover:scale-105"
          style={{ padding: "12px 24px" }}
        >
          🗂️ Add New Category
        </button>

        {/* 🟢 View All Products */}
        <button
          onClick={() => navigate("/manageproduct")}
          className="bg-btn-primary hover:bg-btn-primary/80 text-white font-semibold py-3 rounded-2xl shadow-md transition-transform duration-200 hover:scale-105"
          style={{ padding: "12px 24px" }}
        >
          📦 View All Products
        </button>

        {/* 🟢 View All Orders */}
        <button
          onClick={() => navigate("/admin/orders")}
          className="bg-btn-primary hover:bg-btn-primary/80 text-white font-semibold py-3 rounded-2xl shadow-md transition-transform duration-200 hover:scale-105"
          style={{ padding: "12px 24px" }}
        >
          🧾 Manage Orders
        </button>

        {/* 🟢 Manage Brands */}
        <button
          onClick={() => navigate("/admin/brands")}
          className="bg-btn-primary hover:bg-btn-primary/80 text-white font-semibold py-3 rounded-2xl shadow-md transition-transform duration-200 hover:scale-105"
          style={{ padding: "12px 24px" }}
        >
          🏷️ Manage Brands
        </button>

        {/* 🟢 Dashboard Stats */}
        <button
          onClick={() => navigate("/admin/stats")}
          className="bg-btn-primary hover:bg-btn-primary/80 text-white font-semibold py-3 rounded-2xl shadow-md transition-transform duration-200 hover:scale-105"
          style={{ padding: "12px 24px" }}
        >
          📊 View Dashboard Stats
        </button>
      </div>

    
    </div>



    <div><Footer/></div>


   </div>
  );
};

export default AdminDashboard;
