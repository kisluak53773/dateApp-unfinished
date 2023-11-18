import { combineReducers } from "@reduxjs/toolkit";
import userSlice from "./userSlice";
import deckSlice from "./deckSlice";

export default combineReducers({
  [userSlice.name]: userSlice.reducer,
  [deckSlice.name]: deckSlice.reducer,
});
