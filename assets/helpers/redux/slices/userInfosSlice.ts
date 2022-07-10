import { createSlice } from "@reduxjs/toolkit";

const initialState: any = {
  token: "",
  lightsList: null,
  sessionList: false,
  name: "",
  mail: "",
  userId: "",
  isLoggedToSpotify: false,
  mozeYeelightControlToken: "",
} as const;

export const userInfosSlice = createSlice({
  name: "userInfos",
  initialState,
  reducers: {
    setToken: (state, action) => {
      console.log(action.payload);
      state.token = action.payload;
      console.log(state);
    },
    setLightsList: (state, action) => {
      state.lightsList = action.payload;
    },
    setSessionList: (state, action) => {
      state.sessionList = action.payload;
    },
    setName: (state, action) => {
      state.name = action.payload;
    },
    setMail: (state, action) => {
      state.mail = action.payload;
    },
    setUserId: (state, action) => {
      state.userId = action.payload;
    },
    setIsLoggedToSpotify: (state, action) => {
      state.isLoggedToSpotify = action.payload;
    },
    setMozeYeelightControlToken: (state, action) => {
      state.mozeYeelightControlToken = action.payload;
    },
  },
});

// Reducers and actions
export const {
  setToken,
  setLightsList,
  setSessionList,
  setName,
  setMail,
  setUserId,
  setIsLoggedToSpotify,
  setMozeYeelightControlToken,
} = userInfosSlice.actions;

export default userInfosSlice.reducer;
