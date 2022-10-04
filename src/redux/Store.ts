import { configureStore } from "@reduxjs/toolkit";

import todoReducer from "./Todos/index";

export default configureStore({
  reducer: {
    todos: todoReducer,
  },
});
