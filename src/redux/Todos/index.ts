import { createSlice } from "@reduxjs/toolkit";
import { addTodoBuilder } from "./actions/addTodo";
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
  extraReducers: (builder) => addTodoBuilder(builder),
});

export default todoSlice.reducer;
