import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from "@reduxjs/toolkit";
import { RootState } from "../..";
import { get } from "../../../service/api/jasonplaceholder/toDos";
import ToDo from "../../../types/toDo";
// coleção de todos
//usar o adapter

// dispara um getAllToDos que vai fazer uma requisição no endereço informado, o que veio na requisição será atribuído ao response e por fim vai setar o adapter (no fulfilled)
//o create async thank tem o pending, fulfilled...
export const getAllTasks = createAsyncThunk(
  "toDos/getAll", //nome que vai aparecer no dev tools
  async () => {
    const response = await get("/users/1/todos");
    return response;
  }
);

const adapter = createEntityAdapter<ToDo>({
  selectId: (item) => item.id,
});

export const { selectAll, selectById } = adapter.getSelectors(
  (state: RootState) => state.toDo
);

const TodosSvcSlice = createSlice({
  name: "tasks",
  initialState: adapter.getInitialState({
    loading: false,
  }),
  reducers: {
    addOne: adapter.addOne,
    addMany: adapter.addMany,
    updateOne: adapter.updateOne,
  },
  extraReducers: (builder) => {
    builder.addCase(getAllTasks.pending, (state, action) => {
      state.loading = true;
    });
    //faz a requisição
    builder.addCase(getAllTasks.fulfilled, (state, action) => {
      //joga pra dentro da store
      adapter.setAll(state, action.payload);
      state.loading = false;
    });
  },
});

export const { addOne, addMany, updateOne } = TodosSvcSlice.actions;
export default TodosSvcSlice.reducer;
