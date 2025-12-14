import { configureStore } from "@reduxjs/toolkit";
import todoReducer from "./todoapp";

export const store =configureStore({
    reducer:{
        todo: todoReducer,
    }
})