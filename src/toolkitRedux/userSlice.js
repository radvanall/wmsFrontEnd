import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "userSlice",
  initialState: {
    userData: {
      userName: "",
      id: null,
      avatar: "",
      authority: "",
    },
    jwt: "",
  },
  reducers: {
    setUserData(state, action) {
      //   state.opened = !state.opened;
      state.userData = action.payload;
    },
    setJwt(state, action) {
      state.jwt = action.payload;
    },
  },
});

export default userSlice.reducer;
export const { setUserData, setJwt } = userSlice.actions;
