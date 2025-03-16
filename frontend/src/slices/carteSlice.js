import { createSlice } from "@reduxjs/toolkit";
import { startTransition } from "react";

const initialState = localStorage.getItem("cart")
  ? JSON.parse(localStorage.getItem("cart"))
  : { cartItems: [] };

const addDecimal = (num) => {
  return (Math.round(num * 100) /100).toFixed(2)
}

const carteSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const item = action.payload;

      const existItem = state.cartItems.find((x) => x._id === item._id);

      if (existItem) {
        state.cartItems = state.cartItems.map((x) =>
          x._id === existItem._id ? item : x
        );
      } else {
        state.cartItems = [...state.cartItems, item];
      }
      // calculate items price
      state.itemsPrice = addDecimal(
        state.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0)
      );
      // calculate shipping price (if order is over 100$ then free, else $10 shipping )
      state.shippingPrice = addDecimals(state.itemsPrice > 100 ? 0 : 10);
      // calculate tax price
      state.taxPrice = addDecimals(Number(0.15 * state.itemsPrice.toFixed(2)));
      // calculate total price
      state.TotalPrie =
        Number(state.itemsPrice) +
        Number(state.shippingPrice) +
        Number(state.taxPrice).toFixed(2);

      localStorage.setItem("cart", JSON.stringify(state));
    },
  },
});

export const { addToCart } = carteSlice.actions;

export default createSlice.reducer;
