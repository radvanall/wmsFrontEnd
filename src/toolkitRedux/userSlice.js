import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "userSlice",
  initialState: {
    logged: false,
    userData: {
      nickname: "",
      surname: "",
      avatar: "",
      role: "ROLE_ADMIN",
    },
    jwt: "",
  },
  reducers: {
    setUserData(state, action) {
      //   state.opened = !state.opened;
      state.opened = action.payload;
    },
  },
});

export default userSlice.reducer;
export const { setUserData } = userSlice.actions;
