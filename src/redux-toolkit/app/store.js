import { configureStore } from "@reduxjs/toolkit";
import productsSlice from "../features/productsSlice";
import cartSlice from "../features/cartSlice";

const store = configureStore({
    reducer:{
        productsState: productsSlice,
        cartState: cartSlice
    }
});

export default store;