import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import Header from "../../Layout/Navbar";
import Footer from "../../Layout/Footer";
import { updateProduct, getProductById } from "../../redux/slices/productSlice";
import { getCategories } from "../../redux/slices/categorySlice";
import { getBrands } from "../../redux/slices/brandSlice";
import { useParams } from "react-router";

const EditProductPage = () => {


    const dispatch = useDispatch();
    const { userInfo } = useSelector((state) => state.auth);

    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);

    const [categories, setCategories] = useState([]);
    const [brands, setBrands] = useState([]);

    const { productId } = useParams();

    const [formData, setFormData] = useState({
        name: "",
        description: "",
        long_description: "",
        price: "",
        discountedPrice: "",
        category: "",
        brand: "",
        countInStock: "",
        featured: false,
        newImages: [], // newly uploaded images
        existingImages: [], // existing Cloudinary images
    });

    // 🔹 Fetch product details
    useEffect(() => {
        const fetchData = async () => {
            console.log(productId);

            if (!productId) return;
            try {
                const { payload } = await dispatch(getProductById(productId));
                const product = payload.product || payload; // handle both cases

                if (product) {
                    setFormData({
                        name: product.name || "",
                        description: product.description || "",
                        long_description: product.long_description || "",
                        price: product.price || "",
                        discountedPrice: product.discountedPrice || "",
                        category: product.category?._id || product.category || "", // support both populated and id
                        brand: product.brand?._id || product.brand || "",
                        countInStock: product.countInStock || "",
                        featured: product.featured || false,
                        existingImages: product.images || [],
                        newImages: [],
                    });
                }
            } catch (err) {
                console.error(err);
            }
        };
        fetchData();
    }, [dispatch, productId]);


    // 🔹 Fetch categories & brands
    useEffect(() => {
        const fetchMeta = async () => {
            const catResp = await dispatch(getCategories());
            const brandResp = await dispatch(getBrands());
            setCategories(catResp.payload || []);
            setBrands(brandResp.payload || []);
        };
        fetchMeta();
    }, [dispatch]);

    // 🔹 Handle field change
    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === "checkbox" ? checked : value,
        });
    };

    // 🔹 Handle new images
    const handleImageUpload = (e) => {
        const files = Array.from(e.target.files);
        setFormData({ ...formData, newImages: files });
    };

    // 🔹 Delete existing image
    const handleDeleteImage = async (public_id) => {
        try {
            const { data } = await axios.delete(
                `${import.meta.env.VITE_BACKEND_URL}/api/products/${productId}/image`,
                {
                    headers: { Authorization: `Bearer ${userInfo?.token}` },
                    data: { public_id },
                }
            );
            setFormData((prev) => ({
                ...prev,
                existingImages: data.images,
            }));
        } catch (err) {
            console.error("Error deleting image:", err);
        }
    };

    // 🔹 Submit updated product
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage("");
      
        try {
          // Create FormData for images + other fields
          const data = new FormData();
          data.append("name", formData.name);
          data.append("description", formData.description);
          data.append("long_description", formData.long_description);
          data.append("price", formData.price);
          data.append("discountedPrice", formData.discountedPrice);
          data.append("category", formData.category);
          data.append("brand", formData.brand);
          data.append("countInStock", formData.countInStock);
          data.append("featured", formData.featured);
      
          // Append new images
          formData.newImages.forEach((file) => {
            data.append("images", file); // must match multer field name
          });
      
          // Send via axios directly (or modify your Redux slice to accept FormData)
          const config = {
            headers: {
              Authorization: `Bearer ${userInfo?.token}`,
              "Content-Type": "multipart/form-data",
            },
          };
      
          const response = await axios.put(
            `${import.meta.env.VITE_BACKEND_URL}/api/products/${productId}`,
            data,
            config
          );
      
          setMessage("✅ Product updated successfully!");
          setFormData((prev) => ({ ...prev, newImages: [] }));
        } catch (err) {
          console.error(err);
          setMessage(`❌ ${err?.response?.data?.message || "Error updating product"}`);
        } finally {
          setLoading(false);
        }
      };
      
    return (
        <div className="bg-gray-50 flex flex-col justify-between">
            <Header />

            <div className="flex justify-center" style={{ paddingTop: 40, paddingBottom: 60 }}>
                <div className="bg-white rounded-2xl shadow-md border border-gray-100 w-full max-w-4xl" style={{ padding: 32 }}>
                    <h2 className="text-3xl font-bold text-gray-800 mb-4">🛍️ Edit Product</h2>
                    <p className="text-gray-500 mb-8">Update product details below.</p>

                    <form onSubmit={handleSubmit}>
                        {/* Name */}
                        <div style={{ marginBottom: 16 }}>
                            <label className="block text-gray-700 font-semibold mb-1">Product Name</label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                                className="w-full rounded-lg border border-gray-300 bg-gray-50 focus:outline-none focus:ring focus:ring-blue-100"
                                style={{ padding: 10 }}
                            />
                        </div>

                        {/* Price + Discount */}
                        <div className="grid grid-cols-2 gap-4" style={{ marginBottom: 16 }}>
                            <div>
                                <label className="block text-gray-700 font-semibold mb-1">Price</label>
                                <input
                                    type="number"
                                    name="price"
                                    value={formData.price}
                                    onChange={handleChange}
                                    required
                                    className="w-full rounded-lg border border-gray-300 bg-gray-50"
                                    style={{ padding: 10 }}
                                />
                            </div>
                            <div>
                                <label className="block text-gray-700 font-semibold mb-1">Discounted Price</label>
                                <input
                                    type="number"
                                    name="discountedPrice"
                                    value={formData.discountedPrice}
                                    onChange={handleChange}
                                    className="w-full rounded-lg border border-gray-300 bg-gray-50"
                                    style={{ padding: 10 }}
                                />
                            </div>
                        </div>

                        {/* Category + Brand */}
                        <div className="grid grid-cols-2 gap-4" style={{ marginBottom: 16 }}>
                            <div>
                                <label className="block text-gray-700 font-semibold mb-1">Category</label>
                                <select
                                    value={formData.category}
                                    name="category"
                                    onChange={handleChange}
                                    className="border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 text-sm w-3/4"
                                    style={{ padding: "8px 12px" }}
                                >
                                    <option value="">Select one</option>
                                    {categories.map((cat) => (
                                        <option key={cat._id} value={cat._id}>
                                            {cat.name}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label className="block text-gray-700 font-semibold mb-1">Brand</label>
                                <select
                                    value={formData.brand}
                                    name="brand"
                                    onChange={handleChange}
                                >
                                    <option value="">Select one</option>
                                    {brands.map((b) => (
                                        <option key={b._id} value={b._id}> {/* use _id, not name */}
                                            {b.name}
                                        </option>
                                    ))}
                                </select>

                            </div>
                        </div>

                        {/* Stock */}
                        <div style={{ marginBottom: 16 }}>
                            <label className="block text-gray-700 font-semibold mb-1">Count In Stock</label>
                            <input
                                type="number"
                                name="countInStock"
                                value={formData.countInStock}
                                onChange={handleChange}
                                className="w-full rounded-lg border border-gray-300 bg-gray-50"
                                style={{ padding: 10 }}
                            />
                        </div>

                        {/* Description */}
                        <div style={{ marginBottom: 16 }}>
                            <label className="block text-gray-700 font-semibold mb-1">Short Description</label>
                            <textarea
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                className="w-full rounded-lg border border-gray-300 bg-gray-50"
                                rows="2"
                                style={{ padding: 10 }}
                            />
                        </div>

                        <div style={{ marginBottom: 16 }}>
                            <label className="block text-gray-700 font-semibold mb-1">Long Description</label>
                            <textarea
                                name="long_description"
                                value={formData.long_description}
                                onChange={handleChange}
                                className="w-full rounded-lg border border-gray-300 bg-gray-50"
                                rows="3"
                                style={{ padding: 10 }}
                            />
                        </div>

                        {/* Featured */}
                        <div className="flex items-center gap-2 mb-4">
                            <input
                                type="checkbox"
                                name="featured"
                                checked={formData.featured}
                                onChange={handleChange}
                                className="w-4 h-4 accent-blue-600"
                            />
                            <label className="text-gray-700 font-medium">Mark as Featured Product</label>
                        </div>

                        {/* Existing Images */}
                        {formData.existingImages.length > 0 && (
                            <div className="mb-4">
                                <label className="block text-gray-700 font-semibold mb-2">Existing Images</label>
                                <div className="flex flex-wrap gap-2">
                                    {formData.existingImages.map((img) => (
                                        <div key={img.public_id} className="relative">
                                            <img
                                                src={img.url}
                                                alt="existing"
                                                className="w-20 h-20 object-cover rounded-lg border border-gray-200"
                                            />
                                            <button
                                                type="button"
                                                onClick={() => handleDeleteImage(img.public_id)}
                                                className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-5 h-5 text-xs flex items-center justify-center"
                                            >
                                                ×
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* New Image Upload */}
                        <div className="mb-6">
                            <label className="block text-gray-700 font-semibold mb-1">Upload New Images</label>
                            <input
                                type="file"
                                multiple
                                accept="image/*"
                                onChange={handleImageUpload}
                                className="w-full border border-gray-300 rounded-lg bg-gray-50"
                                style={{ padding: 8 }}
                            />
                            {formData.newImages.length > 0 && (
                                <div className="flex flex-wrap gap-2 mt-3">
                                    {formData.newImages.map((img, i) => (
                                        <img
                                            key={i}
                                            src={URL.createObjectURL(img)}
                                            alt="preview"
                                            className="w-20 h-20 object-cover rounded-lg border border-gray-200"
                                        />
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Submit */}
                        <button
                            type="submit"
                            disabled={loading}
                            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition"
                            style={{ padding: "10px 24px", cursor: loading ? "not-allowed" : "pointer" }}
                        >
                            {loading ? "Updating..." : "Update Product"}
                        </button>
                    </form>

                    {message && <div className="text-center font-medium text-gray-700 mt-4">{message}</div>}
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default EditProductPage;
