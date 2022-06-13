import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  lastName: "",
  firstName: "",
  email: "",
  password: "",
  passwordConfirm: "",
} as const;

export const registerSlice = createSlice({
  name: "register",
  initialState,
  reducers: {
    setLastName: (state, action) => {
      state.lastName = action.payload;
    },
    setFirstName: (state, action) => {
      state.firstName = action.payload;
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
  setLastName,
  setFirstName,
  setEmail,
  setPassword,
  setPasswordConfirm,
} = registerSlice.actions;

export default registerSlice.reducer;
