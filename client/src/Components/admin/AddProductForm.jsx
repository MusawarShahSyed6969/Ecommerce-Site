import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import Header from "../../Layout/Navbar";
import Footer from "../../Layout/Footer";
import { createProduct } from "../../redux/slices/productSlice";
import { getCategories } from "../../redux/slices/categorySlice";
import { fetchBrands } from '../../redux/slices/brandSlice';

const AddProductPage = () => {
  const dispatch = useDispatch()
  const { userInfo } = useSelector((state) => state.auth);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);


  const [category, setCategory] = useState("");
  const [brand, setBrand] = useState("");

  // 🔹 Redux categories state
  const { items: categories } = useSelector((state) => state.categories);
  const { brands, brandloading, error } = useSelector((state) => state.brands);


  // 🔹 Fetch categories on mount
  useEffect(() => {
    dispatch(getCategories());
    dispatch(fetchBrands())
  }, [dispatch]);



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
    images: [],
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    setFormData({ ...formData, images: files });
  };



const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);
  setMessage("");

  try {
    console.log(formData);
    
    await dispatch(createProduct({ formData, token: userInfo?.token })).unwrap();

    setMessage("✅ Product created successfully!");
    setFormData({
      name: "",
      description: "",
      long_description: "",
      price: "",
      discountedPrice: "",
      category: "",
      brand: "",
      countInStock: "",
      featured: false,
      images: [],
    });
  } catch (err) {
    setMessage(`❌ ${err || "Error creating product"}`);
  } finally {
    setLoading(false);
  }
};


  return (
    <div className="bg-gray-50 min-h-screen flex flex-col justify-between">
      <Header />

      <div
        className="flex justify-center"
        style={{ paddingTop: 40, paddingBottom: 60 }}
      >
        <div
          className="bg-white rounded-2xl shadow-md border border-gray-100 w-full max-w-4xl"
          style={{ padding: 32 }}
        >
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            🛍️ Add New Product
          </h2>
          <p className="text-gray-500 mb-8">
            Fill out the form below to add a new product to your store.
          </p>

          <form onSubmit={handleSubmit}>
            {/* Name */}
            <div style={{ marginBottom: 16 }}>
              <label className="block text-gray-700 font-semibold mb-1">
                Product Name
              </label>
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
            <div
              className="grid grid-cols-2 gap-4"
              style={{ marginBottom: 16 }}
            >
              <div>
                <label className="block text-gray-700 font-semibold mb-1">
                  Price
                </label>
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
                <label className="block text-gray-700 font-semibold mb-1">
                  Discounted Price
                </label>
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
            <div
              className="grid grid-cols-2 gap-4"
              style={{ marginBottom: 16 }}
            >
              <div>
                <label className="block text-gray-700 font-semibold mb-1">
                  Category ID
                </label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 text-sm w-3/4"
                  style={{ padding: "8px 12px" }}
                >
                  <option value="">Select one</option>
                  {loading && <option>Loading...</option>}
                  {!loading &&
                    categories.map((cat) => (
                      <option key={cat._id} value={cat._id}>
                        {cat.name}
                      </option>
                    ))}
                </select>

              </div>
              <div>
                <label className="block text-gray-700 font-semibold mb-1">
                  Select one
                </label>
                <select
                  value={formData.brand}
                  onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
                  className="border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 text-sm w-3/4"
                  style={{ padding: "8px 12px" }}
                >
                  <option value="">All</option>

                  {brandloading && <option>Loading...</option>}
                  {!brandloading &&
                    brands.map((b, index) => (
                      <option key={index} value={b._id}>
                        {b}
                      </option>
                    ))}
                </select>


              </div>
            </div>

            {/* Stock */}
            <div style={{ marginBottom: 16 }}>
              <label className="block text-gray-700 font-semibold mb-1">
                Count In Stock
              </label>
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
              <label className="block text-gray-700 font-semibold mb-1">
                Short Description
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="w-full rounded-lg border border-gray-300 bg-gray-50"
                rows="2"
                style={{ padding: 10 }}
              ></textarea>
            </div>

            <div style={{ marginBottom: 16 }}>
              <label className="block text-gray-700 font-semibold mb-1">
                Long Description
              </label>
              <textarea
                name="long_description"
                value={formData.long_description}
                onChange={handleChange}
                className="w-full rounded-lg border border-gray-300 bg-gray-50"
                rows="3"
                style={{ padding: 10 }}
              ></textarea>
            </div>

            {/* Featured */}
            <div
              className="flex items-center gap-2 mb-4"
              style={{ marginBottom: 16 }}
            >
              <input
                type="checkbox"
                name="featured"
                checked={formData.featured}
                onChange={handleChange}
                className="w-4 h-4 accent-blue-600"
              />
              <label className="text-gray-700 font-medium">
                Mark as Featured Product
              </label>
            </div>

            {/* Image Upload */}
            <div style={{ marginBottom: 24 }}>
              <label className="block text-gray-700 font-semibold mb-1">
                Upload Images (Multiple)
              </label>
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={handleImageUpload}
                className="w-full border border-gray-300 rounded-lg bg-gray-50"
                style={{ padding: 8 }}
              />
              {formData.images.length > 0 && (
                <div
                  className="flex flex-wrap gap-2 mt-3"
                  style={{ marginTop: 10 }}
                >
                  {formData.images.map((img, i) => (
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
              style={{
                padding: "10px 24px",
                cursor: loading ? "not-allowed" : "pointer",
              }}
            >
              {loading ? "Creating..." : "Create Product"}
            </button>
          </form>

          {message && (
            <div
              className="text-center font-medium text-gray-700"
              style={{ marginTop: 24 }}
            >
              {message}
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default AddProductPage;
