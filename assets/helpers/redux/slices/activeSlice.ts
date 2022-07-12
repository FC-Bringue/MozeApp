import { createSlice } from "@reduxjs/toolkit";

const initialState: any = {
  activeSessionInfos: null,
  urlActiveSession: null,
  currentMusic: null,
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
    setCurrentMusic: (state, action) => {
      state.currentMusic = action.payload;
    },
  },
});

// Reducers and actions
export const { setActiveSessionInfos, setUrlActiveSession, setCurrentMusic } =
  activeSlice.actions;

export default activeSlice.reducer;
