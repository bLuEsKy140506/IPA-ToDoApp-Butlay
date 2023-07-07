import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { todoAPI } from "../../api";

// the outside "thunk creator" function
export const fetchTodos = createAsyncThunk("todos/fetchAll", () =>
  todoAPI.fetchAll()
);
export const deleteTodo = createAsyncThunk("todo/delete", (id) => {
  // TODO: return a call  to corresponding API method i.e. todoAPI.fetchAll()
  todoAPI.deleteOne(id);
});
export const updateTodo = createAsyncThunk("todo/update", (id) => {
  // console.log(id);
  todoAPI.updateOne(id);
  // TODO: return a call  to corresponding API method i.e. todoAPI.fetchAll()
});
export const addTodo = createAsyncThunk("todo/add", (todo) => {
  todoAPI.createOne(todo);
});

const initialState = [];

const todosSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    add(state, action) {
      state = action.payload;
      return state;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchTodos.fulfilled, (state, action) => {
      Object.assign(state, action.payload);
    });

    builder.addCase(deleteTodo.fulfilled, (state, action) => {
      const index = state.findIndex((todo) => todo.id === action.meta.arg);
      if (index !== -1) state.splice(index, 1);
    });

    builder.addCase(addTodo.fulfilled, (state, action) => {
      state.push(action.meta.arg);
    });

    builder.addCase(updateTodo.fulfilled, (state, action) => {
      // console.log(state, action.meta.arg);
      return state.map((data) => {
        if (data.id === action.meta.arg.id) {
          //if match then change the variables based on the user inputs
          return action.meta.arg;
        } else {
          //no change of the object
          return data;
        }
      });
    });
  },
});
export const { add } = todosSlice.actions;
export default todosSlice.reducer;
