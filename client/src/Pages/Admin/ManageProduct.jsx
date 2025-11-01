import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProducts, deleteProduct } from "../../redux/slices/productSlice";
import Navbar from "../../Layout/Navbar";
import Footer from "../../Layout/Footer";

const ManageProduct = () => {
    const dispatch = useDispatch();
    const { items: products = [], loading } = useSelector((state) => state.products);
        const { userInfo } = useSelector((state) => state.auth);
    
    const [search, setSearch] = useState("");

    useEffect(() => {
        dispatch(getProducts());

        console.log(products);
        
    }, [dispatch]);

const handleDelete = async (id) => {
  if (window.confirm("🗑️ Delete this product?")) {
    try {
      await dispatch(deleteProduct({ id, token: userInfo.token })).unwrap();
      alert("✅ Product deleted successfully!");
    } catch (error) {
      console.error("❌ Delete failed:", error);
      alert(error || "Error deleting product");
    }
  }
};


    const filtered = products?.filter((p) =>
        p?.name?.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div>
            <Navbar />


            <div>
                <div
                    style={{
                        minHeight: "100vh",
                        backgroundColor: "#f9fafb",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        padding: "40px 20px",
                    }}
                >
                    {/* Header */}
                    <h1
                        style={{
                            fontSize: "30px",
                            fontWeight: "bold",
                            color: "#2563eb",
                            marginBottom: "30px",
                            textAlign: "center",
                        }}
                    >
                        📦 Manage Products
                    </h1>

                    {/* Search */}
                    <div style={{ marginBottom: "30px", width: "100%", maxWidth: "500px" }}>
                        <input
                            type="text"
                            placeholder="🔍 Search product..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            style={{
                                width: "100%",
                                padding: "12px 16px",
                                border: "1px solid #d1d5db",
                                borderRadius: "8px",
                                outline: "none",
                                textAlign: "center",
                                fontSize: "15px",
                            }}
                        />
                    </div>

                    {/* Product Grid */}
                    <div
                        style={{
                            display: "grid",
                            gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
                            gap: "20px",
                            width: "100%",
                            maxWidth: "1100px",
                            justifyItems: "center",
                            paddingBottom: "60px",
                        }}
                    >
                        {loading ? (
                            <p style={{ textAlign: "center", color: "#6b7280" }}>Loading...</p>
                        ) : filtered?.length ? (
                            filtered.map((p) =>  (
                                <div
                                    key={p._id}
                                    style={{
                                        backgroundColor: "#fff",
                                        borderRadius: "12px",
                                        boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
                                        padding: "20px",
                                        width: "100%",
                                        maxWidth: "300px",
                                        textAlign: "center",
                                        transition: "transform 0.2s ease, box-shadow 0.2s ease",
                                        cursor: "pointer",
                                    }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.transform = "translateY(-5px)";
                                        e.currentTarget.style.boxShadow = "0 8px 16px rgba(0,0,0,0.15)";
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.transform = "translateY(0)";
                                        e.currentTarget.style.boxShadow = "0 4px 8px rgba(0,0,0,0.1)";
                                    }}
                                >
                                    {/* Product Image */}
                                    <img
                                        src={p.images?.[0]?.url || "/placeholder.png"}
                                        alt={p.name}
                                        style={{
                                            width: "100%",
                                            height: "200px",
                                            objectFit: "cover",
                                            borderRadius: "10px",
                                            marginBottom: "15px",
                                        }}
                                    />

                                    {/* Product Name */}
                                    <h2
                                        style={{
                                            fontSize: "18px",
                                            fontWeight: "600",
                                            color: "#1f2937",
                                            marginBottom: "8px",
                                        }}
                                    >
                                        {p.name}
                                    </h2>

                                    {/* Product Price */}
                                    {p.price && (
                                        <p
                                            style={{
                                                color: "#16a34a",
                                                fontWeight: "bold",
                                                marginBottom: "15px",
                                            }}
                                        >
                                            💲{p.price}
                                        </p>
                                    )}

                                    {/* Action Buttons */}
                                    <div
                                        style={{
                                            display: "flex",
                                            justifyContent: "center",
                                            gap: "10px",
                                        }}
                                    >
                                        <button
                                            onClick={() => console.log("Edit", p._id)}
                                            style={{
                                                backgroundColor: "#2563eb",
                                                color: "#fff",
                                                border: "none",
                                                borderRadius: "8px",
                                                padding: "8px 14px",
                                                cursor: "pointer",
                                                fontWeight: "500",
                                            }}
                                            onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.8")}
                                            onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
                                        >
                                            ✏️ Edit
                                        </button>

                                        <button
                                            onClick={() => handleDelete(p._id)}
                                            style={{
                                                backgroundColor: "#ef4444",
                                                color: "#fff",
                                                border: "none",
                                                borderRadius: "8px",
                                                padding: "8px 14px",
                                                cursor: "pointer",
                                                fontWeight: "500",
                                            }}
                                            onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.8")}
                                            onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
                                        >
                                            🗑️ Delete
                                        </button>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p style={{ textAlign: "center", color: "#6b7280" }}>
                                No products found.
                            </p>
                        )}
                    </div>
                </div>

            </div>


            <Footer />

        </div>



    );
};

export default ManageProduct;
