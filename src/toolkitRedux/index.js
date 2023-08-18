import { combineReducers, configureStore } from "@reduxjs/toolkit";
import menuSlice from "./menuSlice";
import productsSlice from "./productsSlice";
import deleteSlice from "./deleteMessageSlice";
import stockFilterSlice from "./stockFilterSlice";
import newOrderSlice from "./newOrderSlice";
import userSlice from "./userSlice";
const rootReducer = combineReducers({
  menuState: menuSlice,
  productsSlice: productsSlice,
  deleteSlice: deleteSlice,
  stockFilterSlice: stockFilterSlice,
  newOrderSlice: newOrderSlice,
  userSlice: userSlice,
});
export const store = configureStore({
  reducer: rootReducer,
});
