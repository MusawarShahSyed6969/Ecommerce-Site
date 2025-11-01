import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = `${import.meta.env.VITE_BACKEND_URL}/api/categories`;

/* -------------------- Helper: Get token header -------------------- */
const getAuthHeader = () => {
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  const token = userInfo?.token;
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

/* -------------------- THUNKS -------------------- */

// GET all categories (public)
export const getCategories = createAsyncThunk(
  "categories/getCategories",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(BASE_URL);
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Error fetching categories");
    }
  }
);

// ADD a new category (protected)
export const addCategory = createAsyncThunk(
  "categories/addCategory",
  async (newCategory, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(BASE_URL, newCategory, getAuthHeader());
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Error adding category");
    }
  }
);

// UPDATE a category (protected)
export const updateCategory = createAsyncThunk(
  "categories/updateCategory",
  async ({ id, updatedData }, { rejectWithValue }) => {
    try {
      const { data } = await axios.put(`${BASE_URL}/${id}`, updatedData, getAuthHeader());
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Error updating category");
    }
  }
);

// DELETE a category (protected)
export const deleteCategory = createAsyncThunk(
  "categories/deleteCategory",
  async (id, { rejectWithValue }) => {
    try {
      await axios.delete(`${BASE_URL}/${id}`, getAuthHeader());
      return id;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Error deleting category");
    }
  }
);

/* -------------------- SLICE -------------------- */

const categorySlice = createSlice({
  name: "categories",
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      /* ---- Get ---- */
      .addCase(getCategories.pending, (state) => {
        state.loading = true;
      })
      .addCase(getCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(getCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      /* ---- Add ---- */
      .addCase(addCategory.pending, (state) => {
        state.loading = true;
      })
      .addCase(addCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.items.push(action.payload);
      })
      .addCase(addCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      /* ---- Update ---- */
      .addCase(updateCategory.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateCategory.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.items.findIndex((cat) => cat._id === action.payload._id);
        if (index !== -1) {
          state.items[index] = action.payload;
        }
      })
      .addCase(updateCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      /* ---- Delete ---- */
      .addCase(deleteCategory.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.items = state.items.filter((cat) => cat._id !== action.payload);
      })
      .addCase(deleteCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default categorySlice.reducer;
