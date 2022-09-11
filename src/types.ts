export type Todo = {
  id: string;
  isCompleted: boolean;
  content: string;
  creator: string;
  created: string;
  dueDate: string;
  url: string;
  description?: string;
};

declare global {
  interface Window {
    env: {
      BASE_URL: string;
    };
  }
}

export interface UserInfo {
  username: string;
  email: string;
  password: string;
  confirmpassword: string;
}

export interface TaskObj {
  taskName: string;
  description: string;
  dueDate: string;
}
