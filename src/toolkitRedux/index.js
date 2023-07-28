import { combineReducers, configureStore } from "@reduxjs/toolkit";
import menuSlice from "./menuSlice";
import productsSlice from "./productsSlice";
import deleteSlice from "./deleteMessageSlice";
import stockFilterSlice from "./stockFilterSlice";
const rootReducer = combineReducers({
  menuState: menuSlice,
  productsSlice: productsSlice,
  deleteSlice: deleteSlice,
  stockFilterSlice: stockFilterSlice,
});
export const store = configureStore({
  reducer: rootReducer,
});
