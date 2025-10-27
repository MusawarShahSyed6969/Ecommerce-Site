import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartItems: JSON.parse(localStorage.getItem("cartItems")) || [],
  subtotal: 0,
};

// 🧮 Helper to calculate subtotal
const calcSubtotal = (items) =>
  items.reduce((acc, item) => acc + item.price * item.quantity, 0);

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cartItems: initialState.cartItems,
    subtotal: calcSubtotal(initialState.cartItems),
  },
  reducers: {
    addToCart: (state, action) => {
      const item = action.payload;
      const existItem = state.cartItems.find((x) => x._id === item._id);

      if (existItem) {
        state.cartItems = state.cartItems.map((x) =>
          x._id === item._id
            ? { ...x, quantity: x.quantity + item.quantity }
            : x
        );
      } else {
        state.cartItems.push(item);
      }

      state.subtotal = calcSubtotal(state.cartItems);
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },

    removeFromCart: (state, action) => {
      state.cartItems = state.cartItems.filter(
        (item) => item._id !== action.payload
      );
      state.subtotal = calcSubtotal(state.cartItems);
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },

    updateQuantity: (state, action) => {
      const { id, quantity } = action.payload;
      const item = state.cartItems.find((i) => i._id === id);
      if (item && quantity > 0) {
        item.quantity = quantity;
      }
      state.subtotal = calcSubtotal(state.cartItems);
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },

    clearCart: (state) => {
      state.cartItems = [];
      state.subtotal = 0;
      localStorage.removeItem("cartItems");
    },
  },
});

export const { addToCart, removeFromCart, updateQuantity, clearCart } =
  cartSlice.actions;

export default cartSlice.reducer;
