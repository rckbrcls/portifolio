import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartSlice";
import alerReducer from "./alertSlice";
export const store = configureStore({
    reducer: {
        cart: cartReducer,
        alert: alerReducer,
    },
});
