import {
  useState,
  useEffect,
  createContext,
  useCallback,
  ChangeEvent,
  FormEvent,
} from "react";
import { Todo } from "./types";
import { v4 as uuidv4 } from "uuid";
import { AddTodoProps } from "./components/AddTodo";
import { TodoProps } from "./components/FirstRow";

type ContextOptions = Omit<TodoProps, "todo"> &
  AddTodoProps & { todos: Todo[] };

export const TodosContext = createContext<ContextOptions>({} as ContextOptions);

export const TodosContextProvider = (props: any) => {
  const localList = JSON.parse(localStorage.getItem("todos") || "[]");
  const [todos, setTodos] = useState<Todo[]>(localList);
  const [task, setTask] = useState("");

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const handleCheckTodo = useCallback(
    (id: string) => {
      const updatedTodos = todos.map((todo) => {
        if (todo.id === id) {
          return {
            ...todo,
            isCompleted: !todo.isCompleted,
          };
        }

        return todo;
      });
      setTodos(updatedTodos);
    },
    [todos]
  );

  const handleDeleteTodo = useCallback(
    (id: string) => {
      const updatedTodos = todos.filter((todo) => todo.id !== id);
      setTodos(updatedTodos);
    },
    [todos]
  );

  const handleAddTodo = useCallback(
    (todo: Todo) => {
      const updatedTodos = [...todos, todo];
      setTodos(updatedTodos);

      setTask("");
    },
    [todos]
  );

  const handleChange = useCallback((e: ChangeEvent) => {
    const { value } = e.target as HTMLInputElement;
    setTask(value);
  }, []);

  const handleSubmitTodo = useCallback(
    (e: FormEvent) => {
      e.preventDefault();

      const todo = {
        id: uuidv4(),
        task: task,
        isCompleted: false,
      };
      task && handleAddTodo(todo);
    },
    [task, handleAddTodo]
  );

  return (
    <TodosContext.Provider
      value={{
        todos,
        task,
        handleCheckTodo,
        handleDeleteTodo,
        handleChange,
        handleSubmitTodo,
      }}
    >
      {props.children}
    </TodosContext.Provider>
  );
};
