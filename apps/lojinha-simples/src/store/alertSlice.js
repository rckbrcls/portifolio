import { createSlice } from "@reduxjs/toolkit";
// Define the initial state using that type
const initialState = {
    show: false,
    severity: "error",
    message: "",
};
export const alertSlice = createSlice({
    name: "alert",
    initialState,
    reducers: {
        setAlert: (_, actions) => {
            return {
                message: actions.payload.message,
                severity: actions.payload.severity,
                show: actions.payload.show,
            };
        },
    },
});
export const { setAlert } = alertSlice.actions;
export const alertState = (state) => state.alert;
export default alertSlice.reducer;
