import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: JSON.parse(localStorage.getItem("user")) || null,
  },
  reducers: {
    saveUser: (state, action) => {
      state.user = action.payload;
      localStorage.setItem("user", JSON.stringify(state.user));
    },
    logout: (state) => {
      state.user = null;
      localStorage.removeItem("user");
      localStorage.removeItem("cart");
    },
  },
});

export const { saveUser, removeItem, logout } = authSlice.actions;

export default authSlice.reducer;
