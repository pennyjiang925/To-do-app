import React, { useEffect } from "react";
import { todoService } from "../..";
import { TodosContextProvider } from "../../TodosContextProvider";
import { Todos } from "../../components/Todos";

const Todo: React.FC = () => {
  useEffect(() => {
    todoService.getAllTasks();
  }, []);
  return (
    <TodosContextProvider>
      <h1>TO DO List 2022</h1>
      <Todos />
    </TodosContextProvider>
  );
};

export default Todo;
