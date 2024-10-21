import { configureStore } from "@reduxjs/toolkit";
import dataSlice from "./dataSlice";
import CartSlice from "./CartSlice";

const appStore = configureStore({
  reducer: {
    app: dataSlice,
    cart: CartSlice,
  },
});

export default appStore;
