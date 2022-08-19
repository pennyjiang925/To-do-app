import React from "react";
import { Navigate } from "react-router-dom";
import { TodosContextProvider } from "../../TodosContextProvider";
import { Todos } from "../Todos";

const Todo: React.FC = () => {
  const token = localStorage.getItem("token");

  return !token ? (
    <Navigate to="/login" />
  ) : (
    <TodosContextProvider>
      <Todos />
    </TodosContextProvider>
  );
};

export default Todo;
