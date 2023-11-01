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

//const initialState = []; ---uncomment this when you develop this app via vite

//comment the line 24-70 when you develop this app via vite
const initialState = [
  {
    id: "8rvhaez",
    title: "STAY HOPEFUL🤞",
    text: "Stay hopeful despite I am one of the last students to solve and develop this ToDo App IPA",
    state: "in progress",
  },
  {
    id: 3,
    title:
      "Learn and apply the HTTP - POST request AND how it relates to React and Redux extraReducer functions",
    text: "Review the HTTP-POST documentation and its syntax in javascript format. Also the react components and redux extraReducer syntax and logic. Apply the acquired knowledge",
    state: "pending",
  },
  {
    id: 4,
    title:
      "Learn and apply the HTTP - DELETE request AND how it relates to React and Redux extraReducer functions",
    text: "Review the HTTP-DELETE documentation and its syntax in javascript format. Also the react components and redux extraReducer syntax and logic. Apply the acquired knowledge",
    state: "pending",
  },
  {
    id: 5,
    title:
      "Learn and apply the HTTP - PATCH request AND how it relates to React and Redux extraReducer functions",
    text: "Review the HTTP-PATCH documentation and its syntax in javascript format. Also the react components and redux extraReducer syntax and logic. Apply the acquired knowledge",
    state: "pending",
  },
  {
    id: "gkilit5",
    title: "Modify the format of the state UI ",
    text: "Format the state (pending, in progress, done ) UI. Green for Done, Orange for in progress, Blue fors pending",
    state: "pending",
  },
  {
    id: 1,
    title: "Read the Individual Project 5 - Project: To-Do List",
    text: "Read and understand each step. Review the required knowledgde needed particularly on HTTP request and REDUX",
    state: "done",
  },
  {
    id: 2,
    title: "Inspect the pre-made repository",
    text: "Read and explore the pre-written code in the repository",
    state: "done",
  },
];

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
