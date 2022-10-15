import { createAsyncThunk } from "@reduxjs/toolkit";
import { ActionReducerMapBuilder } from "@reduxjs/toolkit";

import { todoService } from "../../..";
import { mapTodoDtoToDo } from "../../../TodosContextProvider";
import { Todo } from "../../../types";
import { TodoState } from "../types";

export const getTodo = createAsyncThunk(
  "todos/getTodo",
  async (params?: { page?: number; ids?: number[] }) => {
    const response = await todoService.getAllTasks(params);

    if (response) {
      return response.map((todo: Todo) => mapTodoDtoToDo(todo));
    }
  }
);

export const getTodoBuilder = (builder: ActionReducerMapBuilder<TodoState>) => {
  builder.addCase(getTodo.pending, (state) => {
    state.loading = true;
    state.error = "";
  });

  builder.addCase(getTodo.rejected, (state, action) => {
    state.loading = false;
    state.error = action.error.message || action.error.code || "Error";
  });

  builder.addCase(getTodo.fulfilled, (state, action) => {
    state.loading = false;

    if (action.payload) {
      state.todos = action.payload;
    }
  });
};
