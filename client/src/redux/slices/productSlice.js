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
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/products/${id}`
      );
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Error fetching product details"
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
    items: [],       // all products
    product: null,   // single product
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
      });
  },
});

/* ============================================================
   ✅ EXPORTS
============================================================ */
export const { setFilters, clearFilters } = productSlice.actions;
export default productSlice.reducer;
