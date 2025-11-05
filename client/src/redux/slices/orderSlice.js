import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// ✅ Fetch all orders (admin)
export const getAllOrders = createAsyncThunk(
  "orders/getAllOrders",
  async (_, { rejectWithValue }) => {
    try {
      const token = JSON.parse(localStorage.getItem("userInfo"))?.token;
      const { data } = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/orders`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      return data.orders;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to fetch orders"
      );
    }
  }
);

// ✅ Fetch orders for logged-in user
export const getUserOrders = createAsyncThunk(
  "orders/getUserOrders",
  async (_, { rejectWithValue }) => {
    try {
      const token = JSON.parse(localStorage.getItem("userInfo"))?.token;
      const { data } = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/orders/user`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      return data.orders;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to fetch user orders"
      );
    }
  }
);

// ✅ Update order status (admin)
export const updateOrderStatus = createAsyncThunk(
  "orders/updateOrderStatus",
  async ({ id, orderStatus }, { rejectWithValue }) => {
    try {
      const token = JSON.parse(localStorage.getItem("userInfo"))?.token;
      const { data } = await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/api/orders/${id}/status`,
        { orderStatus },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      return data.order;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to update order"
      );
    }
  }
);

// ✅ Slice
const orderSlice = createSlice({
  name: "orders",
  initialState: {
    orders: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // --- getAllOrders ---
      .addCase(getAllOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload;
      })
      .addCase(getAllOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // --- getUserOrders ---
      .addCase(getUserOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUserOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload;
      })
      .addCase(getUserOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // --- updateOrderStatus ---
      .addCase(updateOrderStatus.fulfilled, (state, action) => {
        const index = state.orders.findIndex(
          (o) => o._id === action.payload._id
        );
        if (index !== -1) state.orders[index] = action.payload;
      });
  },
});

export default orderSlice.reducer;
