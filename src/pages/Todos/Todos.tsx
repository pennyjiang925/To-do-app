import { Rows } from "../../components/Rows/Rows"
import { AddTodo } from "../../components/AddTodo/AddTodo"
import { useSelector } from "react-redux"
import logo from "../../assets/logo2.png"
import "./Todos.css"
import { Backdrop, CircularProgress } from "@mui/material"
import { TodoState } from "../../redux/Todos/types"
import { usePagination } from "../../hooks/usePagination"
import { useSearch } from "../../hooks/useSearch"
import { Notification } from "../../components/Notification/Notification"
import AddTodoButton from "../../components/AddTodoButton/AddTodoButton"

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
                    {!hasTodos && <p className="to-do"></p>}

                    {hasTodos && (
                        <p className="to-do">
                            {remainingTodos}/{todos.length}
                        </p>
                    )}
                    <Notification />
                </div>
            </div>
            <section className="section-part">
                <AddTodo />

                <div className="todo-list">
                    <h2 className="task-title">My tasks</h2>
                    <br />
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
                    <br />
                    <div className="btn">
                        <AddTodoButton />
                    </div>
                </div>
            </section>
            <Backdrop sx={{ color: "#fff", zIndex: 9999 }} open={loading}>
                <CircularProgress color="inherit" />
            </Backdrop>

            {paginationComponent}
        </>
    )
}
