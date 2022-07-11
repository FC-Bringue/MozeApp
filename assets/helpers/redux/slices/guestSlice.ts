import { createSlice } from "@reduxjs/toolkit";

const initialState: any = {
  tokenGuest: null,
  nameGuest: null,
} as const;

export const guestSlice = createSlice({
  name: "guestUser",
  initialState,
  reducers: {
    setTokenGuest: (state, action) => {
      state.tokenGuest = action.payload;
    },
    setNameGuest: (state, action) => {
      state.nameGuest = action.payload;
    },
  },
});

// Reducers and actions
export const { setTokenGuest, setNameGuest } = guestSlice.actions;

export default guestSlice.reducer;
