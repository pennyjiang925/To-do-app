import React, { useState } from "react"
import TextField from "@mui/material/TextField"
import Dialog from "@mui/material/Dialog"
import DialogActions from "@mui/material/DialogActions"
import DialogTitle from "@mui/material/DialogTitle"
import dayjs, { Dayjs } from "dayjs"
import Button from "@mui/material/Button"
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs"
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider"
import { ChangeEvent } from "react"
import { addTodo } from "../../redux/Todos/actions/addTodo"
import { useAppDispatch } from "../../redux/store"
import { styled } from "@mui/material/styles"
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker"
import AddTaskIcon from "@mui/icons-material/AddTask"
import AddIcon from "@mui/icons-material/Add"

export type AddTodoProps = {
    handleSubmit: (e: ChangeEvent) => void
    onChange: (value: string) => void
}

const Responsive = styled("div")(({ theme }) => ({
    paddingLeft: theme.spacing(3),
    paddingRight: theme.spacing(3),
    [theme.breakpoints.up("md")]: {
        width: 500,
        height: 300,
    },
}))

const AddTodoButton: React.FC = () => {
    const [taskName, setTaskName] = useState("")
    const [description, setDescription] = useState("")

    const [open, setOpen] = useState(false)

    const [value, setValue] = useState<Dayjs | null>(dayjs())

    const dispatch = useAppDispatch()

    const handleSubmit = async () => {
        dispatch(
            addTodo({
                id: "",
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
            <Button
                variant="contained"
                sx={{
                    marginLeft: "30px",
                    width: "80%",
                }}
                onClick={() => setOpen(true)}
            >
                {<AddIcon />}
            </Button>

            <Dialog open={open} onClose={handleClose}>
                <DialogTitle color="primary">
                    Add Todo {<AddTaskIcon />}
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
                    <Button onClick={handleSubmit}>Add</Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}

export default AddTodoButton
