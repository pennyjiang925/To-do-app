import { createAsyncThunk } from "@reduxjs/toolkit"
import { ActionReducerMapBuilder } from "@reduxjs/toolkit"

import { todoService } from "../../.."
import { mapTodoDtoToDo } from "../../../TodosContextProvider"
import { Todo } from "../../../types"
import { TodoState } from "../types"

export const getTodos = createAsyncThunk("todos/getTodos", async () => {
    const response = await todoService.getAllTasks()

    if (response) {
        return response.map((todo: Todo) => mapTodoDtoToDo(todo))
    }
})

export const getTodoBuilder = (builder: ActionReducerMapBuilder<TodoState>) => {
    builder.addCase(getTodos.pending, (state) => {
        state.loading = true
        state.error = ""
    })

    builder.addCase(getTodos.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || action.error.code || "Error"
    })

    builder.addCase(getTodos.fulfilled, (state, action) => {
        state.loading = false

        if (action.payload) {
            state.todos = action.payload
        }
    })
}
