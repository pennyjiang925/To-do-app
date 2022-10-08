import { createAsyncThunk } from "@reduxjs/toolkit/dist/createAsyncThunk";
import { ActionReducerMapBuilder } from "@reduxjs/toolkit/dist/mapBuilders";
import { todoService } from "../../..";

import { TodoState } from "../types";

export const deleteTodo = createAsyncThunk(
  "todos/deleteTodo",
  async (id: string) => {
    const res = await todoService.deleteTask(id);
    if (res) {
      return res.data;
    }
    throw new Error();
  }
);

export const addTodoBuilder = (builder: ActionReducerMapBuilder<TodoState>) => {
  builder.addCase(deleteTodo.fulfilled, (state, action) => {
    const deletedTodo = action.payload;
    state.todos = state.todos.filter((todo) => todo.id === deletedTodo.id);
    state.loading = false;
  });
};
