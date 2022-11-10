import { createAsyncThunk } from "@reduxjs/toolkit"
import { ActionReducerMapBuilder } from "@reduxjs/toolkit"
import { todoService } from "../../.."
import { mapTodoDtoToDo } from "../../../TodosContextProvider"
import { TodoState } from "../types"

export interface editTodoParams {
    id: string | undefined
    content: string
    description: string
    due_date: string | undefined
    is_completed: boolean
}

export const editTodo = createAsyncThunk(
    "todos/editTodo",
    async (params: editTodoParams) => {
        const response = await todoService.editTask(params)
        if (response) {
            return mapTodoDtoToDo(params)
        }
    }
)

export const editTodoBuilder = (
    builder: ActionReducerMapBuilder<TodoState>
) => {
    builder.addCase(editTodo.pending, (state) => {
        state.loading = false
    })

    builder.addCase(editTodo.rejected, (state) => {
        state.loading = false
    })

    builder.addCase(editTodo.fulfilled, (state, action) => {
        state.todos = state.todos.map((todo) => {
            if (todo.id === action?.payload?.id) {
                return {
                    ...todo,
                    ...action.meta.arg,
                }
            }
            return todo
        })
        state.loading = false
    })
}
