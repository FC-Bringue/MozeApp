import { configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import { encryptTransform } from "redux-persist-transform-encrypt";
const expireReducer = require("redux-persist-expire");

import registerSlice from "./slices/registerSlice";
import loginSlice from "./slices/loginSlice";
import userInfosSlice from "./slices/userInfosSlice";
import tempSlice from "./slices/tempSlice";
import guestSlice from "./slices/guestSlice";
import activeSlice from "./slices/activeSlice";
import websiteWorkerSlice from "./slices/websiteWorkerSlice";

const reducers = combineReducers({
  register: registerSlice,
  login: loginSlice,
  userInfos: userInfosSlice,
  tempSlice: tempSlice,
  guest: guestSlice,
  active: activeSlice,
  websiteWorker: websiteWorkerSlice,
});

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["userInfos", "guest"],
  transforms: [
    encryptTransform({
      secretKey: "moze-app-demo-encryption-key",
      onError: function (error: any) {
        console.log("error at persist encryption", error);
      },
    }),
    expireReducer({
      key: "userInfos",
      expireSeconds: 60 * 60 * 24 * 7,
    }),
  ],
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
