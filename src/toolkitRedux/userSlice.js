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
      window.localStorage.setItem("userData", JSON.stringify(action.payload));
    },
    setJwt(state, action) {
      state.jwt = action.payload;
      window.localStorage.setItem("jwt", action.payload);
    },
    resetUserData(state) {
      //   state.opened = !state.opened;
      state.userData = {
        userName: "",
        id: null,
        avatar: "",
        authority: "",
      };
      window.localStorage.removeItem("userData");
    },
    resetJwt(state) {
      state.jwt = "";
      window.localStorage.removeItem("jwt");
    },
  },
});

export default userSlice.reducer;
export const { setUserData, setJwt, resetJwt, resetUserData } =
  userSlice.actions;
