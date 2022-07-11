import { createSlice } from "@reduxjs/toolkit";

const initialState: any = {
  activeSessionInfos: null,
  urlActiveSession: null,
} as const;

export const activeSlice = createSlice({
  name: "activeSession",
  initialState,
  reducers: {
    setActiveSessionInfos: (state, action) => {
      state.activeSessionInfos = action.payload;
    },
    setUrlActiveSession: (state, action) => {
      state.urlActiveSession = action.payload;
    },
  },
});

// Reducers and actions
export const { setActiveSessionInfos, setUrlActiveSession } =
  activeSlice.actions;

export default activeSlice.reducer;
