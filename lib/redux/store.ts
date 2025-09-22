import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from "redux-persist";
import createWebStorage from "redux-persist/lib/storage/createWebStorage";
import counterReducer from "@/lib/redux/slices/counterSlice";
import { baseApi } from "@/lib/services/baseApi";

const createNoopStorage = () => {
  return {
    getItem(_key: string) {
      return Promise.resolve(null);
    },
    setItem(_key: string, value: string) {
      return Promise.resolve(value);
    },
    removeItem(_key: string) {
      return Promise.resolve();
    },
  } as Storage;
};

const storage = typeof window !== "undefined" ? createWebStorage("local") : createNoopStorage();

const rootReducer = combineReducers({
  counter: counterReducer,
  [baseApi.reducerPath]: baseApi.reducer,
});

const persistedReducer = persistReducer(
  {
    key: "root",
    storage,
    whitelist: ["counter"],
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

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
