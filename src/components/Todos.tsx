import { useContext } from "react";
import { FirstRow } from "./FirstRow";
import { AddTodo } from "./AddTodo";
import { TodosContext } from "../TodosContextProvider";
import "./Todo.css";
export const Todos = () => {
  const { todos } = useContext(TodosContext);

  const todosLength = todos.length;
  const hasTodos = todos.length > 0;
  const remainingTodos = todos.filter((todo) => !todo.isCompleted).length;

  return (
    <section className="section-part">
      <AddTodo />
      <div className="h-10" />
      {todos.map((todo) => (
        <FirstRow
          key={todo.id}
          id={todo.id}
          description={todo.description}
          isCompleted={todo.isCompleted}
          content={todo.content}
          created={todo.created}
          creator={todo.creator}
          dueDate={todo.dueDate}
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
  );
};
