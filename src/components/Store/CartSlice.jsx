import { createSlice } from "@reduxjs/toolkit";

export const CartSlice = createSlice({
  name: "Cart",
  initialState: {
    cartData: [],
    loading: false,
  },
  reducers: {
    addItem: (state, action) => {
      const existingItem = state.cartData.find(
        (item) => item.id === action.payload.id
      );
      if (existingItem) {
        existingItem.quantity += action.payload.quantity;
      } else {
        state.cartData.push(action.payload);
      }
    },
    removeItem: (state, action) => {
      const index = state.cartData.findIndex(
        (item) => item.id === action.payload
      );
      if (index !== -1) {
        state.cartData.splice(index, 1);
      }
    },
    clearCart: (state) => {
      state.cartData = [];
    },
  },
});

export const { addItem, clearCart, removeItem } = CartSlice.actions;

export default CartSlice.reducer;
