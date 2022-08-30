import axios, { AxiosRequestHeaders } from "axios";

import { UserInfo, Todo } from "./types";

type Options = {
  baseUrl: string;
  headers?: AxiosRequestHeaders;
};

let todoInstance: TodoService;

export class TodoService {
  [x: string]: any;
  private baseUrl = "";
  private headers: AxiosRequestHeaders | undefined;
  private token = "";

  private constructor(options: Options) {
    this.baseUrl = options.baseUrl;
    this.headers = options.headers;
    const localToken = localStorage.getItem("token");
    if (localToken) this.token = localToken;
  }

  async registerhandler(request: UserInfo) {
    try {
      await axios.post(`${this.baseUrl}/user/register`, request);
      return true;
    } catch (error) {
      return false;
    }
  }

  async login(data: Pick<UserInfo, "email" | "password">) {
    try {
      const res = await axios.post(`${this.baseUrl}/user/login`, data);
      this.token = res.data.token;
      localStorage.setItem("token", res.data.token);
      return true;
    } catch (error) {
      return false;
    }
  }

  async addTodo(request: Todo) {
    try {
      const res = await axios.post(`${this.baseUrl}/task`, request);
      this.token = res.data.token;
      localStorage.setItem("token", res.data.token);
      return true;
    } catch (error) {
      return false;
    }
  }

  // async getAllTasks(){
  //   try{
  //     const res = await axios.get(`${this.baseUrl}/task`)
  //   }
  // }

  //

  // async updatedTask(request: Todo) {
  // try {
  //   await axios.put(`${this.baseUrl}/task/5ddcd1566b55da0017597239`)
  // }
  // }

  // async deleteTaskById(request: Todo){
  //   try {
  //     await axios.delete(`${this.baseUrl}/task/5ddcd1566b55da0017597239`)
  //   }
  // }

  static create(baseUrl: string): TodoService {
    if (todoInstance) {
      return todoInstance;
    }
    return new TodoService({ baseUrl });
  }
}
