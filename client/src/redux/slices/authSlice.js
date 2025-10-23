import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// --- Load user from localStorage if present ---
const userInfoFromStorage = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo'))
  : null;

// --- Async Thunks for login/register ---
export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (credentials, { rejectWithValue }) => {
    try {
      const config = {
        headers: { 'Content-Type': 'application/json' },
      };
      const { data } = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/auth/login`, credentials, config);
      localStorage.setItem('userInfo', JSON.stringify(data));
      return data;
    } catch (error) {
      // 🧠 Case 1: Network/server down — no response
      if (!error.response) {
        return rejectWithValue('Server not reachable. Please check your connection.');
      }

      // 🧠 Case 2: API returned a specific message (like 401 invalid credentials)
      if (error.response.data?.message) {
        return rejectWithValue(error.response.data.message);
      }

      // 🧠 Case 3: Fallback for other errors
      return rejectWithValue('Login failed. Please try again.');
    }
  }
);

export const registerUser = createAsyncThunk(
  'auth/registerUser',
  async (userData, { rejectWithValue }) => {
    try {
      const config = {
        headers: { 'Content-Type': 'application/json' },
      };
      const { data } = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/auth/register`, userData, config);
      localStorage.setItem('userInfo', JSON.stringify(data));
      return data;
    } catch (error) {
      // 🧠 Case 1: Network/server down — no response
      if (!error.response) {
        return rejectWithValue('Server not reachable. Please check your connection.');
      }

      // 🧠 Case 2: API returned a specific message (like 401 invalid credentials)
      if (error.response.data?.message) {
        return rejectWithValue(error.response.data.message);
      }

      // 🧠 Case 3: Fallback for other errors
      return rejectWithValue('Register failed. Please try again.');
    }
  }
);

// --- Slice ---
const authSlice = createSlice({
  name: 'auth',
  initialState: {
    userInfo: userInfoFromStorage,
    loading: false,
    error: null,
  },
  reducers: {
    logout: (state) => {
      state.userInfo = null;
      localStorage.removeItem('userInfo');
    },
  },
  extraReducers: (builder) => {
    builder
      // Login
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.userInfo = action.payload;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Register
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.userInfo = action.payload;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
