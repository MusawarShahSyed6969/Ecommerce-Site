import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

/* ============================================================
   ✅ FETCH ALL PRODUCTS (with filters)
============================================================ */
export const getProducts = createAsyncThunk(
  "products/getProducts",
  async (filters = {}, { rejectWithValue }) => {
    try {
      const params = new URLSearchParams();

      if (filters.search) params.append("search", filters.search);
      if (filters.category) params.append("category", filters.category);
      if (filters.brand) params.append("brand", filters.brand);
      if (filters.maxPrice) params.append("maxPrice", filters.maxPrice);
      if (filters.minRating) params.append("minRating", filters.minRating);
      if (filters.sort) params.append("sort", filters.sort);

      const { data } = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/products?${params.toString()}`
      );

      console.log(data);
      return Array.isArray(data) ? data : data.products || [];
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Error fetching products"
      );
    }
  }
);

/* ============================================================
   ✅ FETCH SINGLE PRODUCT BY ID
============================================================ */
export const getProductById = createAsyncThunk(
  "products/getProductById",
  async (id, { rejectWithValue }) => {
    console.log(id);
    
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/products/${id}`
      );

      console.log(data);
      
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Error fetching product details"
      );
    }
  }
);

/* ============================================================
   🧾 CREATE PRODUCT (Admin only)
============================================================ */
export const createProduct = createAsyncThunk(
  "products/createProduct",
  async ({ formData, token }, { rejectWithValue }) => {
    try {
      const dataToSend = new FormData();
      Object.keys(formData).forEach((key) => {
        if (key === "images") {
          formData.images.forEach((file) => dataToSend.append("images", file));
        } else {
          dataToSend.append(key, formData[key]);
        }
      });

      const { data } = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/products`,
        dataToSend,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      return data.product;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Error creating product"
      );
    }
  }
);


/* ============================================================
   ✏️ UPDATE PRODUCT (Admin only)
============================================================ */
export const updateProduct = createAsyncThunk(
  "products/updateProduct",
  async ({ formData, token, productId}, { rejectWithValue }) => {
    try {
      const dataToSend = new FormData();
      Object.keys(formData).forEach((key) => {
        if (key === "images" && Array.isArray(formData.images)) {
          formData.images.forEach((file) => dataToSend.append("images", file));
        } else {
          dataToSend.append(key, formData[key]);
        }
      });

      console.log(productId);
      

      
      const { data } = await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/api/products/${productId}`,
        dataToSend,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      return data.product;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Error updating product"
      );
    }
  }
);


/* ============================================================
   🗑️ DELETE PRODUCT (Admin only)
============================================================ */
export const deleteProduct = createAsyncThunk(
  "products/deleteProduct",
  async ({ id, token }, { rejectWithValue }) => {
    try {
      const { data } = await axios.delete(
        `${import.meta.env.VITE_BACKEND_URL}/api/products/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return { id, message: data.message };
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Error deleting product"
      );
    }
  }
);

/* ============================================================
   ✅ PRODUCT SLICE
============================================================ */
const productSlice = createSlice({
  name: "products",
  initialState: {
    items: [],
    product: null,
    loading: false,
    error: null,
    filters: {
      search: "",
      category: "",
      brand: "",
      sort: "",
      maxPrice: 500000,
      minRating: 0,
    },
  },
  reducers: {
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    clearFilters: (state) => {
      state.filters = {
        search: "",
        category: "",
        brand: "",
        sort: "",
        maxPrice: 500000,
        minRating: 0,
      };
    },
  },
  extraReducers: (builder) => {
    builder
      /* ============================================================
         📦 GET ALL PRODUCTS
      ============================================================ */
      .addCase(getProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(getProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      /* ============================================================
         🧩 GET SINGLE PRODUCT
      ============================================================ */
      .addCase(getProductById.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.product = null;
      })
      .addCase(getProductById.fulfilled, (state, action) => {
        state.loading = false;
        state.product = action.payload;
      })
      .addCase(getProductById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      /* ============================================================
         🧾 CREATE PRODUCT
      ============================================================ */
      .addCase(createProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.items.push(action.payload);
      })
      .addCase(createProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      /* ============================================================
   ✏️ UPDATE PRODUCT
       ============================================================ */
      .addCase(updateProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        state.loading = false;
        const updated = action.payload;
        state.items = state.items.map((item) =>
          item._id === updated._id ? updated : item
        );
      })
      .addCase(updateProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })


      /* ============================================================
         🗑️ DELETE PRODUCT
      ============================================================ */
      .addCase(deleteProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.items = state.items.filter(
          (item) => item._id !== action.payload.id
        );
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

/* ============================================================
   ✅ EXPORTS
============================================================ */
export const { setFilters, clearFilters } = productSlice.actions;
export default productSlice.reducer;
