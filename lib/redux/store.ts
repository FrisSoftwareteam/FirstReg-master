import { combineReducers, configureStore } from "@reduxjs/toolkit";
import counterReducer from "@/lib/redux/slices/counterSlice";
import { baseApi } from "@/lib/services/baseApi";

const rootReducer = combineReducers({
  counter: counterReducer,
  [baseApi.reducerPath]: baseApi.reducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(baseApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
