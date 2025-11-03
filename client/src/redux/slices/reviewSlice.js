import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = `${import.meta.env.VITE_BACKEND_URL}/api/reviews`;

// ✅ FETCH ALL REVIEWS (Admin)
export const fetchAllReviews = createAsyncThunk(
  "reviews/fetchAllAdmin",
  async (_, { rejectWithValue }) => {
    try {
      const userInfo = JSON.parse(localStorage.getItem("userInfo"));
      const token = userInfo?.token;

      if (!token) {
        return rejectWithValue("No authentication token found");
      }

      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };

      const { data } = await axios.get(`${API_URL}`, config);
      console.log(data.reviews);
      return data.reviews || [];
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);


// ✅ FETCH REVIEWS
export const fetchReviews = createAsyncThunk(
  "reviews/fetchAll",
  async (productId, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`${API_URL}/product/${productId}`);


      return data.reviews || [];
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// ✅ CREATE REVIEW — reads token from localStorage and sends correct field names
export const createReview = createAsyncThunk(
  "reviews/create",
  async ({ productId, rating, comment }, { rejectWithValue }) => {
    try {
      // 🟢 Parse user info from localStorage
      const userInfo = JSON.parse(localStorage.getItem("userInfo"));
      const token = userInfo?.token;

      if (!token) {
        return rejectWithValue("No authentication token found");
      }

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };



      // 👇 FIXED: send `product` instead of `productId`
      const { data } = await axios.post(
        "http://192.168.100.180:4000/api/reviews",
        { productId, rating, comment },
        config
      );

      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

const reviewSlice = createSlice({
  name: "reviews",
  initialState: {
    reviews: [],
    loading: false,
    error: null,
    success: false,
  },
  reducers: {
    resetReviewState: (state) => {
      state.loading = false;
      state.error = null;
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Reviews
      .addCase(fetchReviews.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchReviews.fulfilled, (state, action) => {
        state.loading = false;
        state.reviews = action.payload;
      })
      .addCase(fetchReviews.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Create Review
      .addCase(createReview.pending, (state) => {
        state.loading = true;
      })
      .addCase(createReview.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(createReview.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(fetchAllReviews.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAllReviews.fulfilled, (state, action) => {
        state.loading = false;
        state.reviews = action.payload;
      })
      .addCase(fetchAllReviews.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

  },
});

export const { resetReviewState } = reviewSlice.actions;
export default reviewSlice.reducer;
