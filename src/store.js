// store.js
import { configureStore } from '@reduxjs/toolkit';
import addressReducer from './Components/Table/addressSlice.js'

export const store = configureStore({
  reducer: {
    address: addressReducer,
  },
});

export default store;
