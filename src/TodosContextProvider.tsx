import { useState, useEffect, createContext, ReactNode } from "react"
import { Todo } from "./types"
import { TodoProps } from "./components/Rows/Rows"
import { useSelector } from "react-redux"
import { TodoState } from "./redux/Todos/types"
import { updateTodo } from "./redux/Todos/actions/updateTodo"
import { deleteTodo } from "./redux/Todos/actions/deleteTodo"
import { addTodo } from "./redux/Todos/actions/addTodo"
import { useAppDispatch } from "./redux/store"

type ContextOptions = Omit<TodoProps, "todo"> & {
    todos: Todo[]
    loading: boolean
}

interface TodosContextProviderProps {
    children: ReactNode
}
export const mapTodoDtoToDo = (fetchedTodo: any): Todo => {
    return {
        id: fetchedTodo.id,
        content: fetchedTodo.content,
        is_completed: false,
        description: fetchedTodo.description,
        created: fetchedTodo.created,
        creator: fetchedTodo.creator,
        due_date: fetchedTodo.due?.date,
        url: fetchedTodo.url,
    }
}

export const TodosContext = createContext<ContextOptions>({} as ContextOptions)

export const TodosContextProvider = (props: TodosContextProviderProps) => {
    const { todos } = useSelector((state: { todos: TodoState }) => {
        return state.todos as TodoState
    })
    const [loading, setLoading] = useState(false)

    const dispatch = useAppDispatch()

    useEffect(() => {
        const init = async () => {
            setLoading(true)

            setLoading(false)
        }
        init()
    }, [])

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

    const handleDeleteTodo = (id: string) => {
        dispatch(deleteTodo(id))
    }

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
    )
}
