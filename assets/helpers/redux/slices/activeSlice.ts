import { createSlice } from "@reduxjs/toolkit";

const initialState: any = {
  activeSessionInfos: null,
} as const;

export const activeSlice = createSlice({
  name: "activeSession",
  initialState,
  reducers: {
    setActiveSessionInfos: (state, action) => {
      state.activeSessionInfos = action.payload;
    },
  },
});

// Reducers and actions
export const { setActiveSessionInfos } = activeSlice.actions;

export default activeSlice.reducer;
