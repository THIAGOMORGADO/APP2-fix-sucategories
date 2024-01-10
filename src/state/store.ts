import {
  type TypedUseSelectorHook,
  useDispatch,
  useSelector,
} from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import autoMergeLevel2 from 'redux-persist/es/stateReconciler/autoMergeLevel2';
import createSecureStore from 'redux-persist-expo-securestore';

import rootReducer from './reducers/rootReducer';

export const secureStorage = createSecureStore();

const persistConfig = {
  key: 'root',
  storage: secureStorage,
  whitelist: ['auth'],
  blacklist: [],
  stateReconciler: autoMergeLevel2,
  debug: true,
};

const persistedReducer = persistReducer(
  persistConfig,
  rootReducer as any
);

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;

const useReduxDispatch = (): AppDispatch =>
  useDispatch<AppDispatch>();
const useReduxSelector: TypedUseSelectorHook<RootState> = useSelector;

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
  devTools: process.env.NODE_ENV !== 'production',
});

const persistor = persistStore(store);

export { store, persistor, useReduxDispatch, useReduxSelector };
