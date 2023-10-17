import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartReducer";
import productReducer from "./productReducer";
import authReducer from "./authReducer";

const store = configureStore({
  reducer: {
    cart: cartReducer,
    product: productReducer,
    auth: authReducer,
  },
});

export default store;
