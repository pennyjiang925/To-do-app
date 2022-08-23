import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Navigation } from "./components/Nav";
import Login from "./pages/login/Login";
import Todo from "./pages/todo/Todo";
import Register from "./pages/register/Register";
import "./App.css";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <div className="App">
        <Navigation />

        <Routes>
          <Route path="/" element={<Todo />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
