import { createSlice } from "@reduxjs/toolkit";

type TempState = {
  newSessionName: string | null;
  newSessionHashtag: string | null;
  newSessionIdPLaylist: string | null;
  newSessionLights: string | null | object;
  tmpLights: string | null | object;
  tmpPlaylist: string | null | object;
  tmpSession: string | null | object;
};

const initialState: TempState = {
  newSessionName: null,
  newSessionHashtag: null,
  newSessionIdPLaylist: null,
  newSessionLights: null,
  tmpLights: [],
  tmpPlaylist: null,
  tmpSession: null,
} as const;

export const tempSlice = createSlice({
  name: "tempSlice",
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
    setTmpPlaylist: (state, action) => {
      state.tmpPlaylist = action.payload;
    },
    setTmpSession: (state, action) => {
      state.tmpSession = action.payload;
    },
    setTmpLights: (state, action) => {
      state.tmpLights = action.payload;
    },
  },
});

// Reducers and actions
export const {
  setNewSessionName,
  setNewSessionLights,
  setNewSessionHashtag,
  setNewSessionIdPlaylist,
  setTmpPlaylist,
  setTmpSession,
  setTmpLights,
} = tempSlice.actions;

export default tempSlice.reducer;
