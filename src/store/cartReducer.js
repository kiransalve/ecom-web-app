import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: [],
  reducers: {
    fetchCart: (state, action) => {
      return action.payload;
    },
    addToCart: (state, action) => {
      const newItem = action.payload;
      const itemIndex = state.findIndex((item) => item.title === newItem.title);
      if (itemIndex === -1) {
        state.push({
          ...newItem,
          quantity: 1,
        });
      } else {
        state[itemIndex].quantity++;
      }
    },
    increaseQuantity: (state, action) => {
      const itemId = action.payload;
      const itemIndex = state.findIndex((item) => item.id === itemId);
      if (itemIndex !== -1) {
        if (state[itemIndex].quantity) {
          state[itemIndex].quantity++;
        }
      }
    },
    decreaseQuantity: (state, action) => {
      const itemId = action.payload;
      const itemIndex = state.findIndex((item) => item.id === itemId);
      if (itemIndex !== -1 && state[itemIndex].quantity > 1) {
        state[itemIndex].quantity--;
      } else {
        state.splice(itemIndex, 1);
      }
    },
    removeFromCart: (state, action) => {
      const itemId = action.payload;
      const itemIndex = state.findIndex((item) => item.id === itemId);
      state.splice(itemIndex, 1);
    },
    removeAllItem: (state, action) => {
      state = [];
    },
  },
});

export const {
  fetchCart,
  addToCart,
  increaseQuantity,
  decreaseQuantity,
  removeFromCart,
  removeAllItem,
} = cartSlice.actions;

export default cartSlice.reducer;
