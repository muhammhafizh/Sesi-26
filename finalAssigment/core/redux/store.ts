import {
  Action,
  configureStore,
  ThunkAction,
  combineReducers,
} from "@reduxjs/toolkit";
import { apiSlice } from "@/core/redux/api/apiSlice";
import { authReducer } from "@/core/redux/slices/auth";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

const rootReducer = combineReducers({
  [apiSlice.reducerPath]: apiSlice.reducer,
  auth: authReducer,
});

const createStore = () => {
  let store;
  const isClient = typeof window !== "undefined";
  if (isClient) {
    const persistConfig = {
      key: "authType",
      storage,
      whiteList: ["auth"],
    };

    store = configureStore({
      reducer: persistReducer(persistConfig, rootReducer),
      middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
          serializableCheck: {
            ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
          },
        }).concat(apiSlice.middleware),
    });

    // eslint-disable-next-line no-underscore-dangle
    store.__PERSISTOR = persistStore(store);
  } else {
    store = configureStore({
      reducer: rootReducer,
      middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(apiSlice.middleware),
    });
  }

  return store;
};

export const store = createStore();

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
