import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";

import todoReducer from "./Todos/index";

const store = configureStore({
  reducer: {
    todos: todoReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export default store;
