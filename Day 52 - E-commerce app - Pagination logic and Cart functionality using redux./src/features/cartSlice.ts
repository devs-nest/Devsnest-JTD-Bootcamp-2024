import { Product } from "@/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type CartItemsType = {
  product: Product;
  quantity: number;
};
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
  },
});

export const { addToCart } = cartSlice.actions;

export default cartSlice.reducer;
