import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

/* ============================================================
   🔐 Helper — Get Auth Config
============================================================ */
const getAuthConfig = () => {
  const userInfo = localStorage.getItem("userInfo");
  const token = userInfo ? JSON.parse(userInfo).token : null;

  return {
    headers: {
      "Content-Type": "application/json",
      Authorization: token ? `Bearer ${token}` : "",
    },
  };
};

/* ============================================================
   ✅ FETCH ALL BRANDS
============================================================ */
export const getBrands = createAsyncThunk(
  "brands/getBrands",
  async (_, { rejectWithValue }) => {
    try {
      const config = getAuthConfig();
      const { data } = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/brands`
      );
      
      return data.brands || [];
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Error fetching brands"
      );
    }
  }
);

/* ============================================================
   ✅ ADD BRAND
============================================================ */
export const addBrand = createAsyncThunk(
  "brands/addBrand",
  async ({ name, description = "", logo }, { rejectWithValue }) => {
    try {
      const config = getAuthConfig();
      const { data } = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/brands`,
        { name, description, logo },
        config
      );
      return data.brand;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Error adding brand"
      );
    }
  }
);

/* ============================================================
   ✅ UPDATE BRAND
============================================================ */
export const updateBrand = createAsyncThunk(
  "brands/updateBrand",
  async ({ id, updatedData }, { rejectWithValue }) => {
    try {
      const config = getAuthConfig();
      const { data } = await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/api/brands/${id}`,
        updatedData,
        config
      );
      return data.brand;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Error updating brand"
      );
    }
  }
);

/* ============================================================
   ✅ DELETE BRAND
============================================================ */
export const deleteBrand = createAsyncThunk(
  "brands/deleteBrand",
  async (id, { rejectWithValue }) => {
    try {
      const config = getAuthConfig();
      await axios.delete(
        `${import.meta.env.VITE_BACKEND_URL}/api/brands/${id}`,
        config
      );
      return id;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Error deleting brand"
      );
    }
  }
);

/* ============================================================
   🧩 BRAND SLICE
============================================================ */
const brandSlice = createSlice({
  name: "brands",
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // 🔄 GET ALL BRANDS
      .addCase(getBrands.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getBrands.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(getBrands.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ➕ ADD BRAND
      .addCase(addBrand.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })

      // ✏️ UPDATE BRAND
      .addCase(updateBrand.fulfilled, (state, action) => {
        const index = state.items.findIndex((b) => b._id === action.payload._id);
        if (index !== -1) state.items[index] = action.payload;
      })

      // 🗑️ DELETE BRAND
      .addCase(deleteBrand.fulfilled, (state, action) => {
        state.items = state.items.filter((b) => b._id !== action.payload);
      });
  },
});

export default brandSlice.reducer;
