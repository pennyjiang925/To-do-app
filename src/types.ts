export type Todo = {
  id?: string;
  is_completed: boolean;
  content: string;
  creator?: string;
  created?: string;
  due_date?: string;
  url?: string;
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
