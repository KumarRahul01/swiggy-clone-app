import { configureStore } from "@reduxjs/toolkit";
import dataSlice from "./dataSlice";

const appStore = configureStore({
  reducer: {
    app: dataSlice,
  },
});

export default appStore;
