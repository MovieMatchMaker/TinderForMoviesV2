import { combineReducers, configureStore } from '@reduxjs/toolkit';
import {persistReducer} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import authSlice from '../slices/authSlice';

const reducers = combineReducers({
      auth: authSlice
});

const persistConfig = {
      key: 'root',
      storage,
};

const persistedReducer = persistReducer(persistConfig, reducers);

const store = configureStore({
      reducer: persistedReducer,
      devTools: true,
      middleware: (getDefaultMiddleware) => getDefaultMiddleware({serializableCheck: false}),

});

export default store;
