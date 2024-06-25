import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "./store";
import { IProdutoData } from "../interfaces/IProdutoData";

export interface ICart {
  products: IProdutoData[];
  subTotal: number;
  quantity: number;
}

// Define the initial state using that type
const initialState = { products: [], subTotal: 0, quantity: 0 } as ICart;

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem: (state, actions: PayloadAction<IProdutoData>) => {
      const subTotal = state.subTotal + actions.payload.price;
      const itens = [...state.products, actions.payload];
      const quantity = state.quantity + 1;

      const newCart: ICart = {
        subTotal: subTotal,
        products: itens,
        quantity: quantity,
      };

      return newCart;
    },
    removeItem: (state, actions: PayloadAction<IProdutoData>) => {
      const subTotal = state.subTotal - actions.payload.price;
      const itens = state.products.filter(
        (value) => value.id !== actions.payload.id
      );
      const quantity = state.quantity - 1;

      const newCart: ICart = {
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

export const cartState = (state: RootState) => state.cart;

export default cartSlice.reducer;
