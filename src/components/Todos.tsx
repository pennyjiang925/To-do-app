import { FirstRow } from "./FirstRow";
import { AddTodo } from "./AddTodo";
import { useSelector } from "react-redux";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import "./Todo.css";
import { Backdrop, CircularProgress, Input } from "@mui/material";
import { TodoState } from "../redux/Todos/types";
import { useEffect, useState } from "react";
import { mapTodoDtoToDo } from "../TodosContextProvider";
import { todoService } from "..";
import { useAppDispatch } from "../redux/Store";
import { getTodo } from "../redux/Todos/actions/getTodo";

export const Todos = () => {
  const dispatch = useAppDispatch();

  const { todos, loading } = useSelector((state: { todos: TodoState }) => {
    return state.todos as TodoState;
  });

  const todosLength = todos.length;
  const hasTodos = todos.length > 0;
  const remainingTodos = todos.filter((todo) => !todo.is_completed).length;

  const [currentPage, setCurrentPage] = useState(1);
  const [todosPerPage, setTodosPerPage] = useState(5);

  useEffect(() => {
    const indexOfLastTodo = currentPage * todosPerPage;
    const indexOfFirstTodo = indexOfLastTodo - todosPerPage;
    const currentTodos = todos.slice(indexOfFirstTodo, indexOfLastTodo);

    console.log("currentTodos", currentTodos);

    setTodosPerPage(Math.ceil(todos.length / todosPerPage));
  }, [currentPage, todos, todosPerPage]);

  const handleChange = (e: any, value: number) => {
    setCurrentPage(value);
    dispatch(getTodo({ page: value }));
  };

  const onSearch = (
    e: React.KeyboardEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    if (e.code === "Enter") {
      let ids;
      if (e.target.value)
        ids = e.target.value.split(",").map((todo) => Number(todo));
      dispatch(getTodo({ page: currentPage, ids }));
    }
  };

  return (
    <>
      <section className="section-part">
        <AddTodo />

        <div className="search-input-wrap">
          <Input
            onKeyDown={onSearch}
            placeholder="Search by id"
            className="search-input"
          />
        </div>

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

      <Stack spacing={2} lineHeight={7} alignItems="center">
        <Pagination
          count={10}
          page={currentPage}
          onChange={handleChange}
          showFirstButton={true}
          showLastButton={true}
          color="primary"
        />
      </Stack>
    </>
  );
};
