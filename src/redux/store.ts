import { configureStore, combineReducers } from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
  createMigrate,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import user from "./slice/users";
import { api } from "./api/main";
import createWebStorage from "redux-persist/lib/storage/createWebStorage";
import type { Storage } from "redux-persist";

const createNoopStorage = (): Storage => {
  return {
    getItem(_key: string) {
      return Promise.resolve(null);
    },
    setItem(_key: string, value: any) {
      return Promise.resolve(value);
    },
    removeItem(_key: string) {
      return Promise.resolve();
    },
  };
};

const storage =
  typeof window !== "undefined"
    ? createWebStorage("local")
    : createNoopStorage();

const migrations: Record<number, (state: any) => any> = {
  2: (state) => {
    const { main_slice: _a, ...rest } = state ?? {};
    return rest;
  },
  3: (state) => {
    const { cart: _a, ...rest } = state ?? {};
    return rest;
  },
};

const persistConfig = {
  key: "root",
  version: 3,
  storage: storage,
  blacklist: ["api"],
  migrate: createMigrate(migrations, { debug: false }),
};

const reducers = combineReducers({
  [api.reducerPath]: api.reducer,
  user: user,
});

const persistedReducer = persistReducer(persistConfig, reducers);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      // Redux persist
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(api.middleware),
});

export const persistor = persistStore(store);

// --- Infer types for use in components
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
