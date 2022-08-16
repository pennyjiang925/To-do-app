import AddIcon from "@mui/icons-material/Add";
import Button from "@mui/material/Button";
import { useContext } from "react";
import { TodosContext } from "../TodosContextProvider";
import { ChangeEvent, FormEvent } from "react";
import "./AddTodo.css";

export type AddTodoProps = {
  task: string;
  handleSubmitTodo: (e: FormEvent) => void;
  handleChange: (e: ChangeEvent) => void;
};

export const AddTodo = () => {
  const { task, handleSubmitTodo, handleChange } = useContext(TodosContext);

  return (
    <form className="form-box" onSubmit={handleSubmitTodo}>
      <input
        className="input-content"
        type="text"
        name="task"
        value={task}
        placeholder="What do you have planned?"
        onChange={handleChange}
      />

      <Button
        startIcon={<AddIcon />}
        variant="contained"
        color="error"
        size="small"
        type="submit"
      >
        Add task
      </Button>
    </form>
  );
};
