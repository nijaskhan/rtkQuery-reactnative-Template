import { combineReducers } from 'redux';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // Use this for web
import { configureStore } from '@reduxjs/toolkit';

import { authSlice } from '../features/Auth/AuthSlice';
import { clearJobData, jobSlice } from '../features/Jobs/JobSlice';
import { bookingSlice } from '../features/Booking/BookingSlice';
import { profileSlice } from '../features/Profile/ProfileSlice';
import { homeSlice } from '../features/Home/HomeSlice';
import { api } from '../rtk/rtkApi';
import { setupListeners } from '@reduxjs/toolkit/query';

// ... other imports ...

const reducers = combineReducers({
  auth: authSlice.reducer,
  booking: bookingSlice.reducer,
  profile: profileSlice.reducer,
  home: homeSlice.reducer,
  api: api.reducer,
});

const persistConfig = {
  key: 'root',
  storage, // Use the storage imported from 'redux-persist/lib/storage' for web
  whitelist: ['auth'],
};

const persistedReducer = persistReducer(persistConfig, reducers);

const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware => {
    const middlewares = getDefaultMiddleware({
      serializableCheck: false,
      immutableCheck: false,
    }).concat(api.middleware);

    // if (process.env.NODE_ENV === 'development') {
    //   const { createLogger } = require('redux-logger');
    //   middlewares.push(createLogger());
    // }

    return middlewares;
  },
});

const persistor = persistStore(store);
setupListeners(store.dispatch);

export { store, persistor };










// import AsyncStorage from '@react-native-async-storage/async-storage';
// import {combineReducers} from 'redux';
// import {persistReducer, persistStore} from 'redux-persist';
// import {configureStore} from '@reduxjs/toolkit';

// import {authSlice} from '../features/Auth/AuthSlice';
// import {clearJobData, jobSlice} from '../features/Jobs/JobSlice';
// import {bookingSlice} from '../features/Booking/BookingSlice';
// import {profileSlice} from '../features/Profile/ProfileSlice';
// import {homeSlice} from '../features/Home/HomeSlice';
// import {api} from '../rtk/rtkApi';
// import {setupListeners} from '@reduxjs/toolkit/query';

// const reducers = combineReducers({
//   auth: authSlice.reducer,
//   booking: bookingSlice.reducer,
//   profile: profileSlice.reducer,
//   home: homeSlice.reducer,
//   api: api.reducer,
// });

// const persistConfig = {
//   key: 'root',
//   storage: AsyncStorage,
//   whitelist: ['auth'],
// };

// const persistedReducer = persistReducer(persistConfig, reducers);

// const store = configureStore({
//   reducer: persistedReducer,
//   middleware: getDefaultMiddleware => {
//     const middlewares = getDefaultMiddleware({
//       serializableCheck: false,
//       immutableCheck: false,
//     }).concat(api.middleware);
//     // middlewares.push(customMiddleware);

//     // serializableCheck: {
//     //   ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
//     // },

//     // if (__DEV__ && !process.env.JEST_WORKER_ID) {
//     //   const createDebugger = require('redux-flipper').default;
//     //   middlewares.push(createDebugger());
//     // }

//     return middlewares;
//   },
// });

// const persistor = persistStore(store);
// setupListeners(store.dispatch);

// export {store, persistor};
