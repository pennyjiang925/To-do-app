import { Input } from "@mui/material";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Todo } from "../types";

export const useSearch = (todos: Todo[]) => {
  const [searchKeyword, setSearchKeyword] = useState("");
  const [filteredTodos, setFilteredTodos] = useState<Todo[]>(todos);

  useEffect(() => {
    const result = todos.filter((todo) => {
      return todo.content.includes(searchKeyword);
    });
    setFilteredTodos(result);
  }, [todos, searchKeyword]);

  const onSearchChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
      setSearchKeyword(e.target.value);
    },
    [setSearchKeyword]
  );

  const searchInput = useMemo(() => {
    return (
      <div className="search-input-wrap">
        <Input
          onChange={onSearchChange}
          placeholder="Search by text"
          className="search-input"
        />
      </div>
    );
  }, [onSearchChange]);

  return {
    filteredTodos,
    searchInput,
  };
};
