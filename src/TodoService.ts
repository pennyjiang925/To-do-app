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
  }

  async addTasks(request: Todo) {
    try {
      await axios.post(`${this.baseUrl}/tasks`, request);
      return true
    } catch (error) {
      console.log(error);
      return false
    }
  }

  async getAllTasks() {
    try {
      const res = await axios.get(`${this.baseUrl}/tasks`);
      return res.data;
    } catch (error) {
      console.log(error);
    }
  }

  async updateTasks(todo: Todo) {
    try {
      const res = await axios.post(`${this.baseUrl}/tasks/${todo.id}`, todo);
      return res.data;
    } catch (error) {
      console.log(error);
    }
  }

  async deletedTasks(id: string | number) {
    try {
      await axios.delete(`${this.baseUrl}/tasks/${id}`);
      return true
    } catch (error) {
      console.log(error);
      return false
    }
  }

  static create(baseUrl: string): TodoService {
    if (todoInstance) {
      return todoInstance;
    }
    return new TodoService({ baseUrl });
  }
}
