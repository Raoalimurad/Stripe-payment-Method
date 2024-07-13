import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "../features/cardSlice.js";

// create store
export const store = configureStore({
    reducer:{
        allCart:cartSlice
    }
})