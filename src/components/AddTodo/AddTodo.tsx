import "./AddTodo.css"
import AddTodoButton from "../AddTodoButton/AddTodoButton"

export const AddTodo = () => {
    return (
        <div className="todo-container">
            <h2 className="todo-title">Create todos</h2>

            <AddTodoButton />
        </div>
    )
}
