import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  name: "",
  email: "",
  password: "",
  passwordConfirm: "",
} as const;

export const registerSlice = createSlice({
  name: "register",
  initialState,
  reducers: {
    setName: (state, action) => {
      state.name = action.payload;
    },
    setEmail: (state, action) => {
      state.email = action.payload;
    },
    setPassword: (state, action) => {
      state.password = action.payload;
    },
    setPasswordConfirm: (state, action) => {
      state.passwordConfirm = action.payload;
    },
  },
});

// Reducers and actions
export const {
  setName,
  setEmail,
  setPassword,
  setPasswordConfirm,
} = registerSlice.actions;

export default registerSlice.reducer;
