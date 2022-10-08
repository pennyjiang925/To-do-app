import { useState, useEffect, createContext } from "react";
import { Todo } from "./types";
import { TodoProps } from "./components/FirstRow";
import { todoService } from ".";
import { useDispatch, useSelector } from "react-redux";
import { TodoState } from "./redux/Todos/types";
import { updateTodo } from "./redux/Todos/actions/updateTodo";
import { deleteTodo } from "./redux/Todos/actions/deleteTodo";

type ContextOptions = Omit<TodoProps, "todo"> & {
  todos: Todo[];
  loading: boolean;
};

const mapTodoDtoToDo = (fetchedTodo: any): Todo => {
  return {
    id: fetchedTodo.id,
    content: fetchedTodo.content,
    is_completed: false,
    description: fetchedTodo.description,
    created: fetchedTodo.created,
    creator: fetchedTodo.creator,
    due_date: fetchedTodo.due?.date,
    url: fetchedTodo.url,
  };
};

export const TodosContext = createContext<ContextOptions>({} as ContextOptions);

function setTodos(_arg0: any) {
  throw new Error("Function not implemented.");
}

export const TodosContextProvider = (props: any) => {

  const { todos} = useSelector((state: { todos: TodoState }) => {
    return state.todos as TodoState;
  });
  const [loading, setLoading] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars

  const dispatch = useDispatch()

  
  useEffect(() => {
    const init = async () => {
    setLoading(true)
      const fetchedTasks = await todoService.getAllTasks();
      console.log("fetchedTasks", fetchedTasks);
      setTodos(fetchedTasks.map(mapTodoDtoToDo));

  setLoading(false)
    };
    init();
  }, []);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleAddTodo = async (todo: Todo) => {
    setLoading(true);

    const res = await todoService.addTask(todo);

    if (res.success) {
      const updatedTodos = [...todos, mapTodoDtoToDo(res.data)];
      setTodos(updatedTodos);

      setLoading(false);
    }
  };

  const handleCheckTodo = async (todo:Todo) => {
    setLoading(true);
 
    dispatch(updateTodo)
      
    
    setLoading(false);
  };

  const handleDeleteTodo = async (id: string) => {


    dispatch(deleteTodo)
    }
  };

  return (
    <TodosContext.Provider
      value={{
        todos,

        handleCheckTodo,
        handleDeleteTodo,

        handleAddTodo,
        loading,
      }}
    >
      {props.children}
    </TodosContext.Provider>
  );
};



