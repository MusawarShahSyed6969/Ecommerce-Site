import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchBrands = createAsyncThunk('brands/fetchBrands', async () => {
  const { data } = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/products/brands`);
  console.log("brand " + data.brands);
  
  return data.brands; // assuming the backend returns { success, brands: [...] }
});

const brandsSlice = createSlice({
  name: 'brands',
  initialState: { brands: [], brandloading: false, error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBrands.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchBrands.fulfilled, (state, action) => {
        state.loading = false;
        state.brands = action.payload;
      })
      .addCase(fetchBrands.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default brandsSlice.reducer;
