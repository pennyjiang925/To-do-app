import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Todo from "./pages/todo/Todo";

import "./App.css";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={<Todo />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
