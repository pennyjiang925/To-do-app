import { createSlice } from "@reduxjs/toolkit"
import { addTodoBuilder } from "./actions/addTodo"
import { deleteTodoBuilder } from "./actions/deleteTodo"
import { getTodoBuilder } from "./actions/getTodos"
import { updateTodoBuilder } from "./actions/updateTodo"
import { editTodoBuilder } from "./actions/editTodo"
import { TodoState } from "./types"

const initialState: TodoState = {
    todos: [],
    loading: false,
    error: "",
}

const todoSlice = createSlice({
    name: "todos",
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
        addTodoBuilder(builder)
        updateTodoBuilder(builder)
        deleteTodoBuilder(builder)
        editTodoBuilder(builder)
        getTodoBuilder(builder)
    },
})

export default todoSlice.reducer
