import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import productReducer from './slices/productSlice';
import categoryReducer from "./slices/categorySlice";
import brandReducer from "./slices/brandSlice"; // ✅ make sure this is correct
import cartReducer from "./slices/cartSlice";
import reviewReducer from "./slices/reviewSlice";
import orderReducer from "./slices/orderSlice";



const store = configureStore({
  reducer: {
    auth: authReducer,
      products: productReducer,
      categories: categoryReducer,
      brands:brandReducer,
      cart:cartReducer,
      reviews:reviewReducer,
      orders:orderReducer

  },
});

export default store;
