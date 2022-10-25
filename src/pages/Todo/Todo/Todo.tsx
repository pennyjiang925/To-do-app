import React, { useEffect } from "react"
import { TodosContextProvider } from "../../../TodosContextProvider"
import { Todos } from "../../Todos/Todos"
import { getTodo } from "../../../redux/Todos/actions/getTodo"
import { useAppDispatch } from "../../../redux/store"

const Todo: React.FC = () => {
    const dispatch = useAppDispatch()
    useEffect(() => {
        dispatch(getTodo())
    }, [dispatch])
    return (
        <TodosContextProvider>
            <Todos />
        </TodosContextProvider>
    )
}

export default Todo
