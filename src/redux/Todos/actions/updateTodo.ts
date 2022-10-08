import { createAsyncThunk } from "@reduxjs/toolkit/dist/createAsyncThunk";
import { ActionReducerMapBuilder } from "@reduxjs/toolkit/dist/mapBuilders";
import { todoService } from "../../..";
import { Todo } from "../../../types";
import { TodoState } from "../types";
import { addTodoParams } from "./addTodo";

function mapTodoDtoToDo(data: Todo | Todo[] | undefined): any {
  throw new Error("Function not implemented.");
}

export const updateTodo = createAsyncThunk(
  "todos/updateTodo",
  async (params: addTodoParams) => {
    const response = await todoService.completeTask(params);
    if (response) {
      return mapTodoDtoToDo(params);
    }
  }
);

export const addTodoBuilder = (builder: ActionReducerMapBuilder<TodoState>) => {
  builder.addCase(updateTodo.fulfilled, (state, action) => {
    const updatedTodo = action.payload;
    const index = state.todos.findIndex((todo) => todo.id === updatedTodo.id);
    state.todos[index] = updatedTodo;
    state.loading = false;
  });
};
