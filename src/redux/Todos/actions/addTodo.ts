import { ActionReducerMapBuilder, createAsyncThunk } from "@reduxjs/toolkit";
import Todos from "..";
import { todoService } from "../../..";
import { mapTodoDtoToDo } from "../../../TodosContextProvider";
import { Todo } from "../../../types";
import { TodoState } from "../types";

interface addTodoParams {
  id: string | undefined;
  content: string;
  description: string;
  due_date: string | undefined;
  is_completed: boolean;
}

export const addTodo = createAsyncThunk(
  "todos/addTodo",
  async (params: addTodoParams) => {
    const response = await todoService.addTask(params);

    if (response.success) {
      return mapTodoDtoToDo(response.data);
    }
    throw new Error(response.error);
  }
);

export const addTodoBuilder = (builder: ActionReducerMapBuilder<TodoState>) => {
  builder.addCase(addTodo.pending, (state) => {
    state.loading = true;
    state.error = "";
  });

  builder.addCase(addTodo.rejected, (state, action) => {
    state.loading = false;
    state.error = action.error.message || action.error.code || "Error";
  });

  builder.addCase(addTodo.fulfilled, (state, action) => {
    const addedTodo = action.payload;
    state.loading = false;
    state.todos = [...state.todos, addedTodo];
  });
};
