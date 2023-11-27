import { createSlice } from "@reduxjs/toolkit";

const deleteSlice = createSlice({
  name: "deleteSlice",
  initialState: {
    opened: false,
    message: "",
  },
  reducers: {
    toggle(state) {
      state.opened = !state.opened;
    },
    setMessage(state, action) {
      state.message = action.payload;
    },
  },
});

export default deleteSlice.reducer;
export const { toggle, setMessage } = deleteSlice.actions;
