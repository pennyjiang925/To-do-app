import { defaultTodo } from "../../types"
import { TodoActionButton } from "../TodoActionButton"
import "./AddTodo.css"

export const AddTodo = () => {
    return (
        <div className="todo-container">
            <h2 className="todo-title">Create todos</h2>

            <TodoActionButton actionType="add" todo={defaultTodo} />
        </div>
    )
}
