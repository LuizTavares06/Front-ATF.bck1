import { combineReducers } from "@reduxjs/toolkit";
import toDos from "./toDos/toDos";
import toDo from "./toDos/toDo";

export default combineReducers({
  toDos,
  toDo,
});
