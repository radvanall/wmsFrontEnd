import { createSlice } from "@reduxjs/toolkit";

const sessionExpiredSlice = createSlice({
  name: "sessionExpiredSlice",
  initialState: {
    opened: false,
  },
  reducers: {
    open(state) {
      state.opened = true;
    },
    close(state) {
      state.opened = false;
    },
  },
});

export default sessionExpiredSlice.reducer;
export const { open, close } = sessionExpiredSlice.actions;
