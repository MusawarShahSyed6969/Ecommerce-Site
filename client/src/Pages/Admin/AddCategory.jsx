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
    const { items: categories, loading } = useSelector(
        (state) => state.categories
    );

    const [localCats, setLocalCats] = useState([]);
    const [search, setSearch] = useState("");
    const [name, setName] = useState("");
    const [editMode, setEditMode] = useState(false);
    const [editId, setEditId] = useState(null);

    useEffect(() => {
        dispatch(getCategories()).then((res) => {
            setLocalCats(res?.payload || []);
        });
    }, [dispatch]);

    /* ---------- Add / Update ---------- */
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!name.trim()) return alert("Please enter a category name");

        try {
            if (editMode) {
                await dispatch(updateCategory({ id: editId, updatedData: { name } })).unwrap();

                setLocalCats((prev) =>
                    prev.map((cat) =>
                        cat._id === editId ? { ...cat, name } : cat
                    )
                );

                setEditMode(false);
                setEditId(null);
                setName("");
            } else {
                const response = await dispatch(addCategory({ name })).unwrap();

                // ✅ Some APIs return { category }, some return the object directly
                const newCat = response.category || response;

                if (newCat && newCat._id) {
                    setLocalCats((prev) => [...prev, newCat]);
                } else {
                    console.warn("AddCategory: unexpected response", response);
                }

                setName("");
            }
        } catch (err) {
            console.error("Error adding/updating category:", err);
            alert(err?.message || "Something went wrong!");
        }
    };


    /* ---------- Delete ---------- */
    const handleDelete = async (id) => {
        if (window.confirm("🗑️ Delete this category?")) {
            await dispatch(deleteCategory(id));
            setLocalCats((prev) => prev.filter((cat) => cat._id !== id));
        }
    };

    /* ---------- Edit ---------- */
    const handleEdit = (cat) => {
        setEditMode(true);
        setEditId(cat._id);
        setName(cat.name);
    };

    /* ---------- Search ---------- */
    const filtered =
        localCats?.filter((c) =>
            c?.name?.toLowerCase()?.includes(search.toLowerCase())
        ) || [];

    return (
        <div>
            <Navbar />

            <div
                className="min-h-screen bg-gray-50"
                style={{
                    padding: "40px 20px",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                }}
            >
                <h1
                    className="text-3xl font-bold text-btn-primary text-center"
                    style={{ marginBottom: "40px" }}
                >
                    🗂️ Manage Categories
                </h1>

                {/* Add / Edit Form */}
                <form
                    onSubmit={handleSubmit}
                    className="flex flex-wrap justify-center items-center w-full max-w-lg gap-3"
                    style={{ marginBottom: "40px" }}
                >
                    <input
                        type="text"
                        placeholder={
                            editMode ? "✏️ Edit category name..." : "➕ Add new category..."
                        }
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="border border-gray-300 rounded-lg w-full focus:ring-2 focus:ring-btn-primary"
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

                {/* Search Bar */}
                <div
                    className="w-full flex justify-center"
                    style={{ marginBottom: "30px" }}
                >
                    <input
                        type="text"
                        placeholder="🔍 Search category..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="border border-gray-300 rounded-lg w-full max-w-md focus:ring-2 focus:ring-btn-primary"
                        style={{ padding: "10px 16px" }}
                    />
                </div>

                {/* Category List */}
                <div
                    className="w-full max-w-2xl flex flex-col items-center gap-3"
                    style={{ paddingBottom: "60px" }}
                >
                    {loading ? (
                        <p className="text-gray-500">Loading...</p>
                    ) : filtered.length ? (
                        filtered.map((cat) => (
                            <div
                                key={cat._id}
                                className="bg-white w-full rounded-lg shadow-md flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3"
                                style={{ padding: "14px 20px" }}
                            >
                                <span className="font-medium text-gray-800 text-left w-full sm:w-auto">
                                    {cat.name}
                                </span>
                                <div
                                    className="flex flex-row sm:flex-row justify-center sm:justify-end gap-3 w-full sm:w-auto"
                                    style={{ marginTop: "5px" }}
                                >
                                    <button
                                        onClick={() => handleEdit(cat)}
                                        className="bg-btn-primary text-white rounded-lg hover:bg-btn-primary/80 w-full sm:w-auto"
                                        style={{ padding: "8px 16px" }}
                                    >
                                        ✏️ Edit
                                    </button>
                                    <button
                                        onClick={() => handleDelete(cat._id)}
                                        className="bg-red-500 text-white rounded-lg hover:bg-red-600 w-full sm:w-auto"
                                        style={{ padding: "8px 16px" }}
                                    >
                                        🗑️ Delete
                                    </button>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className="text-gray-500">No categories found.</p>
                    )}
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default AddCategory;
