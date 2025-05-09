import { createSlice } from "@reduxjs/toolkit";

const initialState = localStorage.getItem("cart")
  ? JSON.parse(localStorage.getItem("cart"))
  : {
      cartItems: [], shippingAddress: {}, paymentMethod: 'Paypal', order: {}
    };

// const initialState = {
//   cartItems: localStorage.getItem("cart")
//     ? JSON.parse(localStorage.getItem("cart"))
//     : [],
//   itemsPrice: "0.00",
//   shippingPrice: "0.00",
//   taxPrice: "0.00",
//   totalPrice: "0.00",
// };

const addDecimals = (num) => {
  return (Math.round(num * 100) / 100).toFixed(2);
};

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
      state.itemsPrice = addDecimals(
        state.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0)
      );

      // calculate shipping price (if order is over $100 then free, else $10 shipping)
      state.shippingPrice = addDecimals(state.itemsPrice > 100 ? 0 : 10);

      // calculate tax price
      state.taxPrice = addDecimals(0.15 * state.itemsPrice);

      // calculate total price
      state.totalPrice = (
        Number(state.itemsPrice) +
        Number(state.shippingPrice) +
        Number(state.taxPrice)
      ).toFixed(2);

      // Save the updated cart state to localStorage
      localStorage.setItem("cart", JSON.stringify(state));
    },
    removeFromCard: (state, action) => {
      state.cartItems = state.cartItems.filter((x) => x._id !== action.payload);
      localStorage.setItem("cart", JSON.stringify(state));
    },
    saveShippingAddress: (state, action) => {
      state.shippingAddress = action.payload
      localStorage.setItem("cart", JSON.stringify(state) )
    },
    savePaymentMethod: (state, action) => {
      state.paymentMethod = action.payload
      localStorage.setItem("cart", JSON.stringify(state))
    },
    clearCartItems: (state, action) => {
      state.cartItems = [];
      localStorage.setItem("cart", JSON.stringify(state))
    }
  },
});

export const { addToCart, removeFromCard, saveShippingAddress, savePaymentMethod, clearCartItems  } = carteSlice.actions;

export default carteSlice.reducer; // Export the reducer from the slice
