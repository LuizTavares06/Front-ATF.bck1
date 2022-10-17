import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getTask = createAsyncThunk(
  "tasks/getTask", //nome que vai aparecer no dev tools
  async (id: number) => {
    const response = await axios.get(
      `https://jsonplaceholder.typicode.com/todos/${id}`
    );
    return response.data;
  }
);

const initialState = "";

const TodoSlice = createSlice({
  name: "Todo",
  initialState,
  reducers: {
    create(state, action) {
      return action.payload;
    },
    clear() {
      return initialState;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getTask.fulfilled, (state, action) => {
      return { ...action.payload };
    });
  },
});

export const { create, clear } = TodoSlice.actions;
export default TodoSlice.reducer;
