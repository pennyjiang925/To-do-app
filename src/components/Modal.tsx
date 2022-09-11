import { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";

import DialogTitle from "@mui/material/DialogTitle";
import dayjs, { Dayjs } from "dayjs";

import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";

import { useContext } from "react";
import { TodosContext } from "../TodosContextProvider";
import { ChangeEvent } from "react";

export type AddTodoProps = {
  handleClick: (e: ChangeEvent) => void;
  onChange: (value: string) => void;
};

export const FormDialog = (e: ChangeEvent) => {
  const { handleClick } = useContext(TodosContext);
  const [taskName, setTaskName] = useState("");
  const [description, setDescription] = useState("");

  const [open, setOpen] = useState(false);

  const [value, setValue] = useState<Dayjs | null>(dayjs());

  // const handleChange = (e: ChangeEvent) => {

  //   // const newDate = dayjs();
  //   // setValue(newDate);

  // };

  const handleClose = () => {
    setOpen(false);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleChange = (e: any) => {
    const [label, value] = e.target;

    if (label === "taskName") {
      setTaskName(value);
    } else {
      setDescription(value);
    }
  };

  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        Add tasks
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add Todos</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="task name"
            type="text"
            fullWidth
            variant="outlined"
            value={taskName}
            onChange={handleChange}
          />
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
            onChange={handleChange}
          />
          <br />
          <br />
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DesktopDatePicker
              label="Due date"
              inputFormat="MM/DD/YYYY"
              value={value}
              onChange={(newValue) => {
                setValue(newValue);
              }}
              renderInput={(params) => <TextField {...params} />}
            />
          </LocalizationProvider>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleClick}>Add</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
