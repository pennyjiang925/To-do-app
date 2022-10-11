import { createSlice } from "@reduxjs/toolkit";
import { addTodoBuilder } from "./actions/addTodo";
import { deleteTodoBuilder } from "./actions/deleteTodo";
import { getTodoBuilder } from "./actions/getTodo";
import { updateTodoBuilder } from "./actions/updateTodo";
import { TodoState } from "./types";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const initialState: TodoState = {
  todos: [],
  loading: false,
  error: "",
};

const todoSlice = createSlice({
  name: "todos",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    addTodoBuilder(builder);
    updateTodoBuilder(builder);
    deleteTodoBuilder(builder);
    getTodoBuilder(builder);
  },
});

export default todoSlice.reducer;
