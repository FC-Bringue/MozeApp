import { configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";

import registerSlice from "./slices/registerSlice";
import loginSlice from "./slices/loginSlice";
import userInfosSlice from "./slices/userInfosSlice";
import tempSlice from "./slices/tempSlice";

const reducers = combineReducers({
  register: registerSlice,
  login: loginSlice,
  userInfos: userInfosSlice,
  tempSlice: tempSlice,
});

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["userInfos"],
};

const persistedReducer = persistReducer(persistConfig, reducers);

const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== "production",
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;
