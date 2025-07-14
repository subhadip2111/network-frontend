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
import profileSlice from './features/auth/userSlice'; // Assuming this path is correct

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['auth', 'profile'], // Added 'profile' to the whitelist for persistence
};

const rootReducer = combineReducers({
  auth: authSlice,
  profile: profileSlice // Included the new profile slice
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
