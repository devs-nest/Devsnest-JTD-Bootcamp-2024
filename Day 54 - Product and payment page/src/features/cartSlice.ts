import { CartItemsType } from "@/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: { items: CartItemsType[] } = {
  items: [],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action: PayloadAction<CartItemsType>) {
      console.log("payload", action.payload);
      const exisitingItem = state.items.find((item) => item.product.id === action.payload.product.id);
      if (exisitingItem) {
        exisitingItem.quantity += action.payload.quantity;
      } else {
        state.items.push(action.payload);
      }
    },
    removeFromCart(state, action: PayloadAction<number>) {
      const productId = action.payload;
      const item = state.items.find((item) => item.product.id === productId);
      if (item) {
        if (item.quantity > 1) {
          item.quantity -= 1;
        } else {
          state.items = state.items.filter((item) => item.product.id !== productId);
        }
      }
    },
  },
});

export const { addToCart, removeFromCart } = cartSlice.actions;

export default cartSlice.reducer;
