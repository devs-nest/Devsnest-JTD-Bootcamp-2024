import { getStoredValue, saveValueToLocalStorage } from "@/lib/utils";
import { createSlice } from "@reduxjs/toolkit";
import { redirect } from "react-router-dom";

const userSlice = createSlice({
  name: "user",
  initialState: {
    user: getStoredValue("user"),
  },
  reducers: {
    login: (state, action) => {
      state.user = action.payload;
      saveValueToLocalStorage("user", action.payload);
    },
    logout: (state) => {
      state.user = null;
      saveValueToLocalStorage("user", null);
    },
  },
});

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;
