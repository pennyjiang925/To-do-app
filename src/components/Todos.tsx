import { FirstRow } from "./FirstRow";
import { AddTodo } from "./AddTodo";
import { useSelector } from "react-redux";

import "./Todo.css";
import { Backdrop, CircularProgress } from "@mui/material";
import { TodoState } from "../redux/Todos/types";

export const Todos = () => {
  const { todos, loading } = useSelector((state: { todos: TodoState }) => {
    return state.todos as TodoState;
  });

  const todosLength = todos.length;
  const hasTodos = todos.length > 0;
  const remainingTodos = todos.filter((todo) => !todo.is_completed).length;

  return (
    <>
      <section className="section-part">
        <AddTodo />
        <div className="h-10" />
        {todos.map((todo) => (
          <FirstRow
            key={todo.id}
            id={todo.id}
            description={todo.description}
            is_completed={todo.is_completed}
            content={todo.content}
            created={todo.created}
            creator={todo.creator}
            due_date={todo.due_date}
            url={todo.url}
          />
        ))}

        {!hasTodos && <p className="to-do"></p>}

        {hasTodos && (
          <p className="to-do">
            [{remainingTodos} of {todosLength} todos remaining]
          </p>
        )}
      </section>

      <Backdrop sx={{ color: "#fff", zIndex: 9999 }} open={loading}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </>
  );
};
