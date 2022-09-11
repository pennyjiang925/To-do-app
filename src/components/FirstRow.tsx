import DeleteIcon from "@mui/icons-material/Delete";
import { Button } from "@mui/material";
import Checkbox from "@mui/material/Checkbox";
import { useContext } from "react";
import { TodosContext } from "../TodosContextProvider";
import { Todo } from "../types";
import "./FirstRow.css";

export type TodoProps = {
  todo: Todo;
  handleCheckTodo: (todo: Todo) => void;
  handleDeleteTodo: (id: string) => void;
};

export const FirstRow = (todo: Todo) => {
  const { id, content, description, dueDate, isCompleted } = todo;
  const { handleCheckTodo, handleDeleteTodo } = useContext(TodosContext);

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
              handleCheckTodo({ ...todo, isCompleted: e.target.checked })
            }
            inputProps={{ "aria-label": "controlled" }}
          />

          <Button
            onClick={() => handleDeleteTodo(id)}
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
  );
};
