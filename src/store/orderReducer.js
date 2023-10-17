import { createSlice } from "@reduxjs/toolkit";

const orderSlice = createSlice({
  name: "order",
  initialState: [],
  reducers: {
    saveShipping: (state, action) => {},
  },
});

export const { saveShipping } = orderSlice.actions;

export default 
