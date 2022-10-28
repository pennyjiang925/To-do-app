import DeleteIcon from "@mui/icons-material/Delete"
import { Button } from "@mui/material"
import Checkbox from "@mui/material/Checkbox"
import { useContext } from "react"

import "./Rows.css"
import { Todo } from "../../types"
import { TodosContext } from "../../TodosContextProvider"

export type TodoProps = {
    todo: Todo
    handleAddTodo: (todo: Todo) => void
    handleCheckTodo: (todo: Todo) => void
    handleDeleteTodo: (id: string) => void
}

export const Rows = (todo: Todo) => {
    const {
        id,
        content,
        description,
        due_date: dueDate,
        is_completed: isCompleted,
    } = todo
    const { handleCheckTodo, handleDeleteTodo } = useContext(TodosContext)

    return (
        <div className="container">
            <div className="row">
                <div>
                    <div className="task-name">{content}</div>
                    <div className="task-description">{description}</div>
                    <div className="task-date">{dueDate}</div>
                </div>

                <div>
                    <Checkbox
                        checked={isCompleted}
                        onChange={(e) =>
                            handleCheckTodo({
                                ...todo,
                                is_completed: e.target.checked,
                            })
                        }
                        inputProps={{ "aria-label": "Checkbox demo" }}
                        defaultChecked
                    />

                    <Button
                        onClick={() => handleDeleteTodo(id!)}
                        variant="outlined"
                        startIcon={<DeleteIcon />}
                        size="small"
                        color="error"
                    >
                        Delete
                    </Button>
                </div>
            </div>
        </div>
    )
}
