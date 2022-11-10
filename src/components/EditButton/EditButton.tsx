import React, { useEffect, useState } from "react"
import EditIcon from "@mui/icons-material/Edit"
import Button from "@mui/material/Button"
import TextField from "@mui/material/TextField"
import Dialog from "@mui/material/Dialog"
import DialogActions from "@mui/material/DialogActions"
import DialogTitle from "@mui/material/DialogTitle"
import dayjs, { Dayjs } from "dayjs"
import { styled } from "@mui/material/styles"
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs"
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider"
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker"
import { ChangeEvent } from "react"
import { useAppDispatch } from "../../redux/store"
import IconButton from "@mui/material/IconButton"
import { Todo } from "../../types"
import { editTodo } from "../../redux/Todos/actions/editTodo"

const Responsive = styled("div")(({ theme }) => ({
    paddingLeft: theme.spacing(3),
    paddingRight: theme.spacing(3),
    [theme.breakpoints.up("md")]: {
        width: 500,
        height: 300,
    },
}))

export type EditTodoProps = {
    handleEdit: (e: ChangeEvent) => void
    onChange: (value: string) => void
}

export const EditButton: React.FC<{ todo: Todo }> = ({ todo }) => {
    const [taskName, setTaskName] = useState("")
    const [description, setDescription] = useState("")
    const [value, setValue] = useState<Dayjs | null>(dayjs())

    const dispatch = useAppDispatch()

    const [open, setOpen] = useState(false)

    useEffect(() => {
        setTaskName(todo.content)
        setDescription(todo.description || "")
        setValue(dayjs(todo.due_date))
    }, [todo])

    const handleEdit = async (todo: Todo) => {
        if (
            todo.content !== taskName ||
            todo.description !== description ||
            todo.due_date !== value?.format("YYYY-MM-DD")
        )
            dispatch(
                editTodo({
                    id: todo.id,
                    content: taskName,
                    description: description,
                    due_date: value?.format("YYYY-MM-DD"),
                    is_completed: false,
                })
            )

        handleClose()
    }

    const handleClose = () => {
        setOpen(false)
    }

    const handleChange = (target: "title" | "description", value: string) => {
        if (target === "title") {
            setTaskName(value)
        }
        if (target === "description") {
            setDescription(value)
        }
    }

    return (
        <div>
            <IconButton color="error" onClick={() => setOpen(true)}>
                {<EditIcon />}
            </IconButton>

            <Dialog open={open} onClose={handleClose}>
                <DialogTitle color="primary">
                    Edit Todo {<EditIcon />}
                </DialogTitle>
                <Responsive>
                    <TextField
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
                    <br />
                    <br />
                    <TextField
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
                    <br />
                    <br />
                    <br />
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DesktopDatePicker
                            label="Due date"
                            value={value}
                            onChange={(newValue) => {
                                setValue(newValue)
                            }}
                            renderInput={(params) => <TextField {...params} />}
                        />
                    </LocalizationProvider>
                </Responsive>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={() => handleEdit(todo)}>Save</Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}
