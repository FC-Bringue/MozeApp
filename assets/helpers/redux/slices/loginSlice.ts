import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  mail: "",
  password: "",
} as const;

export const registerSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    setMail: (state, action) => {
      state.mail = action.payload;
    },
    setPassword: (state, action) => {
      state.password = action.payload;
    },
  },
});

// Reducers and actions
export const { setMail, setPassword } = registerSlice.actions;

export default registerSlice.reducer;
