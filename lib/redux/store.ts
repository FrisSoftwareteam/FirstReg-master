import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from "redux-persist";
import type { Storage } from "redux-persist";
import createWebStorage from "redux-persist/lib/storage/createWebStorage";
import counterReducer from "@/lib/redux/slices/counterSlice";
import authReducer, { logout } from "@/lib/redux/slices/authSlice";
import { baseApi } from "@/lib/services/baseApi";
import { setupAxios } from "@/lib/axios";

const createNoopStorage = (): Storage => {
  return {
    getItem(_key: string) {
      return Promise.resolve<string | null>(null);
    },
    setItem(_key: string, _value: string) {
      return Promise.resolve();
    },
    removeItem(_key: string) {
      return Promise.resolve();
    },
  };
};

const storage: Storage =
  typeof window !== "undefined"
    ? (createWebStorage("local") as unknown as Storage)
    : createNoopStorage();

const rootReducer = combineReducers({
  counter: counterReducer,
  auth: authReducer,
  [baseApi.reducerPath]: baseApi.reducer,
});

const persistedReducer = persistReducer(
  {
    key: "root",
    storage,
    whitelist: ["counter", "auth"],
    version: 1,
  },
  rootReducer
);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(baseApi.middleware),
});

setupAxios(store, logout);

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
