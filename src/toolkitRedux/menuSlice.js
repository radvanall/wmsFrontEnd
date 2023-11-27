import { createSlice } from "@reduxjs/toolkit";

const menuSlice = createSlice({
  name: "menuState",
  initialState: {
    opened: false,
  },
  reducers: {
    toggle(state, action) {
      state.opened = action.payload;
    },
  },
});

export default menuSlice.reducer;
export const { toggle } = menuSlice.actions;
