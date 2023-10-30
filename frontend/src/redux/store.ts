import { configureStore } from "@reduxjs/toolkit";
import todoSlice from "./todoSlice";
import notificationSlice from "./notificationSlice";
import authSlice from "./authSlice";

export const store = configureStore({
  reducer: {
    todo: todoSlice,
    notification: notificationSlice,
    auth: authSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
