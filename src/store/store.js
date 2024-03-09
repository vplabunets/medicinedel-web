import { configureStore, combineReducers } from '@reduxjs/toolkit';
// import logger from 'redux-logger'; //for development

import { FLUSH, PAUSE, PERSIST, persistStore, persistReducer, PURGE, REGISTER, REHYDRATE } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import { medicinedelAPI } from './services/medicinedelAPI';
import { cartReducer } from './cart/cartReducer';

const persistConfig = {
  key: 'cart',
  storage,
  whitelist: ['cart'],
};
const rootReducer = combineReducers({ cart: cartReducer, [medicinedelAPI.reducerPath]: medicinedelAPI.reducer });
const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    })
      // .concat(logger)// for development
      .concat(medicinedelAPI.middleware),
});

export const persistor = persistStore(store);
