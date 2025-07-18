import { configureStore } from '@reduxjs/toolkit';
import authSlice from './features/auth/authSlice';
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';
import { combineReducers } from 'redux';
import {
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import profileSlice from './features/auth/profileSlice'; 
import postSlice from './features/auth/postSlice'
const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['auth', ], 
};

const rootReducer = combineReducers({
  auth: authSlice,
  profile: profileSlice ,
  posts:postSlice
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
