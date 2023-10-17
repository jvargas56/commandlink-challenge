'use client';

import { configureStore } from '@reduxjs/toolkit';
import formSlice from './reducers/formReducer';

const store = configureStore({
    reducer: {
      form: formSlice,
    },
  });

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;

