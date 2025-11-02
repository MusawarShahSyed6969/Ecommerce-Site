import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getBrands,
  addBrand,
  updateBrand,
  deleteBrand,
} from "../../redux/slices/brandSlice";
import Navbar from "../../Layout/Navbar";
import Footer from "../../Layout/Footer";

const ManageBrands = () => {
  const dispatch = useDispatch();
  const { items: brandsFromRedux, loading } = useSelector(
    (state) => state.brands
  );

  const [localBrands, setLocalBrands] = useState([]);
  const [search, setSearch] = useState("");
  const [name, setName] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [editId, setEditId] = useState(null);

  // Load brands initially
  useEffect(() => {
    dispatch(getBrands());
  }, [dispatch]);

  // Sync Redux brands to local state
  useEffect(() => {
    setLocalBrands(brandsFromRedux || []);
  }, [brandsFromRedux]);

  /* ---------------- Add or Update ---------------- */
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim()) return alert("Please enter a brand name");

    if (editMode) {
      try {
        const result = await dispatch(
          updateBrand({ id: editId, updatedData: { name } })
        ).unwrap();

        // Update locally without refresh
        setLocalBrands((prev) =>
          prev.map((b) =>
            b._id === editId ? { ...b, name: result?.name || name } : b
          )
        );

        setEditMode(false);
        setEditId(null);
        setName("");
      } catch (err) {
        alert(err);
      }
    } else {
      const tempBrand = { _id: Date.now().toString(), name };
      setLocalBrands((prev) => [tempBrand, ...prev]);

      dispatch(addBrand({ name }))
        .unwrap()
        .then((newBrand) => {
          // Replace temp with real brand
          setLocalBrands((prev) =>
            prev.map((b) => (b._id === tempBrand._id ? newBrand : b))
          );
          setName("");
        })
        .catch((err) => alert(err));
    }
  };

  /* ---------------- Delete ---------------- */
  const handleDelete = (id) => {
    if (window.confirm("🗑️ Delete this brand?")) {
      setLocalBrands((prev) => prev.filter((b) => b._id !== id));
      dispatch(deleteBrand(id));
    }
  };

  /* ---------------- Edit ---------------- */
  const handleEdit = (brand) => {
    setEditMode(true);
    setEditId(brand._id);
    setName(brand.name);
  };

  /* ---------------- Filter ---------------- */
  const filtered = localBrands?.filter((b) =>
    b.name?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <Navbar />

      <div
        className="min-h-screen bg-gray-50 flex flex-col items-center"
        style={{ padding: "40px 20px" }}
      >
        <h1 className="text-3xl font-bold text-btn-primary mb-10 text-center">
          🏷️ Manage Brands
        </h1>

        {/* Add / Edit Form */}
        <form
          onSubmit={handleSubmit}
          className="flex flex-wrap justify-center gap-3 mb-10 w-full max-w-2xl"
        >
          <input
            type="text"
            placeholder={
              editMode ? "✏️ Edit brand name..." : "➕ Add new brand..."
            }
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border border-gray-300 rounded-lg focus:ring-2 focus:ring-btn-primary w-full md:flex-1"
            style={{ padding: "10px 16px" }}
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
        <div className="flex justify-center w-full mb-8">
          <input
            type="text"
            placeholder="🔍 Search brand..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border border-gray-300 rounded-lg focus:ring-2 focus:ring-btn-primary w-full max-w-md"
            style={{ padding: "10px 16px" }}
          />
        </div>

        {/* Brand List */}
        <div
          className="w-full max-w-3xl flex flex-col gap-3 pb-16"
          style={{ paddingBottom: "60px" }}
        >
          {loading ? (
            <p className="text-gray-500 text-center">Loading...</p>
          ) : filtered?.length ? (
            filtered.map((brand) => (
              <div
                key={brand._id}
                className="bg-white rounded-lg shadow-md flex flex-col sm:flex-row justify-between items-center sm:items-center"
                style={{ padding: "14px 20px" }}
              >
                <span className="font-medium text-gray-800 mb-3 sm:mb-0">
                  {brand.name}
                </span>

                <div className="flex flex-wrap gap-2 justify-center">
                  <button
                    onClick={() => handleEdit(brand)}
                    className="bg-btn-primary text-white rounded-lg hover:bg-btn-primary/80"
                    style={{ padding: "8px 16px" }}
                  >
                    ✏️ Edit
                  </button>
                  <button
                    onClick={() => handleDelete(brand._id)}
                    className="bg-red-500 text-white rounded-lg hover:bg-red-600"
                    style={{ padding: "8px 16px" }}
                  >
                    🗑️ Delete
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500">No brands found.</p>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ManageBrands;
