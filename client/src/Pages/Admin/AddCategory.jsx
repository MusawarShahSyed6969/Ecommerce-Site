import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getCategories,
  addCategory,
  updateCategory,
  deleteCategory,
} from "../../redux/slices/categorySlice";
import Navbar from "../../Layout/Navbar";
import Footer from "../../Layout/Footer";

const AddCategory = () => {
  const dispatch = useDispatch();
  const { items: categories, loading } = useSelector((state) => state.categories);

  const [search, setSearch] = useState("");
  const [name, setName] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) return alert("Please enter a category name");

    if (editMode) {
      dispatch(updateCategory({ id: editId, updatedData: { name } }))
        .unwrap()
        .then(() => {
          setEditMode(false);
          setEditId(null);
          setName("");
        })
        .catch((err) => alert(err));
    } else {
      dispatch(addCategory({ name }))
        .unwrap()
        .then(() => setName(""))
        .catch((err) => alert(err));
    }
  };

  const handleDelete = (id) => {
    if (window.confirm("🗑️ Delete this category?")) {
      dispatch(deleteCategory(id));
    }
  };

  const handleEdit = (cat) => {
    setEditMode(true);
    setEditId(cat._id);
    setName(cat.name);
  };

const filtered = categories?.filter(
  (c) => c?.name?.toLowerCase().includes(search.toLowerCase())
);


  return (
    <div>
      <Navbar />

      <div
        className="min-h-screen bg-gray-50"
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "flex-start",
          padding: "40px 20px",
          textAlign: "center",
        }}
      >
        {/* Header */}
        <h1
          className="text-3xl font-bold text-btn-primary"
          style={{ marginBottom: "40px" }}
        >
          🗂️ Manage Categories
        </h1>

        {/* Add / Edit Form */}
        <form
          onSubmit={handleSubmit}
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            alignItems: "center",
            gap: "10px",
            marginBottom: "40px",
            width: "100%",
            maxWidth: "600px",
          }}
        >
          <input
            type="text"
            placeholder={
              editMode ? "✏️ Edit category name..." : "➕ Add new category..."
            }
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border border-gray-300 rounded-lg focus:ring-2 focus:ring-btn-primary"
            style={{
              padding: "10px 16px",
              width: "100%",
              flex: "1",
              minWidth: "250px",
            }}
          />
          <button
            type="submit"
            className="bg-btn-primary text-white rounded-lg hover:bg-btn-primary/80"
            style={{ padding: "10px 20px" }}
          >
            {editMode ? "💾 Update" : "Add"}
          </button>
          {editMode && (
            <button
              type="button"
              onClick={() => {
                setEditMode(false);
                setEditId(null);
                setName("");
              }}
              className="bg-gray-400 text-white rounded-lg hover:bg-gray-500"
              style={{ padding: "10px 20px" }}
            >
              Cancel
            </button>
          )}
        </form>

        {/* Search */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginBottom: "30px",
            width: "100%",
          }}
        >
          <input
            type="text"
            placeholder="🔍 Search category..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border border-gray-300 rounded-lg focus:ring-2 focus:ring-btn-primary"
            style={{
              padding: "10px 16px",
              width: "100%",
              maxWidth: "400px",
            }}
          />
        </div>

        {/* Category List */}
        <div
          style={{
            width: "100%",
            maxWidth: "700px",
            paddingBottom: "60px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "10px",
          }}
        >
          {loading ? (
            <p style={{ color: "#6b7280" }}>Loading...</p>
          ) : filtered?.length ? (
            filtered.map((cat) => (
              <div
                key={cat._id}
                className="bg-white rounded-lg shadow-md"
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  width: "100%",
                  padding: "14px 20px",
                }}
              >
                <span
                  className="font-medium text-gray-800"
                  style={{ textAlign: "left" }}
                >
                  {cat.name}
                </span>
                <div style={{ display: "flex", gap: "10px" }}>
                  <button
                    onClick={() => handleEdit(cat)}
                    className="bg-btn-primary text-white rounded-lg hover:bg-btn-primary/80"
                    style={{ padding: "8px 16px" }}
                  >
                    ✏️ Edit
                  </button>
              
                  <button
                    onClick={() => handleDelete(cat._id)}
                    className="bg-red-500 text-white rounded-lg hover:bg-red-600"
                    style={{ padding: "8px 16px" }}
                  >
                    🗑️ Delete
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p style={{ color: "#6b7280" }}>No categories found.</p>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default AddCategory;
