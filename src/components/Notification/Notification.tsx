import Badge from "@mui/material/Badge"
import MenuItem from "@mui/material/MenuItem"
import NotificationsIcon from "@mui/icons-material/Notifications"
import IconButton from "@mui/material/IconButton"
import { useSelector } from "react-redux"
import { TodoState } from "../../redux/Todos/types"

import { useState } from "react"
import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"
import Modal from "@mui/material/Modal"

const style = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
}

export const Notification = () => {
    const { todos } = useSelector((state: { todos: TodoState }) => {
        return state.todos as TodoState
    })
    const [open, setOpen] = useState(false)

    const due_task = todos.filter((todo) => todo.willExpire).length

    return (
        <MenuItem>
            <IconButton size="large" aria-label="show new notifications">
                <Badge
                    badgeContent={due_task}
                    color="error"
                    onClick={() => setOpen(true)}
                >
                    <NotificationsIcon />
                </Badge>
            </IconButton>

            <Modal
                open={open}
                onClose={() => setOpen(false)}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography
                        id="modal-modal-title"
                        variant="h6"
                        component="h2"
                    >
                        Notifications
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        You have {due_task} tasks due tomorrow
                    </Typography>
                </Box>
            </Modal>
        </MenuItem>
    )
}
