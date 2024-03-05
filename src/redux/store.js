import { configureStore } from '@reduxjs/toolkit';
import logger from 'redux-logger';


import { FLUSH, PAUSE, PERSIST, persistStore, PURGE, REGISTER, REHYDRATE } from 'redux-persist';


export const store = configureStore({
  reducer: {
     
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [
           FLUSH,
          REHYDRATE,
          PAUSE,
          PERSIST,
          PURGE,
          REGISTER,
        ],
      },
    }).concat(logger),
  // devTools: process.env.NODE_ENV === 'development', //Only for development mode
});


export const persistor = persistStore(store);