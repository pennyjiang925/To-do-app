import { ActionReducerMapBuilder, createAsyncThunk } from "@reduxjs/toolkit";
import { todoService } from "../../..";
import { TodoState } from "../types";

interface addTodoParams {
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

  builder.addCase(addTodo.rejected, (state) => {
    // 404, 500
    state.loading = false;
    state.error = "";
  });

  builder.addCase(addTodo.fulfilled, (state, action) => {
    //    200, 201

    const addedTodo = action.payload;
    state.loading = false;
    state.todos = [...state.todos, addedTodo];
  });
};

function mapTodoDtoToDo(
  data:
    | import("../../../types").Todo
    | import("../../../types").Todo[]
    | undefined
): any {
  throw new Error("Function not implemented.");
}

// add todo

// state.todos = [...state.todos. addedTodo]

// update todo

// const index = state.todos.findIndex(todo => todo.id === updatedTodo.id)
// state.todos[index] = updatedTodo

// or

// state.todos.splice(index, 1, updatedTodo)

// delete todo

// state.todos = state.todos.filter(todo => todo.id === deletedTodo.id)
