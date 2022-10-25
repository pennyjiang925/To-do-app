import { Pagination, Stack } from '@mui/material'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { Todo } from '../types'

const PAGE_SIZE = 5

export const usePagination = (todos: Todo[]) => {
    const [currentPage, setCurrentPage] = useState(1)
    const [currentTodos, setCurrentTodos] = useState<Todo[]>([])

    const totalPages = Math.ceil(todos.length / PAGE_SIZE)

    useEffect(() => {
        const indexOfLastTodo = currentPage * PAGE_SIZE
        const indexOfFirstTodo = indexOfLastTodo - PAGE_SIZE
        setCurrentTodos(todos.slice(indexOfFirstTodo, indexOfLastTodo))
    }, [currentPage, todos])

    const onPageChange = useCallback((e: any, value: number) => {
        setCurrentPage(value)
    }, [])

    const paginationComponent = useMemo(() => {
        return (
            <Stack className="pagination" spacing={2}>
                <Pagination
                    count={totalPages}
                    page={currentPage}
                    onChange={onPageChange}
                    showFirstButton={true}
                    showLastButton={true}
                    color="primary"
                />
            </Stack>
        )
    }, [totalPages, currentPage, onPageChange])

    return {
        currentTodos,
        paginationComponent,
    }
}
