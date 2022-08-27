import { combineReducers, configureStore } from '@reduxjs/toolkit';

import matchesReducer from '../reducers/matchesReducer';
import {persistReducer} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const reducers = combineReducers({
      matches: matchesReducer,
});

const persistConfig = {
      key: 'root',
      storage,
};


const persistedReducer = persistReducer(persistConfig, reducers);

const store = configureStore({
      reducer: persistedReducer,
      devTools: process.env.NODE_ENV !== 'production',
      middleware: (getDefaultMiddleware) => getDefaultMiddleware({serializableCheck: false}),

});




export default store;
