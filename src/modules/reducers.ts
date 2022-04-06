import { combineReducers } from "@reduxjs/toolkit";
import * as slices from "./Slices/catSlice";

export default combineReducers({
  catReduce: slices.catSlice.reducer,
});
