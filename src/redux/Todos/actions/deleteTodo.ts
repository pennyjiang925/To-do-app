import { createAsyncThunk } from "@reduxjs/toolkit";
import { ActionReducerMapBuilder } from "@reduxjs/toolkit";
import { todoService } from "../../..";

import { TodoState } from "../types";

export const deleteTodo = createAsyncThunk(
  "todos/deleteTodo",
  async (id: string) => {
    const res = await todoService.deleteTask(id);
    if (res) {
      return {
        id,
      };
    } else {
      return undefined;
    }
  }
);

export const deleteTodoBuilder = (
  builder: ActionReducerMapBuilder<TodoState>
) => {
  builder.addCase(deleteTodo.pending, (state) => {
    state.loading = true;
  });

  builder.addCase(deleteTodo.rejected, (state) => {
    state.loading = true;
  });

  builder.addCase(deleteTodo.fulfilled, (state, action) => {
    state.todos = state.todos.filter((todo) => todo.id !== action?.payload?.id);
    state.loading = false;
  });
};
