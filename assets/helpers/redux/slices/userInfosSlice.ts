import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: "",
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
  },
});

// Reducers and actions
export const { setToken } = userInfosSlice.actions;

export default userInfosSlice.reducer;
