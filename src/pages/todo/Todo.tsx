import React, { useEffect } from "react";
import { TodosContextProvider } from "../../TodosContextProvider";
import { Todos } from "../../components/Todos";
import { useDispatch } from "react-redux";
import { getTodo } from "../../redux/Todos/actions/getTodo";

const Todo: React.FC = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getTodo());
  }, []);
  return (
    <TodosContextProvider>
      <h1>TO DO List 2022</h1>
      <Todos />
    </TodosContextProvider>
  );
};

export default Todo;
