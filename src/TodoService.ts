import axios, { AxiosRequestHeaders } from "axios";

import { Todo } from "./types";

type Options = {
  baseUrl: string;
  headers?: AxiosRequestHeaders;
};

let todoInstance: TodoService;
const token = "7892c2d53e783154d8c73b3d9f5c19de4968c442";
axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

export class TodoService {
  [x: string]: any;
  private baseUrl = "";
  private headers: AxiosRequestHeaders | undefined;
  private token = "";

  private constructor(options: Options) {
    this.baseUrl = options.baseUrl;
    this.headers = options.headers;
    axios.defaults.baseURL = this.baseUrl;
  }

  async addTask(request: Todo) {
    try {
      await axios.post(`/tasks`, request);
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  async getAllTasks() {
    try {
      const res = await axios.get(`/tasks`);
      return res.data;
    } catch (error) {
      console.log(error);
    }
  }

  async completeTask(todo: Todo) {
    try {
      const res = await axios.post(`/tasks/${todo.id}/close`);
      return res.status === 204;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  async deletedTask(id: string) {
    try {
      await axios.delete(`${this.baseUrl}/tasks/${id}`);
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  // async executeHttpRequest ()

  static create(baseUrl: string): TodoService {
    if (todoInstance) {
      return todoInstance;
    }
    return new TodoService({ baseUrl });
  }
}
