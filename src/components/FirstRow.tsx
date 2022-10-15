import DeleteIcon from "@mui/icons-material/Delete";
import { Button } from "@mui/material";
import Checkbox from "@mui/material/Checkbox";
import { useContext } from "react";
import { useSelector } from "react-redux";
import { TodoState } from "../redux/Todos/types";
import { TodosContext } from "../TodosContextProvider";
import { Todo } from "../types";
import "./FirstRow.css";

export type TodoProps = {
  todo: Todo;
  handleAddTodo: (todo: Todo) => void;
  handleCheckTodo: (todo: Todo) => void;
  handleDeleteTodo: (id: string) => void;
};

export const FirstRow = (todo: Todo) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { todos } = useSelector((state: { todos: TodoState }) => {
    return state.todos as TodoState;
  });
  const {
    id,
    content,
    description,
    due_date: dueDate,
    is_completed: isCompleted,
  } = todo;
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
              handleCheckTodo({ ...todo, is_completed: e.target.checked })
            }
            inputProps={{ "aria-label": "Checkbox demo" }}
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
  );
};
