import './AddTodo.css'
import AddTodoButton from '../AddTodoButton/AddTodoBtn'

export const AddTodo = () => {
    return (
        <div className="todo-container">
            <h2 className="todo-title">Let's get started</h2>

            <AddTodoButton />
        </div>
    )
}
