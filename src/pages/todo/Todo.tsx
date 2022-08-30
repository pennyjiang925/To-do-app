import React from "react";
import { Navigate } from "react-router-dom";
import { TodosContextProvider } from "../../TodosContextProvider";
import { Todos } from "../../components/Todos";

const Todo: React.FC = () => {
  const token = localStorage.getItem("token");
  return !token ? (
    <Navigate to="/login" />
  ) : (
    <TodosContextProvider>
      <h1>TO DO List 2022</h1>
      <Todos />
    </TodosContextProvider>
  );
};

export default Todo;
