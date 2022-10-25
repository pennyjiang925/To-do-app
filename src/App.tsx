import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Todo from "./pages/Todo/Todo/Todo";
import "./App.css";
import { TodosContextProvider } from "./TodosContextProvider";
import { Callback } from "./pages/Callback/Callback";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <TodosContextProvider>
        <div className="App">
          <Routes>
            <Route path="/callback" element={<Callback />} />
            <Route path="/" element={<Todo />} />
          </Routes>
        </div>
      </TodosContextProvider>
    </BrowserRouter>
  );
};

export default App;
