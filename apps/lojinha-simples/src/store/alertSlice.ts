import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "./store";
import { SeverityType } from "../components/Alert/Alert";

export interface IAlertControl {
  show: boolean;
  severity: SeverityType;
  message: string;
}

// Define the initial state using that type
const initialState = {
  show: false,
  severity: "error",
  message: "",
} as IAlertControl;

export const alertSlice = createSlice({
  name: "alert",
  initialState,
  reducers: {
    setAlert: (_, actions: PayloadAction<IAlertControl>) => {
      return {
        message: actions.payload.message,
        severity: actions.payload.severity,
        show: actions.payload.show,
      };
    },
  },
});

export const { setAlert } = alertSlice.actions;

export const alertState = (state: RootState) => state.alert;

export default alertSlice.reducer;
