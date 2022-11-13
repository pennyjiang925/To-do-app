import { Rows } from "../../components/Rows/Rows"
import { AddTodo } from "../../components/AddTodo/AddTodo"
import { useSelector } from "react-redux"
import logo from "../../assets/logo3.png"
import { EmptyTodo } from "./EmptyTodo"
import "./Todos.css"
import { Backdrop, CircularProgress } from "@mui/material"
import { TodoState } from "../../redux/Todos/types"
import { usePagination } from "../../hooks/usePagination"
import { useSearch } from "../../hooks/useSearch"
import { Notification } from "../../components/Notification/Notification"

import { TodoActionButton } from "../../components/TodoActionButton"
import { defaultTodo } from "../../types"

export const Todos = () => {
    const { todos, loading } = useSelector((state: { todos: TodoState }) => {
        return state.todos as TodoState
    })

    const hasTodos = todos.length > 0
    const remainingTodos = todos.filter((todo) => !todo.is_completed).length

    const { searchInput, filteredTodos } = useSearch(todos)

    const { currentTodos, paginationComponent } = usePagination(filteredTodos)

    return (
        <>
            <div className="header">
                <img src={logo} className="logo" alt="" />
                <div className="search-container">
                    {searchInput}
                    {!hasTodos && <p className="to-do">0/0</p>}

                    {hasTodos && (
                        <p className="to-do">
                            {remainingTodos}/{todos.length}
                        </p>
                    )}
                    <Notification />
                </div>
            </div>
            <section className="section-part">
                <div className="add-todo">
                    <AddTodo />
                </div>

                <div className="list-container">
                    <div className="todo-list">
                        <h2 className="task-title">My tasks</h2>
                        <br />
                        {!hasTodos && <EmptyTodo />}
                        {hasTodos && (
                            <div>
                                {currentTodos.map((todo) => (
                                    <Rows
                                        key={todo.id}
                                        id={todo.id}
                                        description={todo.description}
                                        is_completed={todo.is_completed}
                                        content={todo.content}
                                        created={todo.created}
                                        creator={todo.creator}
                                        due_date={todo.due_date}
                                        url={todo.url}
                                    />
                                ))}
                            </div>
                        )}

                        <br />
                        <div className="btn">
                            <TodoActionButton
                                actionType="add"
                                todo={defaultTodo}
                            />
                        </div>
                        {paginationComponent}
                    </div>
                </div>
            </section>

            <Backdrop sx={{ color: "#fff", zIndex: 9999 }} open={loading}>
                <CircularProgress color="inherit" />
            </Backdrop>
        </>
    )
}
