import React from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import "./App.css"
import { TodosContextProvider } from "./TodosContextProvider"
import { Callback } from "./pages/Callback/Callback"
import { Todos } from "./pages/Todos/Todos"

const App: React.FC = () => {
    return (
        <BrowserRouter>
            <TodosContextProvider>
                <div className="App">
                    <Routes>
                        <Route path="/callback" element={<Callback />} />
                        <Route path="/" element={<Todos />} />
                    </Routes>
                </div>
            </TodosContextProvider>
        </BrowserRouter>
    )
}

export default App
