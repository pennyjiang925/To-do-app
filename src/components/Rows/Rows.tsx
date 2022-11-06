import DeleteIcon from "@mui/icons-material/Delete"
import { Button } from "@mui/material"
import Checkbox from "@mui/material/Checkbox"
import { useContext } from "react"
import "./Rows.css"
import { Todo } from "../../types"
import { TodosContext } from "../../TodosContextProvider"
import { DragDropContext, Droppable } from "react-beautiful-dnd"
import FavoriteBorder from "@mui/icons-material/FavoriteBorder"
import Favorite from "@mui/icons-material/Favorite"

export type TodoProps = {
    todo: Todo
    handleAddTodo: (todo: Todo) => void
    handleCheckTodo: (todo: Todo) => void
    handleDeleteTodo: (id: string) => void
}

const label = { inputProps: { "aria-label": "Checkbox demo" } }

export const Rows = (todo: Todo) => {
    const {
        id,
        content,
        description,
        due_date: dueDate,
        is_completed: isCompleted,
    } = todo
    const { handleCheckTodo, handleDeleteTodo } = useContext(TodosContext)

    const handleDragEnd = (result: any) => {
        if (!result.destination) return
        // const items = { ...todo }
        // const [reorderedItem] = items.splice(result.source.index, 1)
        // items.splice(result.destination.index, 0, reorderedItem)
    }

    return (
        <div className="container">
            <DragDropContext onDragEnd={handleDragEnd}>
                <Droppable droppableId="todo-list">
                    {(provided) => (
                        <div
                            className="row"
                            {...provided.droppableProps}
                            ref={provided.innerRef}
                        >
                            <div>
                                <div className="task-name">{content}</div>
                                <div className="task-description">
                                    {description}
                                </div>
                                <div className="task-date">{dueDate}</div>
                            </div>

                            <div>
                                <Checkbox
                                    {...label}
                                    icon={<FavoriteBorder />}
                                    checkedIcon={<Favorite />}
                                />
                                <Checkbox
                                    checked={isCompleted}
                                    onChange={(e) =>
                                        handleCheckTodo({
                                            ...todo,
                                            is_completed: e.target.checked,
                                        })
                                    }
                                    inputProps={{
                                        "aria-label": "Checkbox demo",
                                    }}
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
                    )}
                </Droppable>
            </DragDropContext>
        </div>
    )
}
