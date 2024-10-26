import { configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
import dataSlice from "./dataSlice";
import CartSlice from "./CartSlice"; // Import CartSlice

// Create a persist config for the cart slice
const cartPersistConfig = {
  key: "cart",
  storage,
  whitelist: ["cartData"], // Persist only the cartData in CartSlice
};

// Wrap the CartSlice reducer with persistReducer
const persistedCartReducer = persistReducer(cartPersistConfig, CartSlice);

// Configure the store with both reducers
const appStore = configureStore({
  reducer: {
    app: dataSlice, // Non-persistent reducer
    cart: persistedCartReducer, // Persistent cart reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Disable serializable checks for redux-persist compatibility
    }),
});

// Export both the store and persistor
export const persistor = persistStore(appStore);
export default appStore;
