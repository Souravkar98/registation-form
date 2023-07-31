import { configureStore } from '@reduxjs/toolkit';
import formReducer from './formReducer';

export const store = configureStore({
    reducer: {
        form : formReducer
    },
  })

export default store;