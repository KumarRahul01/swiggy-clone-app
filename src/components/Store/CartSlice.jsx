import { createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

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
      const index = state.cartData.find(
        (item) => item.id === action.payload.id
      );
      if (index !== -1) {
        toast.success("Item removed from cart");
        state.cartData.splice(index, 1);
      }
    },
    increaseQty: (state, action) => {
      const existingItem = state.cartData.find(
        (item) => item.id === action.payload.id
      );

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        toast.error("Item not found in cart");
      }
    },
    decreaseQty: (state, action) => {
      const existingItem = state.cartData.find(
        (item) => item.id === action.payload.id
      );

      if (existingItem) {
        if (existingItem.quantity === 1) {
          return;
        } else {
          existingItem.quantity -= 1;
        }
      } else {
        toast.error("Item not found in cart");
      }
    },
    clearCart: (state) => {
      state.cartData.length = 0;
    },
  },
});

export const { addItem, clearCart, removeItem, increaseQty, decreaseQty } =
  CartSlice.actions;

export default CartSlice.reducer;
