import { createAsyncThunk } from "@reduxjs/toolkit";
import { ActionReducerMapBuilder } from "@reduxjs/toolkit";
import { todoService } from "../../..";
import { mapTodoDtoToDo } from "../../../TodosContextProvider";
import { TodoState } from "../types";

interface updateTodoParams {
  id: string | undefined;
  content: string;
  description: string;
  due_date: string | undefined;
  is_completed: boolean;
}

export const updateTodo = createAsyncThunk(
  "todos/updateTodo",
  async (params: updateTodoParams) => {
    const response = await todoService.completeTask(params);
    if (response) {
      return mapTodoDtoToDo(response);
    }
  }
);

export const updateTodoBuilder = (
  builder: ActionReducerMapBuilder<TodoState>
) => {
  builder.addCase(updateTodo.pending, (state) => {
    state.loading = true;
  });

  builder.addCase(updateTodo.rejected, (state) => {
    state.loading = false;
  });
  builder.addCase(updateTodo.fulfilled, (state, action) => {
    const updatedTodo = action.payload;
    const index = state.todos.findIndex((todo) => todo.id === updatedTodo?.id);
    state.todos[index] = updatedTodo;
    state.loading = false;
  });
};
