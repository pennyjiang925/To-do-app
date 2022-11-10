import { useEffect, createContext, ReactNode } from "react"
import { Todo } from "./types"
import { TodoProps } from "./components/Rows/Rows"
import { useSelector } from "react-redux"
import { TodoState } from "./redux/Todos/types"
import { updateTodo } from "./redux/Todos/actions/updateTodo"
import { deleteTodo } from "./redux/Todos/actions/deleteTodo"
import { addTodo } from "./redux/Todos/actions/addTodo"
import { useAppDispatch } from "./redux/store"
import { getTodos } from "./redux/Todos/actions/getTodos"
import { editTodo } from "./redux/Todos/actions/editTodo"

type ContextOptions = Omit<TodoProps, "todo"> & {
    todos: Todo[]
    loading: boolean
}

interface TodosContextProviderProps {
    children: ReactNode
}

const getExpireTime = (dateStr: string) => {
    if (!dateStr) {
        return 0
    }
    const newStr = dateStr.replace(/-/g, "/")
    const date = new Date(newStr)
    const timeStr = date.getTime().toString()
    return Number(timeStr.substring(0, 10))
}
export const mapTodoDtoToDo = (fetchedTodo: any): Todo => {
    const dueTime = getExpireTime(fetchedTodo.due?.date)
    const currentTime = Math.round(new Date().setHours(0, 0, 0, 0) / 1000)

    return {
        id: fetchedTodo.id,
        content: fetchedTodo.content,
        is_completed: false,
        description: fetchedTodo.description,
        created: fetchedTodo.created,
        creator: fetchedTodo.creator,
        due_date: fetchedTodo.due?.date,
        url: fetchedTodo.url,
        willExpire: currentTime < dueTime,
    }
}

export const TodosContext = createContext<ContextOptions>({} as ContextOptions)

export const TodosContextProvider = (props: TodosContextProviderProps) => {
    const { todos, loading } = useSelector((state: { todos: TodoState }) => {
        return state.todos as TodoState
    })

    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(getTodos())
    }, [dispatch])

    const handleAddTodo = async (todo: Todo) => {
        dispatch(
            addTodo({
                id: undefined,
                content: todo.content || "",
                description: todo.description || "",
                due_date: todo.due_date,
                is_completed: todo.is_completed || false,
            })
        )
    }

    const handleCheckTodo = (todo: Todo) => {
        dispatch(
            updateTodo({
                id: todo.id,
                content: todo.content || "",
                description: todo.description || "",
                due_date: todo.due_date,
                is_completed: todo.is_completed || false,
            })
        )
    }

    const handleEditTodo = async (todo: Todo) => {
        dispatch(
            editTodo({
                id: todo.id,
                content: todo.content || "",
                description: todo.description || "",
                due_date: todo.due_date,
                is_completed: todo.is_completed || false,
            })
        )
    }

    const handleDeleteTodo = (id: string) => {
        dispatch(deleteTodo(id))
    }

    return (
        <TodosContext.Provider
            value={{
                todos,

                handleCheckTodo,
                handleDeleteTodo,
                handleEditTodo,
                handleAddTodo,
                loading,
            }}
        >
            {props.children}
        </TodosContext.Provider>
    )
}
