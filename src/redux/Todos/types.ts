import { Todo } from "../../types";

export interface TodoState {
  todos: Todo[];
  loading: boolean;
  error: string;
}
