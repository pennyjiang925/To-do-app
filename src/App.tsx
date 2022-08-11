import React from "react";
import { Todos } from "./components/Todos";
import "./App.css";
import { TodosContextProvider } from "./TodosContextProvider";

const App: React.FC = () => {
  return (
    <TodosContextProvider>
      <div className="App">
        <h1>To Do List 2022</h1>
        <Todos />
      </div>
    </TodosContextProvider>
  );
};

export default App;
