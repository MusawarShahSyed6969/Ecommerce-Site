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
  async ({productId, limit = 7},{ rejectWithValue }) => {
    try {
      const { data } = await axios.get(`${API_URL}/product/${productId}?limit=${limit}`);



       return {
        reviews: data.reviews || [],
        total: data.total || 0,
      };
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



      console.log('called ');
      // 👇 FIXED: send `product` instead of `productId`
      const { data } = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/reviews`,
        { productId, rating, comment },
        config
      );

      console.log(data);
      
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
    reviewLoading: false,
    total : 0,
    reviewError: null,
    success: false,
  },
  reducers: {
    resetReviewState: (state) => {
      state.reviewLoading = false;
      state.reviewError = null;
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Reviews
      .addCase(fetchReviews.pending, (state) => {
        state.reviewLoading = true;
      })
      .addCase(fetchReviews.fulfilled, (state, action) => {
        state.reviewLoading = false;
        state.reviews = action.payload.reviews;
        state.total = action.payload.total; // ✅ store total

      })
      .addCase(fetchReviews.rejected, (state, action) => {
        state.reviewLoading = false;
        state.reviewError = action.payload;
      })
      // Create Review
      .addCase(createReview.pending, (state) => {
        state.reviewLoading = true;
      })
      .addCase(createReview.fulfilled, (state) => {
        state.reviewLoading = false;
        state.success = true;
      })
      .addCase(createReview.rejected, (state, action) => {
        state.reviewLoading = false;
        state.reviewError = action.payload;
      })

      .addCase(fetchAllReviews.pending, (state) => {
        state.reviewLoading = true;
      })
      .addCase(fetchAllReviews.fulfilled, (state, action) => {
        state.reviewLoading = false;
        state.reviews = action.payload;
      })
      .addCase(fetchAllReviews.rejected, (state, action) => {
        state.reviewLoading = false;
        state.reviewError = action.payload;
      });

  },
});

export const { resetReviewState } = reviewSlice.actions;
export default reviewSlice.reducer;
