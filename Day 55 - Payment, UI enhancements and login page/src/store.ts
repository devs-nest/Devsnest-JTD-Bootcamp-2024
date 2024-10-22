import { configureStore } from "@reduxjs/toolkit";

import cartSliceReducer from "./features/cartSlice";
import userReducer from "./features/user-slice";
const store = configureStore({
  reducer: {
    cart: cartSliceReducer,
    user: userReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store;

export default store;
