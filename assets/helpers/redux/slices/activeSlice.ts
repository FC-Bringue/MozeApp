import { createSlice } from "@reduxjs/toolkit";

const initialState: any = {
  activeSessionInfos: null,
  urlActiveSession: null,
  currentMusic: null,
  currentFromSpotify: null,
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
    setCurrentFromSpotify: (state, action) => {
      state.currentFromSpotify = action.payload;
    },
  },
});

// Reducers and actions
export const {
  setActiveSessionInfos,
  setUrlActiveSession,
  setCurrentMusic,
  setCurrentFromSpotify,
} = activeSlice.actions;

export default activeSlice.reducer;
