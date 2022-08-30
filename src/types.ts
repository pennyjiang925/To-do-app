export type Todo = {
  id: string;
  task: string;
  isCompleted: boolean;
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
