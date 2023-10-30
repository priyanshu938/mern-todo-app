import { PayloadAction, createSlice } from "@reduxjs/toolkit";

type Severity = "success" | "info" | "warning" | "error";

interface INotification {
  open: boolean;
  message: string;
  severity: Severity;
}

const initialState: INotification = {
  open: false,
  message: "",
  severity: "success",
};

export const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    callNotification: (state, action: PayloadAction<INotification>) => {
      state.open = true;
      state.message = action.payload.message;
      state.severity = action.payload.severity;
    },
    closeNotification: (state) => {
      state.open = false;
    },
  },
});

export const { callNotification, closeNotification } =
  notificationSlice.actions;

export default notificationSlice.reducer;
