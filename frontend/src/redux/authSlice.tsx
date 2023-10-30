import { createSlice } from "@reduxjs/toolkit";

interface IAuth {
  isAuthenticated: boolean;
}

const initialState: IAuth = {
  isAuthenticated: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state) => {
      state.isAuthenticated = true;
    },
    logout: (state) => {
      state.isAuthenticated = false;
    },
  },
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;
