import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// ✅ Fetch all orders
export const getAllOrders = createAsyncThunk("orders/getAllOrders", async (_, { rejectWithValue }) => {
  try {
    const token = JSON.parse(localStorage.getItem("userInfo"))?.token;
    const { data } = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/orders`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    return data.orders;
  } catch (err) {
    return rejectWithValue(err.response?.data?.message || "Failed to fetch orders");
  }
});

// ✅ Update order status
export const updateOrderStatus = createAsyncThunk(
  "orders/updateOrderStatus",
  async ({ id, orderStatus }, { rejectWithValue }) => {
    try {
      const token = JSON.parse(localStorage.getItem("userInfo"))?.token;
      console.log(id,orderStatus);
      
      const { data } = await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/api/orders/${id}/status`,
        { orderStatus },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      return data.order;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Failed to update order");
    }
  }
);

const orderSlice = createSlice({
  name: "orders",
  initialState: { orders: [], loading: false, error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllOrders.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(getAllOrders.fulfilled, (state, action) => { state.loading = false; state.orders = action.payload; })
      .addCase(getAllOrders.rejected, (state, action) => { state.loading = false; state.error = action.payload; })

      .addCase(updateOrderStatus.fulfilled, (state, action) => {
        const index = state.orders.findIndex((o) => o._id === action.payload._id);
        if (index !== -1) state.orders[index] = action.payload;
      });
  },
});

export default orderSlice.reducer;
