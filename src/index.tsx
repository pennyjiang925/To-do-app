import React from "react";
import ReactDOM from "react-dom/client";

import { Provider } from "react-redux";

import App from "./App";
import { CLIENT_ID, TOKEN_KEY } from "./Constants";
import store from "./redux/Store";
import { TodoService } from "./TodoService";

window.env = {
  BASE_URL: "https://api.todoist.com/rest/v1",
};

export const todoService = TodoService.create(window.env.BASE_URL);

const isCallback = window.location.pathname === "/callback";

const token = localStorage.getItem(TOKEN_KEY);
if (!token && !isCallback) {
  window.location.replace(
    `https://todoist.com/oauth/authorize?client_id=${CLIENT_ID}&scope=task:add,data:read_write,data:delete&state=secretstring`
  );
}

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
