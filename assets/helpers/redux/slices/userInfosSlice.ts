import { createSlice } from "@reduxjs/toolkit";

const initialState: any = {
  token: "",
  lightsList: null,
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
  },
});

// Reducers and actions
export const { setToken, setLightsList } = userInfosSlice.actions;

export default userInfosSlice.reducer;
