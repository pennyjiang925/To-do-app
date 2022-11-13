export type Todo = {
    id?: string
    is_completed: boolean
    content: string
    creator?: string
    created?: string
    due_date?: string
    url?: string
    description?: string
    willExpire?: boolean
}

export const defaultTodo: Todo = {
    content: "",
    is_completed: false,
}

declare global {
    interface Window {
        env: {
            BASE_URL: string
        }
    }
}
