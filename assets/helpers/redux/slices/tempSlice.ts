import { createSlice } from "@reduxjs/toolkit";

type TempState = {
  newSessionName: string | null;
  newSessionHashtag: string | null;
  newSessionIdPLaylist: string | null;
  newSessionLights: string | null | object;
};

const initialState: TempState = {
  newSessionName: null,
  newSessionHashtag: null,
  newSessionIdPLaylist: null,
  newSessionLights: null,
} as const;

export const tempSlice = createSlice({
  name: "temporaryValues",
  initialState,
  reducers: {
    setNewSessionName: (state, action) => {
      state.newSessionName = action.payload;
    },
    setNewSessionHashtag: (state, action) => {
      state.newSessionHashtag = action.payload;
    },
    setNewSessionIdPlaylist: (state, action) => {
      state.newSessionIdPLaylist = action.payload;
    },
    setNewSessionLights: (state, action) => {
      state.newSessionLights = action.payload;
    },
  },
});

// Reducers and actions
export const {
  setNewSessionName,
  setNewSessionLights,
  setNewSessionHashtag,
  setNewSessionIdPlaylist,
} = tempSlice.actions;

export default tempSlice.reducer;
