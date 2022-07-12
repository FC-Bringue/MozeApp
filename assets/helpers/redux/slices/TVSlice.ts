import { createSlice } from "@reduxjs/toolkit";

const initialState: any = {
  sessionActive: null,
  sessionId: null,
  hashtagSessionTV: null,
} as const;

export const TVSlice = createSlice({
  name: "TVSlice",
  initialState,
  reducers: {
    setSessionActive: (state, action) => {
      state.sessionActive = action.payload;
    },
    setSessionId: (state, action) => {
      state.sessionId = action.payload;
    },
    setHashtagSessionTV: (state, action) => {
      state.hashtagSessionTV = action.payload;
    },
  },
});

// Reducers and actions
export const { setSessionActive, setSessionId, setHashtagSessionTV } =
  TVSlice.actions;

export default TVSlice.reducer;
