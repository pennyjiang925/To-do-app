import { useState, useEffect, createContext, useCallback, ChangeEvent, FormEvent } from 'react'
import { Todo } from './types'
import { AddTodoProps } from './components/AddTodo'
import { TodoProps } from './components/FirstRow'

import { todoService } from '.'

type ContextOptions = Omit<TodoProps, 'todo'> & AddTodoProps & { todos: Todo[] }

export const TodosContext = createContext<ContextOptions>({} as ContextOptions)

export const TodosContextProvider = (props: any) => {
  const [todos, setTodos] = useState<Todo[]>([])
  const [task, setTask] = useState('')

  useEffect(() => {
    const init = async () => {
      const fetchedTasks = await todoService.getAllTasks()
      console.log('fetchedTasks', fetchedTasks)
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
            url: fetchedTask.url
          }
        })
      )
    }
    init()
  }, [])

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleAddTodo = async (todo: Todo) => {
    const updatedTodos = [...todos, todo]

    const res = await todoService.addTasks(todo)
    if (res) {
      setTodos(updatedTodos)
      setTask('')
    }
  }

  const handleCheckTodo = async (todo: Todo) => {
    const updatedTodos = todos.map(v => {
      if (v.id === todo.id) {
        return {
          ...todo,
          isCompleted: todo.isCompleted
        }
      }

      return v
    })

    await todoService.updateTasks(todo)
    setTodos(updatedTodos)
  }

  const handleDeleteTodo = async (id: string | number) => {
    const res = await todoService.deletedTasks(id)
    if (res) {
      const updatedTodos = todos.filter(todo => todo.id !== id)
      setTodos(updatedTodos)
    }
  }

  const handleChange = (e: ChangeEvent) => {
    const { value } = e.target as HTMLInputElement
    setTask(value)
  }

  const handleSubmitTodo = useCallback(
    (e: FormEvent) => {
      e.preventDefault()

      const todo = {
        id: new Date().getTime(),
        task: task,
        isCompleted: false,
        content: task,
        created: '',
        creator: '',
        dueDate: '',
        url: ''
      }
      task && handleAddTodo(todo)
    },
    [task, handleAddTodo]
  )

  return (
    <TodosContext.Provider
      value={{
        todos,
        task,
        handleCheckTodo,
        handleDeleteTodo,
        handleChange,
        handleSubmitTodo
      }}
    >
      {props.children}
    </TodosContext.Provider>
  )
}
