import { createSlice } from "@reduxjs/toolkit";
// Define the initial state using that type
const initialState = { products: [], subTotal: 0, quantity: 0 };
export const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addItem: (state, actions) => {
            const subTotal = state.subTotal + actions.payload.price;
            const itens = [...state.products, actions.payload];
            const quantity = state.quantity + 1;
            const newCart = {
                subTotal: subTotal,
                products: itens,
                quantity: quantity,
            };
            return newCart;
        },
        removeItem: (state, actions) => {
            const subTotal = state.subTotal - actions.payload.price;
            const itens = state.products.filter((value) => value.id !== actions.payload.id);
            const quantity = state.quantity - 1;
            const newCart = {
                subTotal: subTotal,
                products: itens,
                quantity: quantity,
            };
            return newCart;
        },
        cleanCart: () => {
            return initialState;
        },
    },
});
export const { addItem, removeItem, cleanCart } = cartSlice.actions;
export const cartState = (state) => state.cart;
export default cartSlice.reducer;
