import axios, { AxiosRequestHeaders } from "axios";
import { UserInfo } from "./types";

type Options = {
  baseUrl: string;
  headers?: AxiosRequestHeaders;
};

let todoInstance: TodoService;

export class TodoService {
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

  static create(baseUrl: string): TodoService {
    if (todoInstance) {
      return todoInstance;
    }
    return new TodoService({ baseUrl });
  }
}
