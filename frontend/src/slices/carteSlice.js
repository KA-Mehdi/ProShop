import { createSlice } from "@reduxjs/toolkit";

const initialState = localStorage.getItem("cart")
  ? JSON.parse(localStorage.getItem("cart"))
  : { carteItems: [] };

const carteSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {},
});

export default createSlice.reducer;
