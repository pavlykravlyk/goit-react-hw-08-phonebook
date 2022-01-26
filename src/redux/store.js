import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/dist/query';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { authSlice, authApi } from './auth';
import { contactApi, filterSlice } from './contacts';

const authPersistConfig = {
  key: 'auth',
  storage,
  whitelist: ['token'],
};

export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [authSlice.name]: persistReducer(authPersistConfig, authSlice.reducer),
    [contactApi.reducerPath]: contactApi.reducer,
    [filterSlice.name]: filterSlice.reducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(contactApi.middleware, authApi.middleware),
  devTools: process.env.NODE_ENV === 'development',
});

export const persistor = persistStore(store);

setupListeners(store.dispatch);
