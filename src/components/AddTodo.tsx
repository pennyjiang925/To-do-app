// import { useContext } from "react";
// import { TodosContext } from "../TodosContextProvider";
// import { FormEvent } from "react";
import "./AddTodo.css";
import { FormDialog } from "./Modal";

export const AddTodo = () => {
  return (
    <div className="todo-container">
      <h2 className="todo-title">Let's get started</h2>

      <FormDialog />
    </div>
  );
};
