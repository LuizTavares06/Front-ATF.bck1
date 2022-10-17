import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "../..";

export interface ToDos {
  uid: string;
  title: string;
}

export const getAllTasks = createAsyncThunk(
  "tasks/getAll", //nome que vai aparecer no dev tools
  async () => {
    const response = await axios.get(
      "https://jsonplaceholder.typicode.com/todos"
    );
    return response.data;
  }
);

const adapter = createEntityAdapter<ToDos>({
  selectId: (item) => item.uid,
});

export const { selectAll, selectById } = adapter.getSelectors(
  (state: RootState) => state.toDos
);

const ToDosSlice = createSlice({
  name: "todos",
  initialState: adapter.getInitialState({ loading: false }),
  reducers: {
    addOne: adapter.addOne,
    addMany: adapter.addMany,
    updateOne: adapter.updateOne,
  },
  extraReducers: (builder) => {
    builder.addCase(getAllTasks.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(getAllTasks.fulfilled, (state, action) => {
      adapter.setAll(state, action.payload);
      state.loading = false;
    });
  },
});

export const { addOne, addMany, updateOne } = ToDosSlice.actions;
export default ToDosSlice.reducer;
