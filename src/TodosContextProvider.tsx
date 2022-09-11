import { useState, useEffect, createContext, ChangeEvent } from "react";
import { Todo, TaskObj } from "./types";
import { AddTodoProps } from "./components/Modal";
import { TodoProps } from "./components/FirstRow";

import { todoService } from ".";


type ContextOptions = Omit<TodoProps, "todo"> &
  AddTodoProps & { todos: Todo[]; loading: boolean;};

export const TodosContext = createContext<ContextOptions>({} as ContextOptions);

export const TodosContextProvider = (props: any) => {
  const [todos, setTodos] = useState<Todo[]>([]);


  const [loading, setLoading] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const init = async () => {
      setLoading(true);
      const fetchedTasks = await todoService.getAllTasks();
      console.log("fetchedTasks", fetchedTasks);
      setTodos(
        fetchedTasks.map((fetchedTask: any): Todo => {
          return {
            id: fetchedTask.id,
            content: fetchedTask.content,
            isCompleted: false,
            description: fetchedTask.description,
            created: fetchedTask.created,
            creator: fetchedTask.creator,
            dueDate: fetchedTask.due?.date,
            url: fetchedTask.url,
          };
        })
      );
      setLoading(false);
    };
    init();
  }, []);

  const handleAddTodo = async (todo: Todo) => {
    setLoading(true);

    const res = await todoService.addTask(todo);
    if (res) {
      const updatedTodos = [...todos, todo];
      setTodos(updatedTodos);
   
    
    setLoading(false);
  };

  const handleCheckTodo = async (todo: Todo) => {
    setLoading(true);
    if (await todoService.completeTask(todo)) {
      const updatedTodos = todos.filter((item) => item.id !== todo.id);
      setTodos(updatedTodos);
    }
    setLoading(false);
  };

  const handleDeleteTodo = async (id: string) => {
    const res = await todoService.deletedTask(id);
    if (res) {
      const updatedTodos = todos.filter((todo) => todo.id !== id);
      setTodos(updatedTodos);
    }
  };

  // const handleAction = (func: Function) =>{
  //   setLoading(true)
  //  func()
  //   setLoading(false)
  // }

//   const handleClick = (e: ChangeEvent) => {
//     e.preventDefault();

//     const todo = {
//       id: "",
//       description: "",
//       isCompleted: false,
//       content: "",
//       created: "",
//       creator: "",
//       dueDate: "",
//       url: "",
//     };

//  handleAddTodo(todo);
//   };


  const handleClick = (e: ChangeEvent)=>{
    const taskObj = {
      taskName: 'task name',
      description: 'description'

    }

    
 
  }

  const addTask = (taskObj:any)=>{
    const list = todos 
    list.push(taskObj)
   setTodos(list)
  }

  return (
    <TodosContext.Provider
      value={{
        todos,
        
        handleCheckTodo,
        handleDeleteTodo,

        handleClick,
        loading,
      }}
    >
      {props.children}
    </TodosContext.Provider>
  );
};


