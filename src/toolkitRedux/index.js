import { combineReducers, configureStore } from "@reduxjs/toolkit";
import menuSlice from "./menuSlice";
import productsSlice from "./productsSlice";
import deleteSlice from "./deleteMessageSlice";
const rootReducer = combineReducers({
  menuState: menuSlice,
  productsSlice: productsSlice,
  deleteSlice: deleteSlice,
});
export const store = configureStore({
  reducer: rootReducer,
});
