import { createSlice } from "@reduxjs/toolkit";

const sessionExpiredSlice = createSlice({
  name: "sessionExpiredSlice",
  initialState: {
    opened: false,
  },
  reducers: {
    open(state) {
      state.opened = true;
      console.log("state=", state.opened);
      //state.opened = action.payload;
    },
    close(state) {
      state.opened = false;
      console.log("state=", state.opened);
      //state.opened = action.payload;
    },
  },
});

export default sessionExpiredSlice.reducer;
export const { open, close } = sessionExpiredSlice.actions;
