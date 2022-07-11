import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  displayResume: false,
  displayConfig: false,
  displayApp: false,
  displayParams: false,
} as const;

export const websiteWorkerSlice = createSlice({
  name: "websiteWorker",
  initialState,
  reducers: {
    setDisplayResume: (state, action) => {
      state.displayResume = action.payload;
    },
    setDisplayConfig: (state, action) => {
      state.displayConfig = action.payload;
    },
    setDisplayApp: (state, action) => {
      state.displayApp = action.payload;
    },
    setDisplayParams: (state, action) => {
      state.displayParams = action.payload;
    },
  },
});

// Reducers and actions
export const {
  setDisplayResume,
  setDisplayConfig,
  setDisplayParams,
  setDisplayApp,
} = websiteWorkerSlice.actions;

export default websiteWorkerSlice.reducer;
