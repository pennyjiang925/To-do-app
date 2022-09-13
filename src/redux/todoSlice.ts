import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface TodoState {
  value: string | boolean;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const initialState: TodoState = {
  value: "",
};

const todoSlice = createSlice({
  name: "todos",
  initialState: [
    {
      id: "",
      description: "",
      content: "",
      is_completed: false,
      due_date: "",
    },
  ],

  reducers: {
    addTodo: (state, action: PayloadAction<string | boolean>) => {
      const newTodo = {
        id: "",
        description: "",
        content: "",
        is_completed: false,
        due_date: "",
      };
      state.push(newTodo);
    },
    toggleComplete: (state, action) => {
      const index = state.findIndex((todo) => todo.id === action.payload.id);
      state[index].is_completed = action.payload.completed;
    },
  },
});

export const { addTodo, toggleComplete } = todoSlice.actions;

export default todoSlice.reducer;
