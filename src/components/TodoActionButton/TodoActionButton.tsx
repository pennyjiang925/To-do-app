import dayjs, { Dayjs } from "dayjs"
import { useCallback, useMemo, useState } from "react"
import { useAppDispatch } from "../../redux/store"
import { addTodo } from "../../redux/Todos/actions/addTodo"
import { editTodo } from "../../redux/Todos/actions/editTodo"
import { Todo } from "../../types"
import TextField from "@mui/material/TextField"
import Dialog from "@mui/material/Dialog"
import DialogActions from "@mui/material/DialogActions"
import DialogTitle from "@mui/material/DialogTitle"
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs"
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider"
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker"
import AddIcon from "@mui/icons-material/Add"
import EditIcon from "@mui/icons-material/Edit"
import Button from "@mui/material/Button"
import { Responsive } from "../Responsive"

// type union
type TodoActionButtonProps =
    | {
          actionType: "edit"
          todo: Todo
      }
    | {
          actionType: "add"
          todo?: Todo
      }

export const TodoActionButton: React.FC<TodoActionButtonProps> = ({
    actionType,
    todo,
}) => {
    const [taskName, setTaskName] = useState(todo?.content ?? "")
    const [description, setDescription] = useState(todo?.description ?? "")
    const [dueDate, setDueDate] = useState<Dayjs | null>(dayjs(todo?.due_date))

    const dispatch = useAppDispatch()
    const [open, setOpen] = useState(false)

    const handleClose = useCallback(() => {
        setOpen(false)
    }, [])

    const handleEdit = () => {
        if (
            todo!.content !== taskName ||
            todo!.description !== description ||
            todo!.due_date !== dueDate?.format("YYYY-MM-DD")
        ) {
            dispatch(
                editTodo({
                    id: todo!.id,
                    content: taskName,
                    description: description,
                    due_date: dueDate?.format("YYYY-MM-DD"),
                    is_completed: false,
                })
            )
        }
    }

    const handleAdd = () => {
        dispatch(
            addTodo({
                id: "",
                content: taskName,
                description: description,
                due_date: dueDate?.format("YYYY-MM-DD"),
                is_completed: false,
            })
        )
    }

    const handleSave = () => {
        if (actionType === "add") {
            handleAdd()
        }
        if (actionType === "edit") {
            handleEdit()
        }
        handleClose()
    }

    const handleChange = (target: "title" | "description", value: string) => {
        if (target === "title") {
            setTaskName(value)
        }
        if (target === "description") {
            setDescription(value)
        }
    }

    const icon = useMemo(() => {
        return (
            <>
                {actionType === "add" && <AddIcon />}
                {actionType === "edit" && <EditIcon />}
            </>
        )
    }, [actionType])

    const label = useMemo(() => {
        return (
            <>
                {actionType === "add" && "Add"}
                {actionType === "edit" && "Edit"}
            </>
        )
    }, [actionType])

    return (
        <div>
            <Button
                variant={actionType === "add" ? "contained" : undefined}
                color={actionType === "edit" ? "error" : undefined}
                sx={{
                    marginLeft: "42px",
                    width: "70%",
                }}
                onClick={() => setOpen(true)}
            >
                {icon}
            </Button>

            <Dialog open={open} onClose={handleClose}>
                <DialogTitle color="primary">
                    {actionType === "add"
                        ? "Add "
                        : actionType === "edit"
                        ? "Edit "
                        : ""}
                    {""}
                    Todo {icon}
                </DialogTitle>

                <Responsive>
                    <TextField
                        sx={{ marginBottom: 2 }}
                        autoFocus
                        margin="dense"
                        id="name"
                        label="task name"
                        type="text"
                        fullWidth
                        variant="outlined"
                        value={taskName}
                        onChange={(e) => handleChange("title", e.target.value)}
                    />

                    <TextField
                        sx={{ marginBottom: 3 }}
                        autoFocus
                        margin="dense"
                        id="description"
                        label="task description"
                        type="text"
                        fullWidth
                        variant="outlined"
                        value={description}
                        onChange={(e) =>
                            handleChange("description", e.target.value)
                        }
                    />

                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DesktopDatePicker
                            label="Due date"
                            value={dueDate}
                            onChange={(newValue) => {
                                setDueDate(newValue)
                            }}
                            renderInput={(params) => <TextField {...params} />}
                        />
                    </LocalizationProvider>
                </Responsive>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleSave}>{label}</Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}
