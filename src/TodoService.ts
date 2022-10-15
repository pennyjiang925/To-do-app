import axios, { AxiosRequestHeaders } from "axios";

import { Todo } from "./types";

type Options = {
  baseUrl: string;
  headers?: AxiosRequestHeaders;
};

let todoInstance: TodoService;
const token = "7892c2d53e783154d8c73b3d9f5c19de4968c442";
axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

interface TodoServiceResponse {
  success: boolean;
  data?: Todo | Todo[];
  error?: any;
}

export class TodoService {
  [x: string]: any;
  private baseUrl = "";

  private constructor(options: Options) {
    this.baseUrl = options.baseUrl;
    this.headers = options.headers;
    axios.defaults.baseURL = this.baseUrl;
  }

  async addTask(request: Todo): Promise<TodoServiceResponse> {
    try {
      const res = await axios.post(`/tasks`, request);

      if (res.status === 200) {
        return {
          success: true,
          data: res.data,
        };
      } else {
        return {
          success: false,
        };
      }
    } catch (error) {
      console.log(error);
      return {
        success: false,
        error,
      };
    }
  }

  async getAllTasks(params?: { page?: number, ids?: number[] }) {
    try {
      const _params = params
      if (_params?.ids) {
        Object.assign(_params, { ids: JSON.stringify(_params.ids) })
      }

      const res = await axios.get(`/tasks`, {
        params: _params

      });
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

  async deleteTask(id: string) {
    try {
      await axios.delete(`/tasks/${id}`);
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  static create(baseUrl: string): TodoService {
    if (todoInstance) {
      return todoInstance;
    }
    return new TodoService({ baseUrl });
  }
}
