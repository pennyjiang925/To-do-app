import { configureStore } from "@reduxjs/toolkit";

import todoReducer from "./Todos/index";

const store = configureStore({
  reducer: {
    todos: todoReducer,
  },
});

export default store;
